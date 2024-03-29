import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions, ScrollView} from "react-native";
import Logo from "../../../assets/images/logoAW.png";
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
const { width, height} = Dimensions.get('window')
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from '@react-navigation/native'; 
import {useForm, Controller} from 'react-hook-form';
import callApi from "../../lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = () => {
    
  const navigation = useNavigation();
  
  const {control, handleSubmit} = useForm();
  

    const API_EMAIL = 'admin@admin.com'
    const API_PWD = 'admin123'
    const API_NAME = 'admin'
        
    const onSignInPressed = async data => {
      console.log(data);
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
      let body = JSON.stringify({
        email: API_EMAIL,
        password: API_PWD,
        name: API_NAME
      })
      //obtener TOKEN
      const respToken = await callApi('/api/login', headers, body)
      if(respToken.status == 'success'){
        const token = 'Bearer ' + respToken.token
        await AsyncStorage.setItem('token', token);
        headers.Authorization = token
        body = JSON.stringify({
          cedula: data.username,
          clave: data.password
        })
        const respLogin = await callApi('/api/apiLogin', headers, body)
        if(respLogin.status == 'success'){
          const user = respLogin
          delete user.message
          delete user.status
          await AsyncStorage.setItem('user', JSON.stringify(user));
          if(respLogin.actualizarClave){
            navigation.navigate("UpdatePassword")
          } else {
            if(respLogin.actualizarUbicacion){
              navigation.navigate("LocationScreen")
            } else {
              navigation.navigate("NavigationStack")
            }
            
          }
        }else{
          console.log(respLogin.message)
        }
      }
    }
  
    
    const onForgotPassword = () => {
      navigation.navigate("ForgotPassword")
    }

    const SvgTop = () => {
        return (
          <Svg
          width={500}
          height={324}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M297.871 315.826c73.405 13.896 165.338-13.964 202.129-29.63V230H1.326v63.5c69.15-42.913 204.789 4.957 296.545 22.326z"
            fill="url(#prefix__paint0_linear_103:6)"
            fillOpacity={0.5}
          />
          <Path
            d="M237.716 308.627C110.226 338.066 30.987 318.618 0 304.77V0h500v304.77c-43.161-12.266-134.794-25.581-262.284 3.857z"
            fill="url(#prefix__paint1_linear_103:6)"
          />
          <Defs>
            <LinearGradient
              id="prefix__paint0_linear_103:6"
              x1={492.715}
              y1={231.205}
              x2={480.057}
              y2={364.215}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#78EDF0" />
              <Stop offset={1} stopColor="#0288A2" />
            </LinearGradient>
            <LinearGradient
              id="prefix__paint1_linear_103:6"
              x1={7.304}
              y1={4.155}
              x2={144.016}
              y2={422.041}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#78EDF0" />
              <Stop offset={1} stopColor="#0288A2" />
            </LinearGradient>
          </Defs>
        </Svg>
        )
      }
    

    return(
      
      <ScrollView style={styles.scrollContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.containerSVG}>
          <Image 
            source={Logo} 
            style={styles.logo} 
            resizeMode="contain" 
          />
          <SvgTop/>
          </View>
            <Text style={styles.titulo}>Iniciar Sesión</Text>
            <CustomInput
              name='username'
              placeholder='Ingrese Usuario (Cédula)'
              keyboardType='numeric'
              maxLength= {10}
              control={control}
            />
            <CustomInput
              name='password'
              placeholder='Ingrese Contraseña'
              secureTextEntry={true}
              control={control}
              
            /> 
            <CustomButton text="Iniciar Sesión" onPress={handleSubmit(onSignInPressed)}/>
            <CustomButton text="¿Olvidó su Contraseña?" onPress={onForgotPassword} type="TERTIARY" />
      </View>
      </ScrollView >
      
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        height:'100%',
        backgroundColor: '#f1f1f1',
        flex: 1,
        alignItems: 'center',
    },
    scrollContainer:{
      height:'100%',
      backgroundColor: '#f1f1f1',
      flex: 1,
    },
    logo:{
        marginTop:40,
        width:'65%',
        height: '60%',
        position: 'absolute',
        zIndex:10,
    },
    containerSVG: {
        width: width,
        maxWidth:300,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    titulo:{
       fontSize:30,
       fontWeight: 'bold',
       position: 'absolute',
       marginTop:235,
       color:'#CCC',
        
    },
  
  });
export default SignInScreen;