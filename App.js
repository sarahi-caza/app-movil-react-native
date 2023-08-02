import { SafeAreaView, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import SignInScreen from './src/screens/SignInScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import UpdatePasswordScreen from './src/screens/UpdatePasswordScreen';
import Navigation from './Navigation';
import {NavigationContainer } from '@react-navigation/native'; 
import {createNativeStackNavigator } from "@react-navigation/native-stack"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationScreen from './src/screens/LocationScreen/LocationScreen';
import { notificaciones } from './src/hooks/notificaciones';


const StackNavigator = createNativeStackNavigator();
const pages = {
    SignIn: 'SignIn',
    NavigationStack: 'NavigationStack',
    ForgotPassword: 'ForgotPassword',
    UpdatePassword: 'UpdatePassword',
    Location: 'LocationScreen',
}

const App = () => {
    const [page, setPage] = useState(pages.SignIn)
    const {obtenerTokenCelular}=notificaciones();
    
    useEffect(() => {
        getPermisoUbicacion()
        getUser()
        tokenCelular()
    },[])
    //notificaciones
    const tokenCelular = () => {
        obtenerTokenCelular().then(async (token) => await AsyncStorage.setItem('tokenCelular', token));
    }

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
    const getPermisoUbicacion = async() =>{
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted') {
            console.log (status)
            alert('Permiso denegado')
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const ubicacionActual = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        }
        await AsyncStorage.setItem('ubicacionActual', JSON.stringify(ubicacionActual))
        //setOrigen(ubicacionActual)
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
            <StackNavigator.Screen
                name={pages.Location}
                component={LocationScreen}
            />
        </StackNavigator.Navigator>
        </NavigationContainer>
    )
}
export default App;
