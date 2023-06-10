import React, {useState} from "react";
import {View, Text, TextInput, StyleSheet} from "react-native"

const CustomImput = ({value, setValue, placeholder, secureTextEntry, keyboardType, maxLength}) => {
    return(
        <View style={styles.inputContainer}>
            <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={styles.input}
            secureTextEntry={secureTextEntry}
            keyboardType = {keyboardType} 
            maxLength={maxLength}
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
});

export default CustomImput;