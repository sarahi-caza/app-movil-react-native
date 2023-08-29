import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
const { width, height} = Dimensions.get('window')
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useNavigation } from '@react-navigation/native'; 
import {useForm, Controller} from 'react-hook-form';
import callApi from "../../lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdatePasswordScreen = () => {
    
    const {control, handleSubmit} = useForm();
    const navigation = useNavigation();
       
    const onUpdatePasswordPress = async data => {
        console.log(data);
        if(data.password == data.repeatPassword){
            const token = await AsyncStorage.getItem('token');
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const tokenCelular = await AsyncStorage.getItem('tokenCelular');
                
            const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token
            }
            const body = JSON.stringify({
            id_usuario: user.id_usuario,
            rol: user.rol,
            newPwd: data.password,
            tokenCelular: tokenCelular
            })
            const respClave = await callApi('/api/actualizarPwd', headers, body)
            if(respClave.status == 'success'){
                user.actualizarClave = false
                await AsyncStorage.setItem('user', JSON.stringify(user));
                if(user.actualizarUbicacion){
                    navigation.navigate("LocationScreen")
                } else {
                    navigation.navigate("NavigationStack")
                }
            }
        } else{
            console.log('Contraseñas son diferentes')
        }
            
    }

    return(
        <ScrollView style={styles.scrollContainer}>
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Actualización de Contraseña</Text>
            <CustomInput
              name='password'
              placeholder='Ingrese Contraseña'
              secureTextEntry={true}
              control={control}
            />
            <CustomInput
              name='repeatPassword'
              placeholder='Ingresa Contraseña Nuevamente'
              secureTextEntry={true}
              control={control}
            />
            <CustomButton text="Actualizar" onPress={handleSubmit(onUpdatePasswordPress)}/>
            
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
export default UpdatePasswordScreen;