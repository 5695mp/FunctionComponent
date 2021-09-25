import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import fonts, { sizes } from '../../../../helper/fonts';
import constant from '../../../../helper/constant';

const TitleHeader = props => {
  const {
    container,
    subContainer,
    textTitle,
    descriptionText,
    headerText,
    progressContainer,
    progressLineContainer,
    leftRadius,
    rightRadius,
    progressSpace,
  } = styles;

  const [arr, setArr] = useState([]);

  useEffect(() => {
    let arrTemp = [];
    for (let i = 0; i < props.noOfSlider; i++) {
      arrTemp.push(i);
    }
    setArr(arrTemp);
  }, []);

  return (
    <View style={[container, props.mainContain || {}]}>
      {props.title && (
        <View style={subContainer}>
          <Text style={[headerText]}>{props.title}</Text>
          {props.description && !props.isHideDetail && (
            <Text style={textTitle}>{'/'}</Text>
          )}
          {!props.isHideDetail && (
            <Text style={descriptionText}>{props.description}</Text>
          )}
        </View>
      )}
      {props.noOfSlider && !props.isHideDetail && (
        <View style={progressContainer}>
          {arr.map(i => {
            return (
              <View
                style={[
                  progressLineContainer,
                  {
                    opacity: (props.selectedSlider - 1 < i && 0.3) || 1.0,
                  },
                  (i !== 0 && progressSpace) || leftRadius,
                  (i === arr.length - 1 && rightRadius) || {},
                ]}
                key={i}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: sizes.h6,
    fontFamily: fonts.fontRubikMedium,
    color: '#59595C',
  },
  textTitle: {
    fontSize: sizes.h11,
    marginHorizontal: 4,
    color: '#B1B1B6',
  },
  descriptionText: {
    fontSize: sizes.h11,
    fontFamily: fonts.fontRubikMedium,
    color: '#2D8EE7',
    marginTop: 2,
  },
  progressContainer: {
    width: '100%',
    marginTop: 13,
    height: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLineContainer: {
    flex: 1,
    backgroundColor: constant.textHeaderColor,
  },
  leftRadius: {
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2,
  },
  rightRadius: {
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  progressSpace: {
    marginLeft: 2,
  },
});

export default TitleHeader;
