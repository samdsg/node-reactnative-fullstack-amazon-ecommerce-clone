import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Button from '../../Utils/Button';
import FormTextInput from '../../Utils/FormTextInput';
import {Box, Text} from '../theme';
import ProductHeader from './ProductHeader';
import {useEffect} from 'react';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProductRoutes} from './index';
import KeyBoardDismiss from '../../Utils/KeyBoardDismiss';
import {addProduct} from '../../store/actions/productActions';
import Loader from './Loader';

const {width} = Dimensions.get('window');

interface AddProductProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ProductRoutes, 'AddProduct'>,
    StackNavigationProp<ProductRoutes, 'ProductDetails'>
  >;
}

function AddProduct({navigation}: AddProductProps) {
  const defaultImgUri = 'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'.toLowerCase();
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [imageUrl, setImage] = useState<string>(defaultImgUri);
  const [desc, setDesc] = useState<string>('');

  /* Selectors */
  const auth = useSelector((state: any) => state.auth);
  const product = useSelector((state: any) => state.product);
  const error = useSelector((state: any) => state.error);

  const onPostProduct = () => {
    dispatch(addProduct({title, price, imageUrl, desc}));
    navigation.navigate('ProductList');
  };

  useEffect(() => {
    const {isAuthenticated} = auth;
    if (!isAuthenticated) {
      navigation.replace('Auth');
    }
  }, [auth]);

  return (
    <KeyBoardDismiss>
      <Box flex={1} backgroundColor="white">
        <Box flexDirection="column" alignItems="center" backgroundColor="white">
          <ProductHeader back={false} />
        </Box>

        {!product.sending ? (
          <Box flex={1} padding="xl" alignItems="center">
            {error.id === 'PRODUCT_POST_FAIL' ? (
              <Text
                variant="smtitle"
                color="primary"
                textAlign="center"
                marginBottom="l">
                {error.msg.msg}
              </Text>
            ) : null}

            <FormTextInput
              placeholder="Item Title"
              onChangeText={(title) => setTitle(title)}
            />

            <FormTextInput
              placeholder="Item Price"
              keyboardType="number-pad"
              onChangeText={(price) => setPrice(price)}
            />

            <FormTextInput
              placeholder="Item Image"
              defaultValue={imageUrl}
              onChangeText={(image) => setImage(image)}
            />

            <FormTextInput
              placeholder="Item Description"
              numberOfLines={7}
              onChangeText={(desc) => setDesc(desc)}
              onSubmitEditing={onPostProduct}
            />

            <Box>
              <Button
                label="Add Item"
                variant="primary"
                style={{marginTop: 20}}
                onPress={onPostProduct}
              />
            </Box>
          </Box>
        ) : (
          <Loader />
        )}
      </Box>
    </KeyBoardDismiss>
  );
}
export default AddProduct;
