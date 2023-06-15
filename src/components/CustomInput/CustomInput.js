import React, {useState} from "react";
import {View, Text, TextInput, StyleSheet} from "react-native"
import {Controller} from 'react-hook-form'

const CustomInput = ({control, name, placeholder, secureTextEntry, keyboardType, maxLength}) => {
    return(
        <View style={styles.inputContainer}>
            <Controller
                control={control}
                name={name}
                render = {({field:{value, onChange, onBlur}}) => (
                    <TextInput
                    value = {value}
                    onChangeText = {onChange}
                    onBlur = {onBlur}
                    placeholder = {placeholder}
                    style = {styles.input}
                    secureTextEntry = {secureTextEntry}
                    keyboardType = {keyboardType} 
                    maxLength={maxLength}
                />
                )}
                
            />
        </View>
    )
}
const styles = StyleSheet.create({
    inputContainer:{
        width:'85%',
        height: 42,
        paddingStart:30,
        borderRadius:15,
        padding:10,
        marginTop:30,
        backgroundColor:'#fff'
    },
    input :{},
});

export default CustomInput;