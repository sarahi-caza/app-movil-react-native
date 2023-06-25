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
       <View>
            <Text style={styles.title}> Dator Personales</Text>
            <Text style={styles.text}> Nombre: {data.nombre} {data.apellido}</Text>
            <Text style={styles.text}> Celular: {data.celular}</Text>
            {data.rol == 'empleado' && <Text style={styles.text}> Area: {data.area}</Text>}
            <View style={styles.mainContainer}><CustomButton text="Cerrar Sesión" onPress={logOut}/></View>
        </View>
    
    
    )
    
   
}
    
const styles = StyleSheet.create({
    title:{
        textAlign: 'center',
        fontSize: 30,
        marginTop:30,
        marginBottom:20,
        
    },
    text:{
        textAlign: 'left',
        fontSize: 17,
        color: '#091585',
        padding: 20,
        },
    mainContainer: {
            padding:100,
            alignItems: 'center',
        },
    button:{
        alignItems:'center',
    },

})

export default ProfileScreen;