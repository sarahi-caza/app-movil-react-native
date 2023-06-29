import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
const { width, height} = Dimensions.get('window')
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useNavigation } from '@react-navigation/native'; 
import {useForm, Controller} from 'react-hook-form';
import callApi from "../../lib/api";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ForgotPasswordScreen = () => {
    const {control, handleSubmit} = useForm();
    const navigation = useNavigation();

    const onSendPress = async data => {
        console.log(data);
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
        const body = JSON.stringify({
            cedula: data.username,
        })
        const respClave = await callApi('/api/olvidoClave', headers, body)
        if(respClave.status == 'success'){
            console.log(respClave.clave)
            navigation.navigate("SignIn")
        } else{
            console.log(respClave.message)
        }
    }

    return(
        <ScrollView style={styles.scrollContainer}>
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Recuperación de Contraseña</Text>
            <CustomInput
              name='username'
              placeholder='Ingrese Usuario (Cédula)'
              keyboardType='numeric'
              maxLength= {10}
              control={control}
            />
            <CustomButton 
                text="Enviar" 
                onPress={handleSubmit(onSendPress)} />
            
        </View>
      </ScrollView>
        )
        
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent:'center',
        height: height,
        alignItems: 'center',
    },
    scrollContainer:{
        height: height,
        backgroundColor: '#f1f1f1',
    },
    title:{
        fontSize:20,
    },
});
export default ForgotPasswordScreen;