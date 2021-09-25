import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import constant from '../../../../helper/constant';
import ButtonGlobal from '../../../../component/ButtonGlobal/ButtonGlobal';
import TitleText from '../../../../component/TitleText/TitleText';
import fonts, { sizes } from '../../../../helper/fonts';
import AppHeader from '../../../../component/AppHeader/AppHeader';
import { strLocale } from 'locale';
import { connect } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { validatorUsername } from '../../../../modules/account/validator';
import { sessionTimeOut } from '../../../../services/error';
import { signUp } from '../../../../modules/account/actions';
import { accountStack, appTabStack } from '../../../../navigation/navigator';
import { UserEvent } from '../../../../helper/fabricHelper/track';
import TextInputCustom from '../../../../component/TextInputCustom/GlobalTextInput';
import {
  LabelContainer,
  MainContainer,
  ButtonContainer,
} from '../../../../component/GlobalStyles';
import {
  TitleContainer,
  DescriptionContainer,
  TextBoxContainer,
} from './styled';

const SignUpAccountCreationScreen = props => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const [userName, setUserName] = useState({ value: '', error: '' });

  const checkNextEnable = () => {
    return !validatorUsername(userName.value);
  };

  const onPressNext = () => {
    if (userName.value.trim() === '') {
      setUserName({
        value: userName.value,
        error: strLocale('account.Name should contain from 3 to 64 characters'),
      });
    } else {
      const model = {
        name: userName.value,
        mobile: params.phoneNumber,
        tradingFrequency: 1,
        userType: 'Trader',
        assetClassesPlannedForInvestment: ['Equity'],
      };

      const headers = {
        'verified-mobile-token': params.token,
        'Custom-Error-Handling': '',
      };

      if (global.entity && global.entityId) {
        model.entity = global.entity;
        model.entityId = global.entityId;
      }
      props
        .signUp(model, headers)
        .then(res => {
          if (res === true) {
            UserEvent.userTrackScreen('signup_complete');
            navigation.reset({
              index: 0,
              routes: [{ name: appTabStack.app_tab }],
            });
          } else {
            if (res.code === 400 && res.result === 'Invalid token') {
              sessionTimeOut();
              navigation.navigate(accountStack.sign_up);
            } else if (res.code === 400) {
            } else if (res.code === 401) {
              setUserName({
                value: userName.value,
                error: res.result,
              });
            }
          }
        })
        .catch(err => {});
      Keyboard.dismiss();
    }
  };

  const checkValidation = () => {
    if (userName.value.trim().length === 0) {
      setUserName({
        value: userName.value,
        error: strLocale('account.Name is required'),
      });
    } else if (!validatorUsername(userName.value)) {
      setUserName({
        value: userName.value,
        error: strLocale('account.Name should contain from 3 to 64 characters'),
      });
    }
  };

  const onPressBack = () => {
    UserEvent.userTrackScreen('signup_backto_phoneverification');
    navigation.goBack();
  };

  const renderTitleHeader = () => {
    return (
      <TitleContainer>
        <TitleText
          text="What's your name?"
          color={constant.lightWhiteColor}
          fontSize={sizes.h9}
          fontFamily={fonts.fontInterRegular}
        />
        <DescriptionContainer>
          <TitleText
            text={strLocale(
              'account.We need your name so your friends can recognise you',
            )}
            color={constant.textGrayColor}
            fontFamily={fonts.fontInterRegular}
            fontSize={sizes.h12}
            lineHeight={'22px'}
          />
        </DescriptionContainer>
      </TitleContainer>
    );
  };
  const renderTextBox = () => {
    return (
      <TextBoxContainer>
        <LabelContainer>
          <TitleText
            text={strLocale('profile.Name')}
            fontSize={sizes.h14}
            color={constant.textInputBorderColor}
            fontFamily={fonts.fontInterRegular}
          />
        </LabelContainer>
        <TextInputCustom
          testID={'name'}
          placeholder={'eg:john'}
          trackId={'signup_name'}
          validation={userName}
          setValue={(text, isCheck = false) => {
            if (isCheck === false) {
              setUserName({ value: text, error: '' });
            } else {
              checkValidation();
            }
          }}
        />
      </TextBoxContainer>
    );
  };

  const renderBottom = () => {
    return (
      <ButtonContainer>
        <ButtonGlobal
          testID={'btn_continue'}
          buttonText={
            !validatorUsername(userName.value)
              ? strLocale('Continue')
              : strLocale('Finish')
          }
          onPress={onPressNext}
          isLoading={props.isLoading}
          disabled={checkNextEnable()}
        />
      </ButtonContainer>
    );
  };

  return (
    <MainContainer>
      <AppHeader
        onPressClose={onPressBack}
        backgroundColor={constant.darkBackgroundColor}
      />
      {renderTitleHeader()}
      {renderTextBox()}
      {renderBottom()}
    </MainContainer>
  );
};

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
    isLoading: state.account.isLoading,
  };
};

export default connect(mapStateToProps, {
  signUp,
})(SignUpAccountCreationScreen);
