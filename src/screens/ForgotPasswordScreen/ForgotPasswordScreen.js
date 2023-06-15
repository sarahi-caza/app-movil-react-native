import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
const { width, height} = Dimensions.get('window')
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useNavigation } from '@react-navigation/native'; 
import {useForm, Controller} from 'react-hook-form';


const ForgotPasswordScreen = () => {
    const {control, handleSubmit} = useForm();
    const navigation = useNavigation();

    const onSendPress = () => {
        navigation.navigate("SignIn")
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
                onPress={onSendPress} />
            
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