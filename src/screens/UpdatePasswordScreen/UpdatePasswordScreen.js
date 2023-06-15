import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
const { width, height} = Dimensions.get('window')
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useNavigation } from '@react-navigation/native'; 
import {useForm, Controller} from 'react-hook-form';



const UpdatePasswordScreen = () => {
    
    const {control, handleSubmit} = useForm();
    const navigation = useNavigation();
       
    const onUpdatePasswordPress = () => {
        navigation.navigate("NavigationStack")
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
            <CustomButton text="Actualizar" onPress={onUpdatePasswordPress}/>
            
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