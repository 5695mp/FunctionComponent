import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import constant from '../../helper/constant';
import { connect } from 'react-redux';
import fonts, { sizes } from '../../helper/fonts';

const AppTab = props => {
  const { titleText, container, imageIcon } = styles;

  return (
    <View style={container}>
      <Image
        source={{ uri: constant.tabIcon[props.tabName] }}
        style={[
          imageIcon,
          {
            marginLeft: props.marginLeft,
            opacity: (props.focused && 1.0) || 0.6,
            tintColor:
              (props.focused && constant.tabSelected) || constant.tabUnSelected,
          },
        ]}
        resizeMode={'contain'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 0,
  },
  titleText: {
    fontSize: sizes.h13,
    color: '#FFFFFF',
    fontFamily: fonts.fontRubikMedium,
    lineHeight: 18,
    marginTop: 7,
    textAlign: 'center',
    marginBottom: 0,
  },
  imageIcon: {
    height: 24,
    width: 28,
    alignSelf: 'center',
  },
});

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(AppTab);
