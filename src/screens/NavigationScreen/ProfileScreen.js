import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet} from"react-native";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 


const ProfileScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState({});

    useEffect(()=>{

    const getData = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        setData(user)
    }
      getData();
  }, [])

  const logOut = async () => {
    navigation.navigate("SignIn")
    await AsyncStorage.multiRemove(['token','user','horario'])
  }
    return(
       <View style={styles.background}>
            <Text style={styles.title}> Datos Personales</Text>
            <Text style={styles.text}> Nombre: {data.nombre} {data.apellido}</Text>
            <Text style={styles.text}> Celular: {data.celular}</Text>
            {data.rol == 'empleado' && <Text style={styles.text}> Area: {data.area}</Text>}
            <View style={styles.button}><CustomButton text="Cerrar Sesión" onPress={logOut}/></View>
        </View>
    
    
    )
}
    
const styles = StyleSheet.create({
    background:{
        height:'100%',
        backgroundColor: '#D9F4F8',
    },
    title:{
        textAlign: 'center',
        fontSize: 30,
        marginTop:30,
        marginBottom:30,
        
    },
    text:{
        textAlign: 'left',
        fontSize: 17,
        color: '#091585',
        padding: 20,
        },
    button:{
        alignItems:'center',
        marginTop:135,
    },

})

export default ProfileScreen;