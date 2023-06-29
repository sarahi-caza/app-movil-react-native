import { SafeAreaView, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import SignInScreen from './src/screens/SignInScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import UpdatePasswordScreen from './src/screens/UpdatePasswordScreen';
import Navigation from './Navigation';
import {NavigationContainer } from '@react-navigation/native'; 
import {createNativeStackNavigator } from "@react-navigation/native-stack"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const StackNavigator = createNativeStackNavigator();
const pages = {
    SignIn: 'SignIn',
    NavigationStack: 'NavigationStack',
    ForgotPassword: 'ForgotPassword',
    UpdatePassword: 'UpdatePassword',
}

const App = () => {
    const [page, setPage] = useState(pages.SignIn)
    useEffect(() => {
        getUser()
    },[])
    const getUser = async () => {
        const temp = await AsyncStorage.getItem('user')
        if(temp){
            const user = JSON.parse(temp)
            if(user.actualizarClave){
                setPage(pages.UpdatePassword)
            }else{
                setPage(pages.NavigationStack)
            }
        }
    }
    return(
      <NavigationContainer>
        <StackNavigator.Navigator
          screenOptions={{headerShown:false}}
          initialRouteName={page}
        >
            <StackNavigator.Screen
                name= {pages.SignIn}
                component={SignInScreen}
            />
            <StackNavigator.Screen
                name={pages.NavigationStack}
                component={Navigation}
            />
            <StackNavigator.Screen
                name={pages.ForgotPassword}
                component={ForgotPasswordScreen}
            />
            <StackNavigator.Screen
                name={pages.UpdatePassword}
                component={UpdatePasswordScreen}
            />
        </StackNavigator.Navigator>
        </NavigationContainer>
    )
}
export default App;
