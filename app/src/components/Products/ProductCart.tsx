import React from 'react';
import {Fragment} from 'react';
import {
  Dimensions,
  FlatList,
  ImageRequireSource,
  StyleSheet,
  Image,
} from 'react-native';
import {Box, Text} from '../theme';
import ProductHeader from './ProductHeader';
import Button from '../../Utils/Button';
import {moderateScale} from 'react-native-size-matters';
import {TouchableWithoutFeedback} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProductRoutes} from './index';
import {useDispatch, useSelector} from 'react-redux';
import {productCheckOut} from '../../store/actions/productActions';
import {BorderlessButton} from 'react-native-gesture-handler';
const {height} = Dimensions.get('window');

interface CartItemProps {
  title: string;
  imageUrl: ImageRequireSource;
  price: string;
  _id: string;
}

const CartItem = ({title, imageUrl, price, _id}: CartItemProps) => {
  const {navigate} = useNavigation();

  const onPress = () => {
    navigate('ProductDetails', {
      _id,
    });
  };

  return (
    <TouchableWithoutFeedback {...{onPress}}>
      <Box
        alignItems="center"
        height={116}
        marginBottom="m"
        borderRadius={'s'}
        borderWidth={StyleSheet.hairlineWidth}
        flexDirection="row"
        padding="s">
        <Box
          height={moderateScale(84)}
          width={moderateScale(84)}
          overflow="hidden"
          justifyContent="center"
          padding="m"
          alignItems="center">
          <Image
            source={{
              uri: `${imageUrl}`,
            }}
            resizeMode="contain"
            style={{
              ...StyleSheet.absoluteFillObject,
            }}
          />
        </Box>

        <Box width={moderateScale(84)} marginLeft="m">
          <Text variant="title" fontSize={15} color="primary">
            {title}
          </Text>

          <Text variant="smtitle" marginTop="s" color="primary">
            ₦{price}
          </Text>
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  );
};

interface ProductCartProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ProductRoutes, 'ProductCart'>,
    StackNavigationProp<ProductRoutes, 'ProductDetails'>
  >;
}

function ProductCart({navigation}: ProductCartProps) {
  const {cartProducts, products} = useSelector((state: any) => state.product);
  const dispatch = useDispatch();

  const onCheckOut = () => {
    dispatch(productCheckOut());
    navigation.replace('ProductCheckOut');
  };

  const allCartProducts = cartProducts.filter((p: any) => p.cart === true);

  const prices = allCartProducts.map((p: any) => parseInt(p.price));
  const totalPrice = prices.reduce(
    (prev: number, cur: number) => (prev += cur),
    0,
  );

  return (
    <Box flex={1} backgroundColor="white">
      <Box height={height * 0.82} paddingHorizontal="l">
        <ProductHeader back={true} />
        {allCartProducts.length > 0 ? (
          <>
            <Box
              marginTop="m"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center">
              <Text variant="title" color="primary" fontSize={23}>
                Amazon Cart
              </Text>
              <Text variant="title" color="primary" fontSize={23}>
                Total ₦{totalPrice}
              </Text>
            </Box>
            <Box marginTop="m" padding="m">
              <FlatList
                contentContainerStyle={{
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
                showsVerticalScrollIndicator={false}
                data={allCartProducts}
                numColumns={1}
                renderItem={({item: {title, imageUrl, price, _id}}: any) => {
                  return (
                    <Fragment key={_id}>
                      <CartItem {...{title, imageUrl, price, _id}} />
                    </Fragment>
                  );
                }}
                keyExtractor={({title}) => title}
              />
            </Box>
          </>
        ) : (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text variant="title" color="danger" marginBottom="m">
              Cart Empty
            </Text>
            <BorderlessButton onPress={() => navigation.pop()}>
              <Text variant="smtitle" color="primary">
                Start Shopping
              </Text>
            </BorderlessButton>
          </Box>
        )}
      </Box>
      {allCartProducts.length > 0 ? (
        <Box
          flex={1}
          backgroundColor="white"
          justifyContent="center"
          alignItems="center">
          <Button label="Check Out" variant="primary" onPress={onCheckOut} />
        </Box>
      ) : null}
    </Box>
  );
}

export default ProductCart;
