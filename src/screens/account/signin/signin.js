import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Keyboard,
  StatusBar,
} from 'react-native';
import constant from '../../../helper/constant';
import ButtonCustom from '../../../component/ButtonCustom/ButtonCustom';
import TextInputCustom from '../../../component/TextInputCustom/TextInputCustom';
import NavBar from '../../../component/NavBarAccount/NavBarAccount';
import TitleHeader from '../signup/containers/TitleHeader';
import analytics from '@react-native-firebase/analytics';
import Animated, { Easing } from 'react-native-reanimated';
import fonts, { sizes } from '../../../helper/fonts';
import { strLocale } from 'locale';
import { connect } from 'react-redux';
import { validatorMobileNo } from '../../../modules/account/validator';
import { useNavigation } from '@react-navigation/native';
import { accountStack, appTabStack } from '../../../navigation/navigator';
import {
  requestSignInCode,
  requestSignInPassword,
  setLoader,
} from '../../../modules/account/actions';
import { UserEvent } from '../../../helper/fabricHelper/track';

const SignInScreen = props => {
  const navigation = useNavigation();

  const [mobileNumber, setMobileNumber] = useState({
    value: '',
    error: '',
    focus: false,
  });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [passwordIsShow, setPasswordIsShow] = useState(true);
  const [loginType, setLoginType] = useState(true);

  const [headerViewHeight] = useState(new Animated.Value(234));
  const [headerIconHeight] = useState(new Animated.Value(102));
  const [imageBottomHeight] = useState(new Animated.Value(40));
  const [mainContainAnimation] = useState(new Animated.Value(1));

  const {
    container,
    mainView,
    titleSignIn,
    descriptionText,
    skipButton,
    signUpButton,
    restoreText,
    signInButton,
    textInputLayout,
    headerView,
    headerSubContainer,
    headerImage,
    bottomContainer,
  } = styles;

  const performHeaderAnimation = (isOpen = true) => {
    Animated.timing(headerViewHeight, {
      toValue: (!isOpen && 234) || 60,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
    Animated.timing(headerIconHeight, {
      toValue: (!isOpen && 102) || 40,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
    Animated.timing(imageBottomHeight, {
      toValue: (!isOpen && 40) || 5,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  };

  const performTypeChangeAnimation = () => {
    Animated.timing(mainContainAnimation, {
      toValue: 0,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start(() => {
      setLoginType(!loginType);
      Animated.timing(mainContainAnimation, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }).start();
    });
  };

  useEffect(() => {
    //Track screen
    UserEvent.userTrackScreen('signIn');

    Keyboard.addListener('keyboardWillShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

    return (): void => {
      Keyboard.removeListener('keyboardWillShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardWillHide', onKeyboardDidHide);
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  });

  function onKeyboardDidShow(e: KeyboardEvent): void {
    performHeaderAnimation(true);
  }

  function onKeyboardDidHide(): void {
    performHeaderAnimation(false);
  }

  const checkSignInEnable = () => {
    if (!loginType) {
      return !(validatorMobileNo(mobileNumber.value) && password.value !== '');
    } else {
      return !validatorMobileNo(mobileNumber.value);
    }
  };

  const signInWithOTP = () => {
    props
      .requestSignInCode(mobileNumber.value, 'Login')
      .then(res => {
        //404 - Mobile number not found
        //409 - Already register
        switch (res.code) {
          case 404:
            setMobileNumber({
              value: mobileNumber.value,
              error: 'Phone number does not exits',
            });
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
  };

  const signInWithPassword = () => {
    props
      .requestSignInPassword(mobileNumber.value, password.value)
      .then(res => {
        if (res === true) {
          navigation.reset({
            index: 0,
            routes: [{ name: appTabStack.app_tab }],
          });
        } else {
          //404 - Mobile number not found
          //409 - Already register
          switch (res.code) {
            case 404:
            case 401:
              setMobileNumber({
                value: mobileNumber.value,
                error: ' ',
              });
              setPassword({
                value: password.value,
                error: 'Phone number or password is wrong',
              });
              break;
            default:
              break;
          }
        }
      })
      .catch(err => {});
  };

  const onPressSignIn = () => {
    if (mobileNumber.value === '') {
      setMobileNumber({
        value: mobileNumber.value,
        error: strLocale('account.The phone number is not correct'),
      });
    } else if (password.value === '' && !loginType) {
      setPassword({
        value: password.value,
        error: strLocale('account.Password is required'),
      });
    } else {
      if (loginType) {
        signInWithOTP();
      } else {
        UserEvent.userTrackScreen('signin_complete');
        signInWithPassword();
      }
      Keyboard.dismiss();
    }
  };

  const onPressSignUp = () => {
    UserEvent.userTrackScreen('signup_top');
    navigation.navigate(accountStack.sign_up);
  };

  const onPressRestore = () => {
    UserEvent.userTrackScreen('signin_restore');
    navigation.navigate(accountStack.recovery_start);
  };

  const onPressLoginType = () => {
    performTypeChangeAnimation();
  };

  const renderHeader = () => {
    return (
      <View>
        <Animated.View
          style={[headerView, { height: headerViewHeight }]}
          pointerEvents="none">
          <View style={headerSubContainer} />
          <Animated.Image
            source={{ uri: constant.imageHeaderLogo }}
            resizeMode={'contain'}
            style={[
              headerImage,
              {
                height: headerIconHeight,
                marginBottom: imageBottomHeight,
              },
            ]}
          />
        </Animated.View>
      </View>
    );
  };

  const renderTextBox = () => {
    return (
      <View style={textInputLayout}>
        <TextInputCustom
          title={strLocale('account.PHONE NUMBER')}
          isMobileText={'+91'}
          placeHolder={''}
          keyboardInputType={'phone-pad'}
          trackId={'signin_phoneNumber'}
          validation={mobileNumber}
          setValue={(text, isCheck = false) => {
            if (isCheck === false) {
              setMobileNumber({ value: text, error: '' });
            } else {
              if (!validatorMobileNo(mobileNumber.value)) {
                setMobileNumber({
                  value: mobileNumber.value,
                  error: strLocale('account.The phone number is not correct'),
                });
              }
            }
          }}
        />

        {!loginType && (
          <TextInputCustom
            title={strLocale('account.PASSWORD')}
            validation={password}
            placeHolder={strLocale('account.password')}
            trackId={'signin_password'}
            isSecure={passwordIsShow}
            isEye={true}
            onEyePress={() => setPasswordIsShow(!passwordIsShow)}
            setValue={(text, isCheck = false) => {
              if (isCheck === false) {
                setPassword({ value: text, error: '' });
              } else {
                if (password.value === '') {
                  setPassword({
                    value: '',
                    error: strLocale('account.Password is required'),
                  });
                }
              }
            }}
          />
        )}
      </View>
    );
  };

  const renderBottom = () => {
    return (
      <View>
        {!loginType && (
          <View>
            <Text style={descriptionText}>
              {strLocale('account.Forgot your password')}
              <Text onPress={onPressRestore} style={restoreText}>
                {strLocale('account.Restore')}
              </Text>
            </Text>
          </View>
        )}

        <View style={(!loginType && bottomContainer) || {}}>
          <ButtonCustom
            testID={'btn_sign_in'}
            onPress={onPressSignIn}
            text={
              loginType
                ? strLocale('account.Get Code')
                : strLocale('account.SIGN IN')
            }
            otherStyle={signInButton}
            isLoading={props.isLoading}
            isDisable={checkSignInEnable()}
          />
          <ButtonCustom
            testID={'btn_sign_up'}
            onPress={onPressLoginType}
            text={
              loginType
                ? strLocale('account.Sign in with password')
                : strLocale('account.Sign in with OTP')
            }
            otherStyle={skipButton}
            textStyle={signUpButton}
          />
          <ButtonCustom
            testID={'btn_sign_up_top'}
            onPress={onPressSignUp}
            text={strLocale('account.SIGN UP')}
            otherStyle={skipButton}
            textStyle={signUpButton}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={container}>
      <NavBar
        rightTitle={strLocale('account.SIGN UP')}
        onPressRight={onPressSignUp}
      />
      <StatusBar
        hidden={false}
        barStyle="dark-content"
        backgroundColor={'#E7F4FB'}
      />

      {renderHeader()}

      <View style={[constant.shadowView, constant.boxShadow]}>
        <ScrollView style={mainView} showsVerticalScrollIndicator={false}>
          <TitleHeader
            title={strLocale('account.Sign In')}
            mainContain={titleSignIn}
          />
          <Animated.View style={{ opacity: mainContainAnimation }}>
            {renderTextBox()}
            {renderBottom()}
          </Animated.View>
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
  mainView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 18,
  },
  descriptionText: {
    fontSize: sizes.h11,
    textAlign: 'center',
    color: '#4F5153',
    fontFamily: fonts.fontRubikRegular,
  },
  restoreText: {
    fontSize: sizes.h11,
    textAlign: 'center',
    color: '#2D8EE7',
    fontFamily: fonts.fontRubikRegular,
  },
  signInButton: {
    marginBottom: 12,
  },
  skipButton: {
    backgroundColor: constant.transparent,
    marginBottom: 5,
    height: 30,
  },
  signUpButton: {
    color: '#2D8EE7',
  },
  textInputLayout: {
    marginTop: 32,
  },
  headerView: {
    width: '100%',
    marginTop: -60,
  },
  headerSubContainer: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
  },
  bottomContainer: {
    marginTop: 20,
  },
  titleSignIn: {
    marginTop: 38,
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
    isLoading: state.account.isLoading,
  };
};

export default connect(mapStateToProps, {
  requestSignInCode,
  requestSignInPassword,
  setLoader,
})(SignInScreen);
