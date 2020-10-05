import React from 'react';
import {StyleSheet} from 'react-native';
import {Image} from 'react-native';
import Button from '../../Utils/Button';
import FormTextInput from '../../Utils/FormTextInput';
import {Box} from '../theme';
import {allItems, ItemsProps} from './ItemList';
import ProductHeader from './ProductHeader';

export const ItemImage = ({src, name, price}: ItemsProps) => {
  return (
    <Box
      width={157}
      height={150}
      backgroundColor="white"
      borderWidth={StyleSheet.hairlineWidth}
      marginTop="m"
      borderRadius="m"
      padding={'m'}
      justifyContent="flex-start"
      margin="s">
      <Box
        height={100}
        overflow="hidden"
        alignItems="center"
        justifyContent="center"
        padding="s">
        <Image source={src} resizeMode="contain" height={50} />
      </Box>
    </Box>
  );
};

function AddProduct() {
  return (
    <Box flex={1} backgroundColor="white">
      <Box flexDirection="column" alignItems="center" backgroundColor="white">
        <ProductHeader back={false} />
      </Box>
      <Box flex={1} padding="xl" alignItems="center">
        <FormTextInput
          placeholder="Item Title"
          defaultValue="Item name value"
        />
        <FormTextInput
          placeholder="Item Price"
          keyboardType="number-pad"
          defaultValue="Item price value"
        />
        <FormTextInput
          placeholder="Item Description"
          numberOfLines={7}
          defaultValue="Item description value"
        />

        <ItemImage name={allItems[0].name} src={allItems[0].src} price="400" />

        <Box>
          <Button label="Edit Item" variant="primary" style={{marginTop: 20}} />
        </Box>
      </Box>
    </Box>
  );
}
export default AddProduct;
