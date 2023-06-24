import { SafeAreaView, StyleSheet, Text } from 'react-native';
import React from 'react';
import SignInScreen from './src/screens/SignInScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import UpdatePasswordScreen from './src/screens/UpdatePasswordScreen';
import Navigation from './Navigation';
import {NavigationContainer } from '@react-navigation/native'; 
import {createNativeStackNavigator } from "@react-navigation/native-stack"; 

const StackNavigator = createNativeStackNavigator();
const App = () => {
    return(
      <NavigationContainer>
  
        <StackNavigator.Navigator
          screenOptions={{headerShown:false}}
          initialRouteName="SignIn"
        >
            <StackNavigator.Screen
                name="SignIn"
                component={SignInScreen}
            />
            <StackNavigator.Screen
                name="NavigationStack"
                component={Navigation}
            />
            <StackNavigator.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
            />
            <StackNavigator.Screen
                name="UpdatePassword"
                component={UpdatePasswordScreen}
            />
        </StackNavigator.Navigator>
        </NavigationContainer>
    )
}
export default App;
