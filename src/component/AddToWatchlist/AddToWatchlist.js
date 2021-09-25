import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import constant from '../../helper/constant';
import fonts from '../../helper/fonts';
import Animated, { Easing } from 'react-native-reanimated';
import { strLocale } from 'locale';
import { connect } from 'react-redux';
import TextInputCustom from '../../component/TextInputCustom/TextInputCustom';
import { filterGroup } from '../../modules/home/validator';
import { setLoader } from '../../modules/account/actions';
import PickerAlert from '../Picker/Picker';
import { addPortfolioToWatchlistAction } from '../../modules/watchlist/actions';
import { updateWatchlistData } from '../../modules/home/actions';
import { UserEvent } from '../../helper/fabricHelper/track';

const CustomAlert = props => {
  const [name, setName] = useState({
    value: props.title || '',
    error: '',
    focus: false,
  });
  const [pickerShow, setPickerShow] = useState(false);

  const { textValue, listDropdown } = props;
  //
  const {
    container,
    btnContainer,
    btnText,
    btnTextLeft,
    btnContainerLeft,
    btnContainerRight,
    titleText,
    buttonContainer,
    cancelButton,
    cancel,
  } = styles;

  const onPickerSelect = (name, index) => {
    props.onDropDown(index - 1);
  };

  const onPressPickers = () => {
    setPickerShow(true);
    setTimeout(() => {
      setPickerShow(false);
    }, 100);
    UserEvent.userTrackScreen('portfolio_watch_selectwatchlist');
  };

  const renderBottomSection = () => {
    return (
      <View style={buttonContainer}>
        <TouchableOpacity
          style={[btnContainer, btnContainerLeft]}
          onPress={() => props.onAlertClick()}>
          <Text style={[btnTextLeft]}>{strLocale('Cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID={'portfolio.save'}
          style={[btnContainer, btnContainerRight]}
          onPress={() => props.onAlertClick('save')}>
          {(props.isLoading && <ActivityIndicator color={'#FFF'} />) || (
            <Text style={btnText}>
              {(props.portFolioId === '' && strLocale('Add')) ||
                strLocale('Save')}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[container]}>
      <Text style={titleText}>
        {strLocale('home.Add portfolio to watchlist')}
      </Text>
      <TouchableOpacity
        testID={'Add portfolio to watchlist'}
        onPress={onPressPickers}>
        <View style={{ position: 'absolute', bottom: 30, right: 150 }}>
          <PickerAlert
            key={101}
            pickerShow={pickerShow}
            data={listDropdown}
            onPickerSelect={onPickerSelect}
          />
        </View>
        <TextInputCustom
          title={strLocale('home.WATCHLIST')}
          // placeHolder={textValue}
          titleStyle={{ marginTop: 32 }}
          validation={{ value: textValue, error: '' }}
          disable={false}
          setValue={(text, isCheck = false) => {
            setName({ value: text, error: '' });
          }}
        />
      </TouchableOpacity>
      {renderBottomSection()}
      <TouchableOpacity
        onPress={() => props.onAlertClick()}
        style={cancelButton}>
        <Image resizeMode="contain" style={cancel} source={{ uri: 'cancel' }} />
      </TouchableOpacity>
    </View>
  );
};

const AddToWatchList = props => {
  const { data } = props;

  const [fadeAnim] = useState(new Animated.Value(0));
  const [filter, setFilter] = useState(
    (props.data && props.data.type) || filterGroup(),
  );
  const [isError, setIsError] = useState(false);
  const [isPublic] = useState((data && data.isPublic) || false);
  const [title] = useState((data && data.title) || '');
  const [selectedValue, setSelectedValue] = useState(0);
  const [listDropdown, setListDropdown] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        duration: 200,
        toValue: 1,
        easing: Easing.out(Easing.linear),
      }).start();
    }, 5);

    let output = [];
    props.watchlist.forEach(({ name, input }) => {
      output.push(name);
    });
    setListDropdown(output);
  }, []);

  const onDropDown = value => {
    setSelectedValue(value);
  };

  const onAlertClick = (title, typeSelected = false) => {
    if (title === 'save') {
      props.setLoader(true);
      props
        .addPortfolioToWatchlistAction(
          props.watchlist[selectedValue].id,
          data.id,
          true,
        )
        .then(res => {
          UserEvent.userTrackScreen('portfolio_watch_add');
          props.setLoader(false);
          updateData();
          hideAlert(title, typeSelected, data.id);
          try {
            props.onToWatchList();
          } catch (e) {}
        })
        .catch(err => {
          props.setLoader(false);
        });
    } else {
      UserEvent.userTrackScreen('portfolio_watch_cancel');
      hideAlert(title, typeSelected);
    }
  };

  const updateData = () => {
    props.updateWatchlistData(data.id, props.watchlist[selectedValue].id);
  };

  const hideAlert = (title, typeSelected, value) => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        easing: Easing.out(Easing.linear),
      }).start(() => {
        props.onAlertClick(value);
      });
    }, 50);
  };

  const onCreatePortfolio = value => {};

  const onUpdateIsError = () => {
    setIsError(false);
  };

  return (
    <Animated.View
      style={[
        styles.alertOuter,
        { opacity: fadeAnim },
        !!constant.isiPAD && { alignItems: 'center' },
      ]}>
      <CustomAlert
        data={props.filter}
        onAlertClick={onAlertClick}
        inputAlertData={props.inputAlertData}
        isInputAlert={props.isInputAlert}
        manageRenameInputValue={props.manageRenameInputValue}
        dataPortfolio={filter}
        onCreatePortfolio={onCreatePortfolio}
        isError={isError}
        updateIsError={onUpdateIsError}
        isLoading={props.isLoading}
        title={title}
        isPublic={isPublic}
        portFolioId={(data && data.id) || ''}
        textValue={
          (props.watchlist !== 0 && props.watchlist[selectedValue].name) ||
          'Default'
        }
        listDropdown={listDropdown}
        onDropDown={onDropDown}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    paddingTop: 31,
    paddingBottom: 25,
    paddingHorizontal: 23,
  },
  alertOuter: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    paddingHorizontal: 11,
    backgroundColor: 'rgba(5,34,61,0.4)',
    justifyContent: 'center',
    zIndex: 111111,
    elevation: 3,
  },
  titleText: {
    fontFamily: fonts.fontRubikRegular,
    fontSize: 23,
    color: constant.appGrayColor,
    marginRight: 33,
  },
  btnContainer: {
    height: 56,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: constant.appBlueColor,
  },
  btnContainerLeft: {
    backgroundColor: '#FFFFFF',
    marginRight: 5,
  },
  btnContainerRight: {
    marginLeft: 5,
  },
  btnTextLeft: {
    color: constant.appBlueColor,
    fontFamily: fonts.fontViga,
    fontSize: 16,
  },
  btnText: {
    color: '#fff',
    fontFamily: fonts.fontViga,
    fontSize: 16,
  },
  isIpad: {
    maxWidth: 400,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 52,
  },
  cancelButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 21,
    height: 21,
  },
  cancel: {
    width: 21,
    height: 21,
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
    isLoading: state.account.isLoading,
    watchlist: state.watchlist.watchlists,
  };
};

export default connect(mapStateToProps, {
  setLoader,
  addPortfolioToWatchlistAction,
  updateWatchlistData,
})(AddToWatchList);
