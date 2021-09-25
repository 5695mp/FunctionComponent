import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import fonts, { sizes } from '../../../../helper/fonts';
import constant from '../../../../helper/constant';
import { strLocale } from 'locale';

const MobileNumber = props => {
  const {
    phoneNumberContainer,
    fullContainer,
    buttonChange,
    phoneNumber,
    changeButton,
  } = styles;
  return (
    <View style={[phoneNumberContainer, props.mainContain || {}]}>
      <Text
        style={phoneNumber}
        numberOfLines={1}
        minimumFontScale={0.3}
        adjustsFontSizeToFit={true}>
        {props.phoneNumber}
      </Text>
      <View style={fullContainer} />
      <TouchableOpacity onPress={props.onPressPhoneNumber} style={buttonChange}>
        <Text style={changeButton}>{props.buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  phoneNumberContainer: {
    backgroundColor: '#FBFBFB',
    paddingHorizontal: 17,
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonChange: {
    marginRight: 5,
  },
  phoneNumber: {
    fontSize: sizes.h7,
    color: '#8A8A8A',
    fontFamily: fonts.fontRubikRegular,
    lineHeight: 37,
    maxWidth: constant.screenWidth - 160,
  },
  changeButton: {
    fontSize: sizes.h12,
    color: '#2D8EE7',
  },
});
export default MobileNumber;
