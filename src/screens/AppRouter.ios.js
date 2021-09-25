import React, { useEffect } from 'react';
import SafeArea from 'react-native-safe-area';
import { Animated } from 'react-native';
import InitialSplashView from '../component/Splash/Splash';
import constant from '../helper/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import {
  setLoader,
  setSafeAreaIntent,
  resetServerTimer,
  manageCustomPopUp,
  loadAppData,
} from '../modules/account/actions';
import { setI18nConfig } from 'locale';
import { accountStack, appTabStack } from '../navigation/navigator';
import {
  manageCreateOrEditPortfolio,
  manageFilterMenu,
  portfoliosCustomPopUp,
  portfoliosFilterUpdate,
} from '../modules/home/actions';
import {
  fillWatchlistsDataAction,
  searchInputAction,
  resetWatchlistsCache,
  manageAddWatchlistPopup,
} from '../modules/watchlist/actions';
import { manageBuyAssetPopUp } from '../modules/buy-assets/actions';
import { filterGroup } from '../modules/home/validator';

const InitComponent = props => {
  const navigation = useNavigation();

  useEffect(() => {
    setSafeArea();
    languageSetup();
    resetReduxWhenLaunch();

    setTimeout(() => {
      AsyncStorage.getItem('user').then(user => {
        if (user) {
          props.loadAppData();
          navigation.reset({
            index: 0,
            routes: [{ name: appTabStack.app_tab }],
          });
        } else {
          if (constant.isDevelop) {
            navigation.reset({
              index: 0,
              routes: [{ name: accountStack.terms_and_privacy }],
            });
          } else {
            AsyncStorage.getItem('isPromoPage').then(user => {
              if (user) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: accountStack.sign_up }],
                });
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: accountStack.tutorial }],
                });
              }
            });
          }
        }
      });
    }, 1600);
  });

  const languageSetup = () => {
    let language = { title: 'English', dbValue: 'en', isRTL: false };
    setI18nConfig(language);
  };

  const setSafeArea = () => {
    SafeArea.getSafeAreaInsetsForRootView().then(result => {
      let temp = {
        top:
          result.safeAreaInsets.top > 0
            ? result.safeAreaInsets.top - 20
            : result.safeAreaInsets.top,
        bottom: result.safeAreaInsets.bottom,
        left: result.safeAreaInsets.left,
        right: result.safeAreaInsets.right,
      };
      let obj = cloneDeep(temp);
      props.setSafeAreaIntent(obj);
      SafeArea.removeEventListener('safeAreaInsetsForRootViewDidChange');
    });
  };

  const resetReduxWhenLaunch = () => {
    props.setLoader(false);
    props.resetServerTimer(0);
    props.manageCustomPopUp({
      isShow: false,
      rewiringDetail: {},
    });
    props.manageCreateOrEditPortfolio({
      isShow: false,
      data: {},
    });
    props.manageAddWatchlistPopup({
      isShow: false,
      data: {},
    });
    props.manageFilterMenu(false);
    props.portfoliosCustomPopUp(false);
    props.portfoliosFilterUpdate(filterGroup());
    props.fillWatchlistsDataAction(0);
    props.searchInputAction('');
    props.resetWatchlistsCache();
    props.manageBuyAssetPopUp({
      isShow: false,
      type: '',
    });
  };

  return <InitialSplashView />;
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {
  setSafeAreaIntent,
  setLoader,
  resetServerTimer,
  manageCustomPopUp,
  loadAppData,
  manageFilterMenu,
  portfoliosCustomPopUp,
  portfoliosFilterUpdate,
  fillWatchlistsDataAction,
  searchInputAction,
  manageCreateOrEditPortfolio,
  resetWatchlistsCache,
  manageAddWatchlistPopup,
  manageBuyAssetPopUp,
})(InitComponent);
