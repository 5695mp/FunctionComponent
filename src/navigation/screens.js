import constant from '../helper/constant';
import React from 'react';

//Welcome/Login Flow
import AppRouterScreen from '../screens/AppRouter';
import TutorialScreen from '../screens/account/tutorial/tutorial';
import PromoScreen from '../screens/account/promo/promo';
import SignUpScreen from '../screens/account/signup/signup';
import SignInScreen from '../screens/account/signin/signin';
import SignupVerificationCodeScreen from '../screens/account/signup/signup-verification-code/signup-verification-code';
import SignupVerificationPhoneExistsScreen from '../screens/account/signup/signup-verification-phone-exists';
import SignupCompleteScreen from '../screens/account/signup/signup-complete';
import SignUpAccountCreationScreen from '../screens/account/signup/signup-account-creation/signup-account-creation';
import TermsAndPrivacyScreen from '../screens/account/terms-and-privacy/terms-and-privacy';
import RecoveryStartScreen from '../screens/account/password-recovery/recovery-start';
import RecoverySentSuccessScreen from '../screens/account/password-recovery/recovery-sent-success';
import RecoverySetPasswordScreen from '../screens/account/password-recovery/recovery-set-password';

//App Tab
import AppTabScreen from '../navigation/app-tab';

//Profile
import ProfileTabScreen from '../screens/profile/profile';
import ProfileChangePasswordScreen from '../screens/profile/profile-change-password';
import ProfilePhoneChangeScreen from '../screens/profile-phone-change/profile-phone-change';
import KnowledgeExperienceStartScreen from '../screens/knowledge-experience/knowledge-experience-start/knowledge-experience-start';
import KnowledgeExperienceQuestionScreen from '../screens/knowledge-experience/knowledge-experience-question';
import TwitterScreen from '../screens/twitter/twitter';
import ProfileDetailsFormScreen from '../screens/profile/profile-details-form';

//Watchlist
import MyWatchlistsScreen from '../screens/watchlists/my-watchlists/my-watchlists';
import AssetDetailsScreen from '../screens/watchlists/general-details/asset-details';
import NothingFoundScreen from '../screens/watchlists/add-assets/nothing-found';
import AddWatchlistScreen from '../screens/watchlists/add-assets/add-watchlist';
import NoInputPage from '../screens/watchlists/add-assets/no-input-page';
import AddAssetsScreen from '../screens/watchlists/add-assets/add-assets';
import BrokerScreen from '../screens/broker/broker';

//Home
import PortfolioDetailScreen from '../screens/portfolios/portfolio-details';
import HomeDetailTab from '../screens/home/home-detail';
import PortfoliosSearchScreen from '../screens/home/portfolios-search';
import StartFollowingScreen from '../screens/start-following/start-following';
import RewardsGiftScreen from '../screens/home/rewards/rewards-gift';

//Search
import SearchScreen from '../screens/search/search';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
//Orders
import OrdersHomeScreen from '../screens/orders/orders-home/orders-home';

//Traders
import TraderDetailsScreen from '../screens/trader/trader-details/trader-details';

//Buy Assets
import BuyAssetScreen from '../screens/buy-assets/buy-assets';

//Notification
import NotificationScreen from '../screens/notifications/notifications';
import NotificationList from '../screens/notifications/containers/NotificationsList';
import NotificationCancel from '../screens/notifications/containers/NotificationsCancel';

const Stack =
  (constant.isIOS && createNativeStackNavigator()) ||
  createNativeStackNavigator();

export function Screen() {
  return (
    <Stack.Navigator
      // initialRouteName="TutorialScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="AppRouterScreen"
        options={{ stackAnimation: 'none' }}
        component={AppRouterScreen}
      />
      <Stack.Screen name="TutorialScreen" component={TutorialScreen} />
      <Stack.Screen name="PromoScreen" component={PromoScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen
        name="SignupVerificationCodeScreen"
        component={SignupVerificationCodeScreen}
      />
      <Stack.Screen
        name="SignupVerificationPhoneExistsScreen"
        component={SignupVerificationPhoneExistsScreen}
      />
      <Stack.Screen
        name="SignupCompleteScreen"
        component={SignupCompleteScreen}
      />
      <Stack.Screen
        name="SignUpAccountCreationScreen"
        component={SignUpAccountCreationScreen}
      />
      <Stack.Screen
        name="TermsAndPrivacyScreen"
        component={TermsAndPrivacyScreen}
      />
      <Stack.Screen
        name="RecoveryStartScreen"
        component={RecoveryStartScreen}
      />
      <Stack.Screen
        name="RecoverySentSuccessScreen"
        component={RecoverySentSuccessScreen}
      />
      <Stack.Screen
        name="RecoverySetPasswordScreen"
        component={RecoverySetPasswordScreen}
      />
      <Stack.Screen name="ProfileTabScreen" component={ProfileTabScreen} />
      <Stack.Screen
        name="ProfileChangePasswordScreen"
        component={ProfileChangePasswordScreen}
      />
      <Stack.Screen
        name="ProfilePhoneChangeScreen"
        component={ProfilePhoneChangeScreen}
      />
      <Stack.Screen
        name="ProfileDetailsFormScreen"
        component={ProfileDetailsFormScreen}
      />
      <Stack.Screen
        name="KnowledgeExperienceStartScreen"
        component={KnowledgeExperienceStartScreen}
      />
      <Stack.Screen
        name="KnowledgeExperienceQuestionScreen"
        component={KnowledgeExperienceQuestionScreen}
      />
      <Stack.Screen name="MyWatchlistsScreen" component={MyWatchlistsScreen} />
      <Stack.Screen name="AssetDetailsScreen" component={AssetDetailsScreen} />
      <Stack.Screen name="AddAssetsScreen" component={AddAssetsScreen} />
      <Stack.Screen name="NoInputPage" component={NoInputPage} />
      <Stack.Screen name="AddWatchlistScreen" component={AddWatchlistScreen} />
      <Stack.Screen name="NothingFoundScreen" component={NothingFoundScreen} />
      <Stack.Screen
        name="PortfolioDetailScreen"
        component={PortfolioDetailScreen}
      />
      <Stack.Screen name="OrdersHomeScreen" component={OrdersHomeScreen} />
      <Stack.Screen name="HomeDetailScreen" component={HomeDetailTab} />
      <Stack.Screen
        name="PortfoliosSearchScreen"
        component={PortfoliosSearchScreen}
      />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="BrokerScreen" component={BrokerScreen} />
      <Stack.Screen
        name="StartFollowingScreen"
        component={StartFollowingScreen}
      />
      <Stack.Screen name="RewardsGiftScreen" component={RewardsGiftScreen} />
      <Stack.Screen name="AppTabScreen" component={AppTabScreen} />
      <Stack.Screen name="TwitterScreen" component={TwitterScreen} />
      <Stack.Screen
        name="TraderDetailsScreen"
        component={TraderDetailsScreen}
      />
      <Stack.Screen name="BuyAssetScreen" component={BuyAssetScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="NotificationList" component={NotificationList} />
      <Stack.Screen name="NotificationCancel" component={NotificationCancel} />
    </Stack.Navigator>
  );
}
