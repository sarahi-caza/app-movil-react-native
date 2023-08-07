import React from "react";
import { StyleSheet, Text, View, Pressable} from 'react-native';

const CustomButton = ({onPress, text, type = 'PRIMARY'}) => {
    return(
        <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container:{
        width: '80%',
        padding:10,
        marginVertical: 25,
        alignItems: 'center',
        borderRadius: 5
    },
    container_PRIMARY:{
        backgroundColor: '#00b8d4',
        
    },
    container_TERTIARY:{  
        marginVertical: 10,
      },
    text:{
        fontSize:18,
        fontWeight:'bold',
        color: 'white'
    },
    text_TERTIARY:{
        fontSize:15,
        color: 'gray'
    },

});

export default CustomButton;