import { Dimensions, Platform } from 'react-native';
import DarkThemeColor from './multi-theme/dark-theme-color';
import DefaultThemeColor from './multi-theme/default-theme-color';

const customAlert = strLocale => {
  return {
    logOut: {
      data: [
        {
          title: strLocale('alert.Log out'),
          description: strLocale(
            'alert.Do you want to log out of the Trinkerr app',
          ),
        },
      ],
      left: 'CANCEL',
      right: 'LOG OUT',
      isSingleButton: false,
      type: 'logout',
    },
    logOutBroker: {
      data: [
        {
          title: strLocale('alert.Log out from the broker'),
          description: strLocale(
            'alert.This action will log you out from the current broker',
          ),
        },
      ],
      left: 'CANCEL',
      right: 'LOG OUT',
      isSingleButton: false,
      type: 'logout_broker',
    },
    logOutZerodhaBroker: {
      data: [
        {
          title: strLocale('alert.Log out from the broker'),
          description: strLocale(
            'alert.This action will log you out from the current broker',
          ),
        },
      ],
      left: 'CANCEL',
      right: 'LOG OUT',
      isSingleButton: false,
      type: 'logout_broker_zerodha',
    },
    logOutTwitter: {
      data: [
        {
          title: strLocale('alert.Log out from the Twitter'),
          description: strLocale('alert.Do you want to logout'),
        },
      ],
      left: 'CANCEL',
      right: 'LOG OUT',
      isSingleButton: false,
      type: 'logout_twitter',
    },
    broker: {
      data: [
        {
          title: 'Broker Accounts',
          description: 'Specify your broker account to follow the portfolio',
          image: 'angel_broking',
        },
      ],
      listingData: [
        {
          title: 'Angel Broking',
          image: 'angel_broking_icon',
        },
        {
          title: 'Zerodha',
          image: 'zerodha',
        },
      ],
      left: 'CANCEL',
      right: 'SPECIFY',
      isSingleButton: false,
      type: 'broker',
    },
    linkTwitter: {
      data: [
        { title: 'Your account has not linked with your Twitter account' },
      ],
      listingData: [
        {
          title: 'Link your account with Twitter',
        },
        {
          title: 'Continue without account linking',
        },
      ],
      left: 'CANCEL',
      right: 'CONTINUE',
      isSingleButton: false,
      type: 'twitter_linking',
    },
  };
};

const customAlert2 = strLocale => {
  return {
    logOut: {
      data: [
        {
          title: 'Log out',
          description: 'you want to log out of the Trinkerr app',
        },
      ],
      left: 'CANCEL',
      right: 'LOG OUT',
      isSingleButton: false,
    },
  };
};

module.exports = {
  appName: 'Trinkerr',
  isRelease: true,
  isDevelop: false,
  isLoadShow: true,
  isShowAPI: true,
  apiTesting: false,
  testUser: 'test@gmail.com',

  /** Custom Alert */
  customAlert,
  customAlert2,

  /** App Color */
  appBlueColor: '#2D8EE7',
  appRedColor: '#E72D5F',
  appGrayColor: '#59595C',
  appBackgroundColor: '#E7F4FB',
  appSkyBlueColor: '#27C5C1',
  appBlueNewColor: '#1890FF',
  appLightGray: '#BCBCBF',
  appGrayNew: '#F9F9F9',

  /** multiple theme */
  LIGHT: DefaultThemeColor,
  DARK: DarkThemeColor,

  /** screen */
  screen: Dimensions.get('window'),
  screenHeight:
    (Platform.OS === 'ios' && Dimensions.get('window').height) ||
    Dimensions.get('window').height - 24,
  screenWidth: Dimensions.get('window').width,
  fullScreenHeight: Dimensions.get('window').height,
  buttonWidth: Dimensions.get('window').width - 36,

  /** iphone and android condition */
  isIphoneX: Platform.OS === 'ios' && Dimensions.get('window').height === 812,
  isIOS: Platform.OS === 'ios',
  isiPAD:
    Dimensions.get('window').height / Dimensions.get('window').width < 1.6,
  isIpad:
    Dimensions.get('window').width > 400 &&
    Dimensions.get('window').height / Dimensions.get('window').width < 1.6,
  isANDROID: Platform.OS === 'android',

  /** common color */
  backProgressBarColor: '#297AC4',
  transparent: 'transparent',
  lightBlue: '#9E89FF',
  darkBackgroundColor: '#111111',
  buttonFontColor: '#000000',
  lightWhiteColor: '#FFFFFF',
  textInputBorderColor: '#BB86FC',
  textGrayColor: 'rgba(255, 255, 255, 0.6)',
  whiteColor: '#ffffff',
  appBackgroundColorDark: '#E5E5E5',

  /** HomeTabGradient */
  startGreenGradient: 'rgba(187, 134, 252, 0.1)',
  radiusPinkGradient: 'rgba(177, 77, 186, 0.4)',
  linearBlueGradient: 'rgba(75, 41, 148, 0.7)',
  linearBlackGradient: 'rgba(35, 35, 35, 1)',
  linearDarkBlackGradient: 'rgba(255, 255, 255, 0.07)',

  /** promo */
  backgroundGradientStart: '#297AC5',
  backgroundGradientEnd: '#0075B7',
  errorBorderColor: '#DD9EAF',
  borderHighLightsColor: '#68A5DE',
  textBorderColor: '#CCDCE6',
  textBackgroundColor: '#FEF4F7',
  textErrorBackgroundColor: '#FDFDFD',
  textHeaderErrorColor: '#E72D5F',
  textHeaderColor: '#2D8EE7',
  iconPasswordHide: 'icon_hiddeneye',
  iconPasswordShow: 'icon_openeye',

  /** signIn */
  imageHeaderLogo: 'trinkerrlogo',

  /** signUp */
  codeBorderColor: '#CCDCE5',
  codeBorderFill: '#2D8EE7',
  codeBackground: '#FDFDFD',
  codeErrorBackground: 'rgba(231, 45, 95, 0.05)',
  codeBorderErrorFill: '#DD9EAF',
  codeIndicatorColor: '#59595C',

  /** tabBar */
  gradientStartTab: '#2D8EE6',
  gradientEndTab: '#297AC4',

  /** Trends Color */
  upGreen: '#27C5C1',
  downRed: '#E7582D',

  /** Dark theme colors */
  mediumDark: '#1E1E1E',
  lightDark: '#252525',
  lightWhite: 'rgba(255, 255, 255, 0.87)',
  primaryPurple: '#BB86FC',
  lightGrey: 'rgba(255, 255, 255, 0.6)',

  /** Tab Bar */
  tabBarGradient: [
    'rgba(238, 51, 255, 0.85)',
    'rgba(255, 248, 79, 0.85)',
    'rgba(0, 212, 255, 0.85)',
  ],
  tabSelected: '#BB86FC',
  tabUnSelected: '#FFFFFF',

  promoList: [
    {
      text: 'Bet you wish you could time travel right now!',
      description:
        'If you invested 1000 in 2016, your investment would be worth 5,071.24 today with an annual return rate of 67.85% and total profit of 4,071.24',
      image: 'onboarding_graph',
    },
    {
      text: 'Radically simple investing ',
      description:
        'Built for everyone, no matter how much experience you have (or don’t have)',
    },
    {
      text: 'Trinkerr supports multiple brokerage firms',
      description:
        'Continue to trade with your favourite broker. Trinkerr supports Zerodha and Angel One, and many more are in the process of being integrated',
    },
  ],

  tutorialList: [' easier', ' social', ' open'],
  tutorialText: 'The app that makes\ninvestment',

  IndianTerritories: [
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Island',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Ladakh',
    'Lakshadweep',
    'Jammu and Kashmir',
    'Puducherry',
  ],

  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  boxShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 10, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 8.0,
    elevation: 20,
  },
  viewShadow: {
    shadowColor: '#164672',
    shadowOffset: { width: 10, height: -3 },
    shadowOpacity: 0.04,
    shadowRadius: 4.0,
    elevation: 4,
  },
  shadowView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  blackShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 10, height: -3 },
    shadowOpacity: 0.03,
    shadowRadius: 2.0,
    elevation: 4,
  },
  tabIcon: {
    Today: 'tab_home_new',
    Orders: 'tab_orders',
    Invest: 'tab_invest',
    Watchlists: 'tab_watchlists',
  },
  selectedTabIcon: {
    Today: 'tab_home_selected',
    Orders: 'tab_orders_selected',
    Profile: 'tab_profile_selected',
    Watchlists: 'tab_watchlists_selected',
  },

  pagination: 20,

  headerBGColor: '#262626',
  headerHeight: 60,
  tabBarHeight: 60,
};

/*
{ fontWeight: '100' }, // Thin
{ fontWeight: '200' }, // Ultra Light
{ fontWeight: '300' }, // Light
{ fontWeight: '400' }, // Regular
{ fontWeight: '500' }, // Medium
{ fontWeight: '600' }, // Semibold
{ fontWeight: '700' }, // Bold
{ fontWeight: '800' }, // Heavy
{ fontWeight: '900' }, // Black
 */
