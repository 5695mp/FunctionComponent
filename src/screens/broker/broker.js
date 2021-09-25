import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../../component/NavBar/NavBar';
import { WebView } from 'react-native-webview';
import {
  getBrokerAngelLogin,
  requestSetAngel,
} from '../../modules/broker/actions';
import constant from '../../helper/constant';
import { useNavigation, useRoute } from '@react-navigation/native';
import { strLocale } from 'locale';
import { BrokerConfig } from '../../modules/broker/validator';

const BrokerScreen = props => {
  const navigation = useNavigation();
  const { params } = useRoute();
  let isBack = false;

  const { container, loadingContainer } = styles;

  const [isLoading, setIsLoading] = useState(false);
  const [angelWebURL, setAngelWebURL] = useState(props.angelURL || '');
  const [brokerDetail] = useState(
    BrokerConfig((params && params.brokerType) || 'angel'),
  );

  useEffect(() => {
    try {
      props.getBrokerAngelLogin(brokerDetail.credentialUrl).then(res => {
        try {
          setAngelWebURL(brokerDetail.source + res.apiKey);
        } catch (e) {}
      });
    } catch (e) {}
  });

  const getUri = value => {
    const { nativeEvent } = value;
    getToken(nativeEvent.url);
  };

  const apiCalling = model => {
    props
      .requestSetAngel(brokerDetail.setTokenUrl, model)
      .then(() => {
        onPressBack();
      })
      .catch(() => {
        alert(strLocale('server.Something went wrong Please try again'));
        onPressBack();
      });
  };

  const getToken = urlData => {
    try {
      if (urlData.includes(brokerDetail.callbackUrl)) {
        switch (brokerDetail.brokerName) {
          case 'Angel Broking':
            setIsLoading(true);
            let firstDivide = urlData.split('?');

            if (firstDivide.length !== 0) {
              let secondDivide = firstDivide[1].split('&');
              let authToken = secondDivide[0].split('=');
              let feedToken = secondDivide[1].split('=');

              const model = {
                feedToken: feedToken[1],
                authToken: authToken[1],
              };

              apiCalling(model);
            }
            break;
          case 'Zerodha':
            setIsLoading(true);
            let firstDivide2 = urlData.split('?');

            if (firstDivide2.length !== 0) {
              let secondDivide = firstDivide2[1].split('&');
              for (let i = 0; i < secondDivide.length; i++) {
                if (secondDivide[i].includes('request_token')) {
                  let authToken = secondDivide[i].split('=');
                  const model = {
                    requestToken: authToken[1],
                  };

                  apiCalling(model);
                  break;
                }
              }
            }
            break;
          default:
            break;
        }
        if (urlData.includes('auth_token')) {
          setIsLoading(true);
          let firstDivide = urlData.split('?');

          if (firstDivide.length !== 0) {
            let secondDivide = firstDivide[1].split('&');
            let authToken = secondDivide[0].split('=');
            let feedToken = secondDivide[1].split('=');

            const model = {
              feedToken: feedToken[1],
              authToken: authToken[1],
            };

            props
              .requestSetAngel(brokerDetail.setTokenUrl, model)
              .then(() => {
                onPressBack();
              })
              .catch(() => {
                alert(
                  strLocale('server.Something went wrong Please try again'),
                );
                onPressBack();
              });
          }
        }
      }
    } catch (e) {}
  };

  const onPressBack = () => {
    if (!isBack) {
      isBack = true;
      navigation.goBack();
    }
  };

  return (
    <View style={container}>
      <NavBar
        backScreenName={strLocale(
          `profile.CONNECT ACCOUNT TO ${brokerDetail.brokerName.toUpperCase()}`,
        )}
        onPressBack={onPressBack}
      />
      {isLoading || angelWebURL === '' ? (
        <View style={loadingContainer}>
          <ActivityIndicator
            testID={'activity'}
            size="large"
            color={constant.codeIndicatorColor}
          />
        </View>
      ) : (
        <WebView
          testID={'WebView'}
          source={{
            uri: angelWebURL,
          }}
          onLoadEnd={getUri}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F4FB',
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    isLoading: state.account.isLoading,
  };
};

export default connect(mapStateToProps, {
  getBrokerAngelLogin,
  requestSetAngel,
})(BrokerScreen);
