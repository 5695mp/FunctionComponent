import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import HomeTab from './../screens/home/home';
import MyWatchlistScreen from '../screens/watchlists/my-watchlists/my-watchlists';
import TabBarIcon from './container/TabBarIcon';
import constant from '../helper/constant';
import LinearGradient from 'react-native-linear-gradient';
import CustomAlert from '../component/CustomAlert/CustomAlert';
import AddToWatchlist from '../component/AddToWatchlist/AddToWatchlist';
import CustomizeHomeList from './../screens/home/containers/CustomizeHomeList';
import SideMenu from '../component/SideMenu/SideMenu';
import OrdersHomeScreen from '../screens/orders/orders-home/orders-home';
import PortfolioCreateOrEdit from '../screens/portfolio-create-or-edit/portfolio-create-or-edit';
import { connect } from 'react-redux';
import { resetAllAsyncStorageData } from '../helper/app-helper';
import { strLocale, setI18nConfig } from 'locale';
import { manageCustomPopUp, resetStoreData } from '../modules/account/actions';
import {
  portfoliosCustomPopUp,
  manageBrokerLoginPopUp,
} from '../modules/home/actions';
import {
  logoutAngel,
  logoutTwitter,
  logoutZerodha,
} from '../modules/broker/actions';
import {
  manageFilterMenu,
  portfoliosCategoryChange,
  manageCreateOrEditPortfolio,
  manageUnfollowPortfolioPopUp,
  setSocketAssetPriceDataAction,
} from '../modules/home/actions';
import {
  manageWatchlistPopUp,
  renameWatchlistAction,
  deleteWatchlistAction,
  manageAddWatchlistPopup,
} from '../modules/watchlist/actions';
import { manageBuyAssetPopUp } from '../modules/buy-assets/actions';
import {
  accountStack,
  homeStack,
  profileStack,
  watchlistStack,
} from './navigator';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { UserEvent } from '../helper/fabricHelper/track';
import io from 'socket.io-client/dist/socket.io';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import UnfollowPortfolioAlert from '../component/UnfollowPortfolioAlert/UnfollowPortfolioAlert';
import BrokerSelectionAlert from '../component/BrokerSelection/BrokerSelection';

const Tab = createBottomTabNavigator();
let InitRootName = 'Today';
let tabLeftSpace = 0;
let exportPortfolioWidth = (constant.screenWidth - 161) / 2;

function MyTabs(obj) {
  const { tabStyle, explorePortfolio, explorePortfolioButton } = styles;
  const paddingExplorePortfolio = 11;

  return (
    <Tab.Navigator
      initialRouteName={InitRootName}
      tabBarPosition={'bottom'}
      tabBar={props => {
        return (
          <View
            style={{
              backgroundColor: constant.darkBackgroundColor,
              height: constant.tabBarHeight + obj.safeArea,
            }}>
            <BottomTabBar
              {...props}
              navigation={props.navigation}
              style={tabStyle}
            />
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              colors={constant.tabBarGradient}
              style={[
                explorePortfolio,
                {
                  bottom: paddingExplorePortfolio + obj.safeArea,
                },
              ]}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate(homeStack.portfolios_search)
                }
                style={explorePortfolioButton}>
                <Text style={{ color: constant.lightWhiteColor }}>
                  {'Explore Portfolios'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        );
      }}
      tabBarOptions={{
        showLabel: false,
        style: styles.shadowBox,
      }}>
      <Tab.Screen
        name="Today"
        component={HomeTab}
        options={{
          tabBarIcon: ({ tintColor, focused }) => {
            return (
              <TabBarIcon
                tintColor={tintColor}
                tabName={'Today'}
                focused={focused}
                marginLeft={tabLeftSpace}
              />
            );
          },
          tabBarOnPress: ({ navigation, defaultHandler }) => {
            return defaultHandler();
          },
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={MyWatchlistScreen}
        options={{
          tabBarLabel: strLocale('tab.Watchlists'),
          tabBarIcon: ({ tintColor, focused }) => (
            <TabBarIcon
              tintColor={tintColor}
              tabName={''}
              focused={focused}
              marginLeft={tabLeftSpace}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersHomeScreen}
        options={{
          tabBarLabel: strLocale('tab.Orders'),
          tabBarIcon: ({ tintColor, focused }) => (
            <TabBarIcon
              tintColor={tintColor}
              tabName={''}
              focused={focused}
              marginLeft={tabLeftSpace}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Invest"
        component={OrdersHomeScreen}
        options={{
          tabBarLabel: strLocale('tab.Orders'),
          tabBarIcon: ({ tintColor, focused }) => (
            <TabBarIcon
              tabBarTestID={'Profile'}
              tintColor={tintColor}
              tabName={'Invest'}
              focused={focused}
              marginLeft={tabLeftSpace}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AppTab = props => {
  const [brokerAlertData] = useState(constant.customAlert(strLocale).broker);
  const navigation = useNavigation();
  const { container } = styles;
  function getSocketConnection(token) {
    return io.connect(Config.LIVE_SOCKET_URL, {
      query: {
        token: token,
      },
      transports: ['websocket'],
      reconnection: true,
    });
  }

  function destroySocketConnection() {
    io.disconnect();
  }

  useEffect(() => {
    let socket;
    let userToken;
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        let userData = JSON.parse(user);
        userToken = userData.token;
      }
      if (userToken) {
        socket = getSocketConnection(userToken);
        socket.on('SUBSCRIBE_TO_ASSET', data => {
          const socketData = data?.instrumentValues;
          let socketDataDict = {};
          for (let i = 0; i < socketData.length; i++) {
            socketDataDict[socketData[i][0].split(':')[0]] = socketData[i];
          }
          props.setSocketAssetPriceDataAction(socketDataDict);
        });

        socket.on('error', data => {});
        socket.on('disconnect', data => {});
      } else {
        destroySocketConnection();
      }
    });
    return () => {};
  }, []);

  const onHideCustomPopUp = (title, type, selectedType = false) => {
    props.manageCustomPopUp({
      isShow: false,
      rewiringDetail: {},
    });

    //Take action on Custom popup
    switch (title) {
      case 'LOG OUT':
        if (type === 'logout') {
          props.resetStoreData();
          resetAllAsyncStorageData();
          setI18nConfig();
          //reset subscription
          navigation.reset({
            index: 0,
            routes: [{ name: accountStack.sign_up }],
          });
          if (selectedType) {
            props
              .logoutAngel()
              .then(() => {})
              .catch(() => {});
            props
              .logoutZerodha()
              .then(() => {})
              .catch(() => {});
          }
        } else if (type === 'logout_broker') {
          props
            .logoutAngel()
            .then(() => {})
            .catch(() => {});
        } else if (type === 'logout_twitter') {
          props
            .logoutTwitter()
            .then(() => {})
            .catch(() => {});
        } else if (type === 'logout_broker_zerodha') {
          props
            .logoutZerodha()
            .then(() => {})
            .catch(() => {});
        }
        break;
      default:
        break;
    }
  };

  const onHideFilterMenu = title => {
    props.manageFilterMenu(false);
  };

  const onHidePortfoliosPopUp = (title, obj) => {
    if (title === 'SAVE') {
      props.portfoliosCategoryChange(obj);
    }
    props.portfoliosCustomPopUp(false);
  };

  const manageRenamePopUp = val => {
    if (val === 'CANCEL') {
      onHideWatchlistPopUp();
    } else {
      onHideWatchlistPopUp();
      props.renameWatchlistAction(
        props.watchlists[props.activeWatchlistIndexValue].id,
        props.renameInput,
      );
    }
  };

  const manageDeletePopUp = val => {
    if (val === 'CANCEL') {
      onHideWatchlistPopUp();
    } else {
      onHideWatchlistPopUp();
      props.deleteWatchlistAction(
        props.watchlists[props.activeWatchlistIndexValue].id,
        props.watchlists,
        props.activeWatchlistIndexValue,
      );
    }
  };

  const onHideWatchlistPopUp = () => {
    props.manageWatchlistPopUp({
      isShow: false,
      type: '',
    });
  };

  const onHideCreateOrEditPopUp = () => {
    props.manageCreateOrEditPortfolio({
      isShow: false,
      data: '',
    });
  };

  const onHideAddWatchListPopUp = () => {
    props.manageAddWatchlistPopup({
      isShow: false,
      data: '',
    });
  };

  const openEditWatchlistNamePopUp = () => {
    UserEvent.userTrackScreen('watchlists_default_rename');
    props.manageWatchlistPopUp({
      isShow: true,
      type: 'rename',
    });
  };

  const openDeleteWatchlistPopUp = () => {
    UserEvent.userTrackScreen('watchlists_default_delete');
    props.manageWatchlistPopUp({
      isShow: true,
      type: 'delete',
    });
  };

  const openWatchlistAddAssetsScreen = () => {
    UserEvent.userTrackScreen('watchlists_addnew');
    props.manageWatchlistPopUp({
      isShow: false,
      type: '',
    });
    navigation.navigate(watchlistStack.add_assets);
  };

  const onHideBrokerPopUp = (title, value, type) => {
    props.manageBrokerLoginPopUp(false);
    if (title === 'SPECIFY') {
      switch (type) {
        case 0:
          navigation.navigate(profileStack.broker);
          break;
        case 1:
          navigation.navigate(profileStack.broker, {
            brokerType: 'kite',
          });
          break;
      }
    }
  };
  return (
    <View style={container}>
      <StatusBar backgroundColor={'#000000'} />
      <MyTabs safeArea={props.safeAreaInsetsDefault.bottom} />
      {props.customPopUp.isShow && (
        <CustomAlert
          data={props.customPopUp.data}
          onAlertClick={onHideCustomPopUp}
        />
      )}
      {props.customPopUp.isShow && (
        <CustomAlert
          data={props.customPopUp.data}
          onAlertClick={onHideCustomPopUp}
        />
      )}
      {props.filterMenu && (
        <SideMenu
          data={props.customPopUp.data}
          onAlertClick={onHideFilterMenu}
        />
      )}
      {props.portfoliosPopUp && (
        <CustomizeHomeList
          data={props.customPopUp.data}
          onAlertClick={onHidePortfoliosPopUp}
        />
      )}
      {props.watchlistPopUp.isShow && props.watchlistPopUp.type === 'rename' && (
        <CustomAlert
          data={{
            data: [],
            left: 'CANCEL',
            right: 'RENAME',
            isSingleButton: false,
          }}
          isInputAlert={true}
          inputAlertData={{
            title: 'Rename Watchlist',
            label: 'NAME',
          }}
          onAlertClick={manageRenamePopUp}
        />
      )}
      {props.watchlistPopUp.isShow && props.watchlistPopUp.type === 'delete' && (
        <CustomAlert
          data={{
            data: [
              {
                title: 'Do you want to delete watchlist "Default"?',
                description:
                  'You will unsubscribe from all portfolios in this watchlist. You will not be able to recover this watchlist',
              },
            ],
            right: 'DELETE',
            left: 'CANCEL',
            isSingleButton: false,
            rightBtnStyle: { backgroundColor: '#E7582D' },
            leftBtnStyle: { backgroundColor: '#fff' },
            rightTxtStyle: { color: '#fff' },
            leftTxtStyle: { color: constant.appBlueColor },
          }}
          onAlertClick={manageDeletePopUp}
        />
      )}
      {props.watchlistPopUp.isShow && props.watchlistPopUp.type === 'list' && (
        <CustomAlert
          data={{
            left: 'CANCEL',
            right: 'LOG OUT',
            isSingleButton: false,
          }}
          onAlertClick={onHideWatchlistPopUp}
          listData={[
            { title: 'Edit Name', func: openEditWatchlistNamePopUp },
            { title: 'Add New Assets', func: openWatchlistAddAssetsScreen },
            { title: 'Delete', func: openDeleteWatchlistPopUp },
          ]}
        />
      )}
      {props.portfoliosAddOrEdit.isShow && (
        <PortfolioCreateOrEdit
          data={props.portfoliosAddOrEdit.data}
          onAlertClick={onHideCreateOrEditPopUp}
        />
      )}
      {props.addWatchlistPopUp.isShow && (
        <AddToWatchlist
          data={props.addWatchlistPopUp.data}
          onAlertClick={onHideAddWatchListPopUp}
        />
      )}
      {false && (
        <CustomAlert
          data={{
            data: [
              {
                title: 'UNABLE TO EXECUTE ALL ORDERS',
                description: 'Kindly try again or delete stocks from portfolio',
              },
            ],
            left: 'OK',
            isSingleButton: true,
            leftBtnStyle: { backgroundColor: constant.appBlueColor },
            leftTxtStyle: { color: '#fff' },
          }}
          notSelectedCell={true}
        />
      )}
      {false && (
        <CustomAlert
          data={{
            data: [
              {
                title: 'SUCCESSFULLY EXECUTED ALL ORDERS',
                description: 'Check orders page to track your orders',
              },
            ],
            left: 'OK',
            isSingleButton: true,
            leftBtnStyle: { backgroundColor: constant.appBlueColor },
            leftTxtStyle: { color: '#fff' },
          }}
          notSelectedCell={true}
        />
      )}
      {props.unfollowPortfolioPopUp.isShow && <UnfollowPortfolioAlert />}
      {props.brokerLoginPopUp.isShow && (
        <BrokerSelectionAlert
          data={brokerAlertData}
          onAlertClick={onHideBrokerPopUp}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadowBox: {
    elevation: 4,
    marginBottom: 5,
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    shadowColor: 'red',
    shadowOffset: { width: 10, height: -3 },
    shadowOpacity: 0.5,
    shadowRadius: 10.0,
  },
  tabStyle: { backgroundColor: 'transparent', elevation: 0 },
  explorePortfolio: {
    position: 'absolute',
    top: 11,
    left: 0,
    right: 0,
    marginHorizontal: exportPortfolioWidth,
    borderRadius: 50,
  },
  explorePortfolioButton: {
    flex: 1,
    margin: 3,
    backgroundColor: constant.mediumDark,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
    customPopUp: state.account.customPopUp,
    filterMenu: state.home.filterMenu || false,
    portfoliosPopUp: state.home.portfoliosPopUp || false,
    watchlistPopUp: state.watchlist.customPopUp,
    watchlists: state.watchlist.watchlists,
    activeWatchlistIndexValue: state.watchlist.activeWatchlistIndex,
    renameInput: state.watchlist.renameInput,
    portfoliosAddOrEdit: state.home.portfoliosAddOrEdit,
    addWatchlistPopUp: state.watchlist.addWatchlistPopUp,
    buyAssetPopUp: state.buyAsset.customPopUp,
    unfollowPortfolioPopUp: state.home.unfollowPortfolioPopUp,
    socketAssetPriceData: state.home.socketAssetPriceData,
    brokerLoginPopUp: state.home.brokerLoginPopUp,
  };
};

export default connect(mapStateToProps, {
  resetStoreData,
  manageCustomPopUp,
  manageFilterMenu,
  portfoliosCustomPopUp,
  portfoliosCategoryChange,
  manageWatchlistPopUp,
  renameWatchlistAction,
  deleteWatchlistAction,
  logoutAngel,
  logoutZerodha,
  logoutTwitter,
  manageCreateOrEditPortfolio,
  manageAddWatchlistPopup,
  manageBuyAssetPopUp,
  manageUnfollowPortfolioPopUp,
  setSocketAssetPriceDataAction,
  manageBrokerLoginPopUp,
})(AppTab);
