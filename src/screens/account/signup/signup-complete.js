import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import constant from '../../../helper/constant';
import ButtonCustom from '../../../component/ButtonCustom/ButtonCustom';
import NavBar from '../../../component/NavBarAccount/NavBarAccount';
import TitleHeader from '../signup/containers/TitleHeader';
import fonts, { sizes } from '../../../helper/fonts';
import CompletedStar from './containers/CompletedStar';
import IconVector from './containers/IconVector';
import { strLocale } from 'locale';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { appTabStack } from '../../../navigation/navigator';
import { UserEvent } from '../../../helper/fabricHelper/track';

const SignupCompleteScreen = props => {
  const navigation = useNavigation();

  const {
    container,
    mainContainer,
    subContainer,
    successfulText,
    finishText,
    descriptionText,
    doneButton,
    doneButtonText,
    completeProfileButton,
    finishViewBox,
    profileText,
    imageViewBox,
    informationView,
    headerTitle,
  } = styles;

  const onPressCompleteProfile = () => {
    UserEvent.userTrackScreen('signup_successful_profile');
    navigation.reset({
      index: 0,
      routes: [{ name: appTabStack.app_tab }],
    });
  };

  const renderImageBox = () => {
    return (
      <View style={imageViewBox}>
        <IconVector
          mainCicle={{ backgroundColor: '#27C5C1' }}
          subCicle={{ backgroundColor: '#27C5C1' }}
          image={'correct'}
        />
      </View>
    );
  };

  const renderMessageNote = () => {
    return (
      <View style={subContainer}>
        <Text style={successfulText}>{strLocale('account.Successful')}</Text>
        <View style={finishViewBox}>
          <Text style={finishText}>
            {strLocale('account.successful finished')}
          </Text>
        </View>
        <View>
          <Text style={profileText}>
            {strLocale('account.PROFILE COMPLETENESS')}
          </Text>
        </View>

        <CompletedStar noOfImage={5} selectedImage={2} />

        <View style={informationView}>
          <Text style={descriptionText}>
            {strLocale('account.Successful description')}
          </Text>
        </View>
      </View>
    );
  };

  const renderBottom = () => {
    return (
      <View>
        <ButtonCustom
          testID={'btn_complete_profile'}
          onPress={onPressCompleteProfile}
          text={strLocale('account.COMPLETE PROFILE')}
          otherStyle={completeProfileButton}
        />
        <ButtonCustom
          onPress={onPressCompleteProfile}
          text={strLocale('account.DONE')}
          otherStyle={doneButton}
          textStyle={doneButtonText}
        />
      </View>
    );
  };

  return (
    <View style={container}>
      <NavBar
        backScreenName={strLocale('account.USER PROFILE')}
        onPressBack={onPressCompleteProfile}
      />
      <View style={[constant.shadowView, constant.boxShadow]}>
        <ScrollView
          style={mainContainer}
          showsVerticalScrollIndicator={false}
          testID={'scroll_down'}>
          <TitleHeader
            title={strLocale('account.Sign Up')}
            description={strLocale('account.Complete Registration')}
            selectedSlider={3}
            noOfSlider={3}
            mainContain={headerTitle}
          />
          <View>
            {renderImageBox()}
            {renderMessageNote()}
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
  headerTitle: {
    marginTop: 38,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 18,
  },
  subContainer: {
    marginTop: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  informationView: {
    marginTop: 18,
    marginBottom: 43,
    marginHorizontal: 8,
  },
  imageViewBox: {
    marginTop: 41,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successfulText: {
    fontSize: sizes.h5,
    color: constant.appGrayColor,
    fontFamily: fonts.fontRubikRegular,
  },
  descriptionText: {
    fontSize: sizes.h12,
    color: constant.appGrayColor,
    fontFamily: fonts.fontRubikRegular,
    textAlign: 'center',
    lineHeight: 22,
  },
  finishViewBox: {
    marginTop: 6,
    marginBottom: 38,
  },
  finishText: {
    fontSize: sizes.h12,
    color: constant.appGrayColor,
    fontFamily: fonts.fontRubikRegular,
    textAlign: 'center',
    marginHorizontal: 8,
    lineHeight: 22,
  },
  profileText: {
    fontSize: sizes.h12,
    color: constant.textHeaderColor,
    fontFamily: fonts.fontViga,
    marginBottom: 7,
  },
  completeProfileButton: {
    marginBottom: 12,
    backgroundColor: constant.textHeaderColor,
  },
  doneButton: {
    backgroundColor: constant.transparent,
    marginBottom: 5,
    height: 30,
  },
  doneButtonText: {
    color: constant.textHeaderColor,
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
  };
};

export default connect(mapStateToProps, {})(SignupCompleteScreen);
