import React from 'react';
import {ReactElement} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

export default ({children}: {children: ReactElement}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
