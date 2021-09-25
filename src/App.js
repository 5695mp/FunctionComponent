/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { StatusBar, Text, View, TextInput, LogBox } from 'react-native';
import AsyncStorage2 from '@react-native-async-storage/async-storage';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
Text.allowFontScaling = false;
TextInput.allowFontScaling = false;

global.Buffer = global.Buffer || require('buffer').Buffer;

import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { Screen } from './navigation/screens';
import { ThemeContext } from 'AppTheme';
import storage from 'redux-persist/lib/storage';
import AppReducer from './reducer';
import InitialSplashView from './component/Splash/Splash';
import thunk from 'redux-thunk';
import getStoredStateMigrateV4 from 'redux-persist/lib/integration/getStoredStateMigrateV4';
import dynamicLinks from '@react-native-firebase/dynamic-links';

//React-native-screen use in globally
enableScreens();

//setup navigation
const persistConfig = {
  key: 'root',
  storage,
  getStoredState: getStoredStateMigrateV4({
    blacklist: ['navigation'],
    storage: AsyncStorage2,
  }),
  timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, AppReducer);
let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

//Ignore to show warning.
LogBox.ignoreAllLogs();

const App: () => Node = () => {
  const [theme] = useState('DARK');

  const getQueryStringParamsCustom = query => {
    let params = {};
    try {
      let url = query.split('?');
      const paramsFromURL = url[1].split('&');
      for (let i = 0; i < paramsFromURL.length; i++) {
        let valueArray = paramsFromURL[i].split('=');
        if (!valueArray[0]) {
          continue;
        }
        params[valueArray[0]] = valueArray[1] || true;
      }
    } catch (e) {}
    return params;
  };

  const handleDynamicLink = link => {
    // Handle dynamic link inside your own application
    getDeepLinkID(link.url);
  };

  const getDeepLinkID = url => {
    try {
      // Handle dynamic link inside your own application
      const params = getQueryStringParamsCustom(url);
      const entity = params.entity;
      const id = params.entityId;

      global.entity = entity;
      global.entityId = id;
    } catch (e) {}
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link) {
          //Handle when app start
          getDeepLinkID(link.url);
        }
      });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<InitialSplashView />} persistor={persistor}>
        <ThemeContext.Provider value={theme}>
          <View style={{ flex: 1 }}>
            <StatusBar hidden={false} barStyle="light-content" />
            <NavigationContainer>
              <Screen />
            </NavigationContainer>
          </View>
        </ThemeContext.Provider>
      </PersistGate>
    </Provider>
  );
};

export default App;
