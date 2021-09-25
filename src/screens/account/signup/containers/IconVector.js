import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const IconVector = props => {
  const { container, mainCircle, subCircle, imageContainer, imageSize } =
    styles;

  return (
    <View style={container}>
      <View style={[mainCircle, props.mainCicle || {}]} />
      <View style={[subCircle, props.subCicle || {}]} />
      <View style={imageContainer}>
        <Image
          source={{ uri: props.image || 'icon_vector' }}
          resizeMode={'contain'}
          style={imageSize}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainCircle: {
    width: 108,
    height: 108,
    backgroundColor: '#E7582D',
    opacity: 0.2,
    borderRadius: 50,
  },
  subCircle: {
    position: 'absolute',
    top: 10,
    backgroundColor: '#E7582D',
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  imageContainer: {
    position: 'absolute',
    width: 108,
    height: 108,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSize: {
    width: 30,
    height: 30,
  },
});

export default IconVector;
