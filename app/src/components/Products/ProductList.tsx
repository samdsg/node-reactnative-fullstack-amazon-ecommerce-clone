import React from 'react';
import {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {Box} from '../theme';
import {useDispatch, useSelector} from 'react-redux';

/* Components */
import ListContainer from './ListContainer';
import Loader from './Loader';
import ProductCard from './ProductCard';
import ProductHeader from './ProductHeader';
import ProductSearch from './ProductSearch';
import {loadProducts} from '../../store/actions/productActions';
import {useNavigation} from '@react-navigation/native';

/* Utils */
const {width, height} = Dimensions.get('window');

function ProductList() {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();

  const product = useSelector((state: any) => state.product);
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(loadProducts());

    if (!auth.isAuthenticated) {
      navigate('Auth');
    }
  }, []);

  return (
    <Box flex={1}>
      {!product.loading ? (
        <>
          <Box
            height={height * 0.45}
            flexDirection="column"
            alignItems="center"
            backgroundColor="white">
            <ProductHeader back={false} />
            <ProductSearch />
            <ProductCard />
          </Box>
          <ListContainer />
        </>
      ) : (
        <Loader />
      )}
    </Box>
  );
}

export default ProductList;
