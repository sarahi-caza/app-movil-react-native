import { SafeAreaView, StyleSheet, Text } from 'react-native';
import React from 'react';
import SignInScreen from './src/screens/SignInScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import UpdatePasswordScreen from './src/screens/UpdatePasswordScreen';
import Navigation from './Navigation';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation/>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});

export default App;
