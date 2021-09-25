import React, { useState } from 'react';
import ButtonGlobal from '../../../../component/ButtonGlobal/ButtonGlobal';
import TitleText from '../../../../component/TitleText/TitleText';
import constant from '../../../../helper/constant';
import CodeMatch from '../../../../component/CodeMatch/CodeMatch';
import fonts, { sizes } from '../../../../helper/fonts';
import { strLocale } from 'locale';
import { connect } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserEvent } from '../../../../helper/fabricHelper/track';
import AppHeader from '../../../../component/AppHeader/AppHeader';
import {
  MainContainer,
  ButtonContainer,
} from '../../../../component/GlobalStyles';
import {
  MainTitleContainer,
  CodeMatchContainer,
  DescriptionContainer,
  IconContainer,
  Icon,
} from './styled';
import {
  requestCode,
  checkOTP,
  checkOTPSignIn,
  checkOTPAccountRecovery,
  changePhoneNumber,
} from '../../../../modules/account/actions';
import { accountStack, appTabStack } from '../../../../navigation/navigator';

const SignUpVerificationCodeScreen = props => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [isNewVerificationCode, setIsNewVerificationCode] = useState(false);
  const [isWrongCode, setIsWrongCode] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);
  const [loaderType, setLoaderType] = useState(0);
  const [verificationType] = useState(params.type || 0);
  const [verifyEnable, setVerifyEnable] = useState(false);

  const checkSignInEnable = () => {
    if (verifyEnable === false) {
      return true;
    }
    return false;
  };

  const apiWaiting = () => {
    return props.apiWaitingTime && props.apiWaitingTime !== 0;
  };

  const wrongPassword = () => {
    setIsWrongCode(true);
    setVerifyEnable(false);
    setTimeout(() => {
      setIsWrongCode(false);
    }, 100);

    //If attempts remaining = 0 then send new code
    if (attemptsRemaining !== 1) {
      setAttemptsRemaining(attemptsRemaining - 1);
    } else {
      onPressResend();
    }
  };

  const verifyEnableTextChange = value => {
    setVerifyEnable(value);
  };

  const onPressBack = () => {
    UserEvent.userTrackScreen('signup_backto_signintop');
    navigation.goBack();
  };

  const onPressResendCode = () => {
    UserEvent.userTrackScreen('signup_resendcode_lower');
    if (!apiWaiting()) {
      onPressResend();
    }
  };

  const onCompleteCodeMatch = code => {
    setLoaderType(0);
    if (verificationType === 0 || verificationType === 4) {
      props
        .checkOTP(params.phoneNumber, code)
        .then(res => {
          if (res.code === 200) {
            if (verificationType === 0) {
              navigation.navigate(accountStack.signup_account_creation, {
                token: res.headers.get('verified-mobile-token'),
                phoneNumber: params.phoneNumber,
              });
            } else {
              const headers = {
                'verified-mobile-token': res.headers.get(
                  'verified-mobile-token',
                ),
                'Custom-Error-Handling': '',
              };

              props
                .changePhoneNumber(
                  { mobile: params.phoneNumber, otp: code },
                  headers,
                )
                .then(res => {
                  if (res === true) {
                    navigation.navigate(appTabStack.app_tab);
                  } else {
                    wrongPassword();
                  }
                })
                .catch(err => {});
            }
          } else {
            wrongPassword();
          }
        })
        .catch(err => {});
    } else if (verificationType === 1) {
      props
        .checkOTPSignIn(params.phoneNumber, code)
        .then(res => {
          if (res === true) {
            navigation.reset({
              index: 0,
              routes: [{ name: appTabStack.app_tab }],
            });
          } else {
            wrongPassword();
          }
        })
        .catch(err => {});
    } else if (verificationType === 2) {
      props
        .checkOTPAccountRecovery(params.phoneNumber, code)
        .then(res => {
          if (res.code === 200) {
            navigation.navigate(accountStack.recovery_set_password, {
              token: res.headers.get('change-password-token'),
              userData: res.result,
            });
          } else {
            wrongPassword();
          }
        })
        .catch(err => {});
    }
  };

  const onPressPhoneNumber = () => {
    UserEvent.userTrackScreen('signup_mobno_change');
    navigation.goBack();
  };

  const onPressResend = () => {
    UserEvent.userTrackScreen('signup_resendcode_upper');
    setLoaderType(1);
    setAttemptsRemaining(0);
    props
      .requestCode(params.phoneNumber)
      .then(res => {
        setIsWrongCode(false);
        setIsNewVerificationCode(true);
        setAttemptsRemaining(3);
      })
      .catch(err => {});
  };

  const renderHeader = () => {
    return (
      <MainTitleContainer>
        <TitleText
          text={strLocale('account.Verify your OTP')}
          color={'#f8f8ff'}
          fontSize={sizes.h9}
          fontFamily={fonts.fontInterSemiBold}
        />
        <DescriptionContainer>
          <TitleText
            text="We've sent it to "
            color={constant.textGrayColor}
            fontSize={sizes.h12}
            fontFamily={fonts.fontInterRegular}
          />
          <TitleText
            text={'+91- ' + params.phoneNumber || '1234123123'}
            fontSize={sizes.h11}
            fontFamily={fonts.fontInterRegular}
          />
          <IconContainer onPress={onPressPhoneNumber}>
            <Icon source={{ uri: 'icon_edit' }} />
          </IconContainer>
        </DescriptionContainer>
      </MainTitleContainer>
    );
  };
  const renderCodeMatch = () => {
    return (
      <CodeMatchContainer>
        <CodeMatch
          testID={'first_code'}
          secondID={'second_code'}
          thirdID={'third_code'}
          fourID={'four_code'}
          isShowingError={true}
          onCompletePattern={onCompleteCodeMatch}
          apiWaitingTime={props.apiWaitingTime}
          onPressResend={onPressResend}
          isLoading={props.isLoading}
          isWrongCode={isWrongCode}
          isChecking={isChecking}
          attemptsRemaining={attemptsRemaining}
          loaderType={loaderType}
          verifyEnableTextChange={verifyEnableTextChange}
        />
      </CodeMatchContainer>
    );
  };

  const renderBottom = () => {
    return (
      <ButtonContainer>
        <ButtonGlobal
          testID={'btn_continue'}
          buttonText={strLocale('Continue')}
          onPress={onCompleteCodeMatch}
          disabled={checkSignInEnable()}
          isLoading={props.isLoading}
        />
      </ButtonContainer>
    );
  };

  return (
    <MainContainer>
      {(params.redirectAppScreen && (
        <AppHeader
          backScreenName={params.redirectAppScreen}
          onPressClose={onPressBack}
          backgroundColor={constant.darkBackgroundColor}
        />
      )) || (
        <AppHeader
          onPressClose={onPressBack}
          backgroundColor={constant.darkBackgroundColor}
        />
      )}
      {renderHeader()}
      {renderCodeMatch()}
      {renderBottom()}
    </MainContainer>
  );
};

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
    apiWaitingTime: state.account.apiWaitingTime,
    isLoading: state.account.isLoading,
  };
};

export default connect(mapStateToProps, {
  requestCode,
  checkOTP,
  checkOTPSignIn,
  checkOTPAccountRecovery,
  changePhoneNumber,
})(SignUpVerificationCodeScreen);
