import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';

const CompletedStar = props => {
  const { container, imageContainer, image } = styles;

  const [arr, setArr] = useState([]);

  useEffect(() => {
    let arrTemp = [];
    for (let i = 0; i < props.noOfImage; i++) {
      arrTemp.push(i);
    }
    setArr(arrTemp);
  }, []);

  let imageSpace = props.imageSpace || 14;

  return (
    <View style={[container, props.mainContain || {}]}>
      {props.noOfImage && (
        <View style={imageContainer}>
          {arr.map(i => {
            return (
              <View
                style={{ marginLeft: (i !== 0 && imageSpace) || 0 }}
                key={i}>
                {(props.selectedImage - 1 < i && (
                  <View>
                    <Image
                      resizeMode="contain"
                      source={{ uri: 'star' }}
                      style={[image, props.imageSize || {}]}
                    />
                  </View>
                )) || (
                  <View>
                    <Image
                      resizeMode="contain"
                      source={{ uri: 'starful' }}
                      style={[image, props.imageSize || {}]}
                    />
                  </View>
                )}
              </View>
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
    backgroundColor: '#FBFBFB',
    paddingVertical: 8,
    paddingHorizontal: 21,
    borderRadius: 25,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  imageSpace: {
    marginLeft: 0,
  },
  image: {
    height: 33,
    width: 33,
  },
});

export default CompletedStar;
