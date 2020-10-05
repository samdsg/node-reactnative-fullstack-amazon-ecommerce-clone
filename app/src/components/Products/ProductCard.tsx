import React from 'react';
import {Image, Dimensions, StyleSheet} from 'react-native';
import {Box} from '../theme';
import {ProductCard as ProductCardImg} from '../../images';
import TouchableScale from 'react-native-touchable-scale';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

function ProductCard() {
  const {navigate} = useNavigation();

  const onAdd = () => {
    navigate('AddProduct');
  };

  return (
    <TouchableScale
      activeScale={0.9}
      tension={50}
      friction={7}
      useNativeDriver
      onPress={onAdd}>
      <Box
        width={width * 0.85}
        backgroundColor="primary"
        alignItems="baseline"
        alignSelf="center"
        overflow="hidden"
        height={163}
        style={{marginTop: 20, borderRadius: 20}}>
        <Image
          source={ProductCardImg}
          style={{flex: 1, ...StyleSheet.absoluteFillObject}}
        />
      </Box>
    </TouchableScale>
  );
}

export default ProductCard;
