import React, {useEffect, useState} from 'react';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Dimensions} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {AuthRoutes} from '.';
import Button from '../../Utils/Button';
import FormTextInput from '../../Utils/FormTextInput';
import {Box, Text} from '../theme';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../../store/actions/authActions';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../Products/Loader';
import KeyBoardDismiss from '../../Utils/KeyBoardDismiss';

const {height, width} = Dimensions.get('window');

interface LoginProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthRoutes, 'Login'>,
    StackNavigationProp<AuthRoutes, 'Register'>
  >;
}

function Login({navigation}: LoginProps) {
  const dispatch = useDispatch();
  const {navigate: nNavigate} = useNavigation();

  /* Selectors */
  const error = useSelector((state: any) => state.error);
  const auth = useSelector((state: any) => state.auth);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onRegister = () => {
    navigation.navigate('Register');
  };

  const onLogin = () => {
    dispatch(login({email, password}));
  };

  const setToken = async (token: string) => {
    if (token) {
      try {
        await AsyncStorage.removeItem('@user_token');
        await AsyncStorage.setItem('@user_token', token);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    const {isAuthenticated, token} = auth;
    setToken(token);
    if (isAuthenticated) {
      nNavigate('Product');
    }
  }, [auth]);

  return (
    <KeyBoardDismiss>
      <Box
        flex={1}
        backgroundColor="primary"
        padding="xl"
        justifyContent="center"
        alignItems="center">
        <Box
          height={height * 0.6}
          width={width * 0.9}
          borderRadius="l"
          backgroundColor="white"
          padding="l"
          alignItems="center">
          <Text variant="title" color="primary" marginBottom="l">
            LOGIN
          </Text>

          {error.id === 'LOGIN_FAIL' ? (
            <>
              {error.msg.msg ? (
                <Text
                  variant="smtitle"
                  color="danger"
                  textTransform="uppercase"
                  fontSize={12}
                  marginBottom="m">
                  {error.msg.msg}
                </Text>
              ) : null}
            </>
          ) : null}

          <FormTextInput
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
          />

          <FormTextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={(password) => setPassword(password)}
            onSubmitEditing={() => onLogin()}
          />

          <Button label="Login" variant="primary" onPress={onLogin} />

          <BorderlessButton style={{marginTop: 30}} onPress={onRegister}>
            <Text variant="smtitle" color="primary">
              Register
            </Text>
          </BorderlessButton>
        </Box>

        {auth.logLoading ? <Loader /> : null}
      </Box>
    </KeyBoardDismiss>
  );
}

export default Login;
