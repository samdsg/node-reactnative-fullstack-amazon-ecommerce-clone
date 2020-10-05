import React from 'react';
import {StyleSheet} from 'react-native';
import {Spinner} from 'native-base';
import theme, {Box, Text} from '../theme';

export default function Loader() {
  return (
    <Box
      backgroundColor="primary"
      justifyContent="center"
      alignItems="center"
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      <Spinner color={theme.colors.white} />
      {/* <Text variant="title">Loading...</Text> */}
    </Box>
  );
}
