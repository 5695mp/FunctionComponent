import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import constant from '../../../helper/constant';
import ButtonCustom from '../../../component/ButtonCustom/ButtonCustom';
import NavBar from '../../../component/NavBarAccount/NavBarAccount';
import TitleHeader from './containers/TitleHeader';
import MobileNumber from './containers/MobileNumber';
import IconVector from './containers/IconVector';
import fonts, { sizes } from '../../../helper/fonts';
import { strLocale } from 'locale';
import { connect } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { accountStack } from '../../../navigation/navigator';

const SignupVerificationPhoneExistsScreen = props => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const {
    container,
    scrollViewContainer,
    restoreDescriptionContainer,
    descriptionText,
    signInCode,
    signInCodeText,
    restoreButton,
    textInputLayout,
    bottomContainer,
    phoneNumberContainer,
    headerContainer,
  } = styles;

  const onPressBack = () => {
    navigation.navigate(accountStack.sign_up);
  };

  const onPressRestoreAccount = () => {};

  const onPressSignInCode = () => {
    navigation.navigate(accountStack.sign_up);
  };

  const onPressPhoneNumber = () => {
    navigation.goBack();
  };

  const renderPhoneNumber = () => {
    return (
      <View style={textInputLayout}>
        <IconVector />

        <View style={restoreDescriptionContainer}>
          <Text style={descriptionText}>
            {strLocale('account.We found that the phone number')}
          </Text>
        </View>

        <MobileNumber
          buttonTitle={strLocale('account.Change')}
          phoneNumber={'+91 ' + params.phoneNumber || '1234123123'}
          mainContain={phoneNumberContainer}
          onPressPhoneNumber={onPressPhoneNumber}
        />

        <View>
          <Text style={descriptionText}>
            {strLocale('account.Do you want to restore the password')}
          </Text>
        </View>
      </View>
    );
  };

  const renderBottom = () => {
    return (
      <View>
        <View style={bottomContainer}>
          <ButtonCustom
            onPress={onPressRestoreAccount}
            text={strLocale('account.RESTORE ACCOUNT')}
            otherStyle={restoreButton}
          />
          <ButtonCustom
            onPress={onPressSignInCode}
            text={strLocale('account.SIGN IN')}
            otherStyle={signInCode}
            textStyle={signInCodeText}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={container}>
      <NavBar
        backScreenName={strLocale('account.SIGN IN')}
        onPressBack={onPressBack}
      />

      <View style={[constant.shadowView, constant.boxShadow]}>
        <ScrollView
          style={[scrollViewContainer]}
          showsVerticalScrollIndicator={false}>
          <TitleHeader
            title={strLocale('account.Sign Up')}
            description={'Phone Verification'}
            selectedSlider={1}
            noOfSlider={3}
            mainContain={headerContainer}
          />
          <View>
            {renderPhoneNumber()}
            {renderBottom()}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F4FB',
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 18,
  },
  descriptionText: {
    fontSize: sizes.h12,
    color: '#4F5153',
    fontFamily: fonts.fontRubikRegular,
    lineHeight: 21,
  },
  restoreButton: {
    marginBottom: 12,
  },
  signInCode: {
    backgroundColor: constant.transparent,
    marginBottom: 5,
    height: 30,
  },
  signInCodeText: {
    color: '#2D8EE7',
  },
  textInputLayout: {
    marginTop: 32,
  },
  bottomContainer: {
    marginTop: 20,
  },
  phoneNumberContainer: {
    marginTop: 16,
    marginBottom: 21,
  },
  restoreDescriptionContainer: {
    marginTop: 16,
  },
  headerContainer: {
    marginTop: 38,
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
  };
};

export default connect(
  mapStateToProps,
  {},
)(SignupVerificationPhoneExistsScreen);
