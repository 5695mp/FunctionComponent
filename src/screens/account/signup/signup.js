import React, { useState, useEffect } from 'react';
import { Keyboard, StatusBar, BackHandler } from 'react-native';
import AppHeader from '../../../component/AppHeader/AppHeader';
import TitleText from '../../../component/TitleText/TitleText';
import ButtonGlobal from '../../../component/ButtonGlobal/ButtonGlobal';
import fonts, { sizes } from '../../../helper/fonts';
import constant from '../../../helper/constant';
import DeviceNumber from 'react-native-device-number';
import { strLocale } from 'locale';
import { connect } from 'react-redux';
import { validatorMobileNo } from '../../../modules/account/validator';
import { useNavigation } from '@react-navigation/native';
import {
  requestCode,
  requestSignInCode,
} from '../../../modules/account/actions';
import TextInputCustom from '../../../component/TextInputCustom/GlobalTextInput';
import { accountStack } from '../../../navigation/navigator';
import { UserEvent } from '../../../helper/fabricHelper/track';
import { LabelContainer, MainContainer } from '../../../component/GlobalStyles';
import {
  PhoneNumberContainer,
  SignContainer,
  ButtonContainer,
  TitleContainer,
  TextBoxContainer,
  ErrorContainer,
} from './styled';

const SignUpScreen = props => {
  const navigation = useNavigation();

  const [mobileNumber, setMobileNumber] = useState({ value: '', error: '' });

  useEffect(() => {
    const onPressBackAndroid = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBackAndroid,
    );

    return () => backHandler.remove();
  }, []);

  const checkSignInEnable = () => {
    return !validatorMobileNo(mobileNumber.value);
  };

  const onPressSignIn = () => {
    if (mobileNumber.value === '') {
      setMobileNumber({
        value: mobileNumber.value,
        error: strLocale('account.The phone number is not correct'),
      });
    } else {
      props
        .requestSignInCode(mobileNumber.value, 'Login')
        .then(res => {
          //404 - Mobile number not found
          //409 - Already register
          switch (res.code) {
            case 404:
              signUpUser();
              break;
            case 200:
              navigation.navigate(accountStack.signup_verification_code, {
                phoneNumber: mobileNumber.value,
                type: 1,
              });
              break;
            default:
              break;
          }
        })
        .catch(err => {});
    }
  };

  const signUpUser = () => {
    props
      .requestCode(mobileNumber.value)
      .then(res => {
        //403 - Wait for api calling
        //409 - Already register
        switch (res.code) {
          case 409:
            UserEvent.userTrackScreen('signup_getcode');
            navigation.navigate(accountStack.signup_verification_phone_exists, {
              phoneNumber: mobileNumber.value,
            });
            break;
          case 200:
            UserEvent.userTrackScreen('signup_getcode');
            navigation.navigate(accountStack.signup_verification_code, {
              phoneNumber: mobileNumber.value,
            });
            break;
          default:
            break;
        }
      })
      .catch(err => {});
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const checkValidation = () => {
    if (!validatorMobileNo(mobileNumber.value)) {
      setMobileNumber({
        value: mobileNumber.value,
        error: strLocale('account.The phone number is not correct'),
      });
    }
  };

  const getNumber = () => {
    if (constant.isANDROID) {
      DeviceNumber.get().then(Number => {
        const mobileNumber = Number.mobileNumber;

        if (mobileNumber.startsWith('+91')) {
          const no = mobileNumber.substring(3, mobileNumber.length);
          const mobNumber = no;
          setMobileNumber({ value: mobNumber, error: '' });
        } else {
          setMobileNumber({ value: mobileNumber, error: '' });
        }
      });
    }
  };

  const renderTitle = () => {
    return (
      <TitleContainer>
        <TitleText
          text={strLocale('account.Let’s Start Your Trinkerr Journey!')}
          fontSize={sizes.h9}
          color={constant.textColor}
          fontWeight={fonts.fontInterSemiBold}
          lineHeight={'35px'}
        />
      </TitleContainer>
    );
  };

  const renderTextBox = () => {
    return (
      <SignContainer>
        <TextBoxContainer>
          <LabelContainer>
            <TitleText
              text={strLocale('account.code')}
              fontSize={sizes.h14}
              color={constant.textInputBorderColor}
              fontFamily={fonts.fontInterRegular}
            />
          </LabelContainer>
          <TextInputCustom
            width={'80px'}
            defaultValue={'+91'}
            editable={false}
          />
          <PhoneNumberContainer>
            <LabelContainer>
              <TitleText
                text={strLocale('account.number')}
                fontSize={sizes.h14}
                color={constant.textInputBorderColor}
                fontWeight={fonts.fontInterRegular}
              />
            </LabelContainer>
            <TextInputCustom
              width={constant.screenWidth - 135}
              testID={'phone_number'}
              placeholder={strLocale('account.your phone number')}
              validation={mobileNumber}
              value={mobileNumber.value}
              apiWaitingTime={props.apiWaitingTime}
              keyboardInputType={'number-pad'}
              onFocus={getNumber}
              setValue={(text, isCheck = false) => {
                if (isCheck === false) {
                  setMobileNumber({ value: text, error: '' });
                } else {
                  checkValidation();
                }
              }}
            />
          </PhoneNumberContainer>
        </TextBoxContainer>
        <ErrorContainer>
          <TitleText
            text={
              (props.apiWaitingTime &&
                props.apiWaitingTime > 0 &&
                strLocale('account.Send will be available in seconds', {
                  second: props.apiWaitingTime,
                })) ||
              '  '
            }
            color={constant.lightWhiteColor}
            fontSize={sizes.h12}
          />
        </ErrorContainer>
      </SignContainer>
    );
  };

  const renderBottom = () => {
    return (
      <ButtonContainer apiWaitingTime={props.apiWaitingTime}>
        <ButtonGlobal
          testID={'btn_continue'}
          buttonText={strLocale('Continue')}
          onPress={onPressSignIn}
          disabled={checkSignInEnable()}
          isLoading={props.isLoading}
        />
      </ButtonContainer>
    );
  };

  return (
    <MainContainer>
      <StatusBar hidden={false} backgroundColor={'#000000'} />
      <AppHeader
        onPressClose={onPressBack}
        isHide={true}
        backgroundColor={constant.darkBackgroundColor}
      />
      {renderTitle()}
      {renderTextBox()}
      {renderBottom()}
    </MainContainer>
  );
};

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
    isLoading: state.account.isLoading,
    apiWaitingTime: state.account.apiWaitingTime,
  };
};

export default connect(mapStateToProps, {
  requestCode,
  requestSignInCode,
})(SignUpScreen);
