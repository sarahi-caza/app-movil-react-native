import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet} from"react-native";
import CustomButton from "../../components/CustomButton";
import callApi from "../../lib/api";

const ProfileScreen = () => {

    const [data, setData] = useState("");

    useEffect(()=>{

      const getData = async () => {
    
        TOKEN = '648b32db84633961ac012414|1I6ht482IlLU47XEZDHfK58th1tPgc0DXHgDpLcw';
        CEDULA = '1712345679';
        CLAVE = 'xm1c6f';
    
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + TOKEN
        }
        const body = JSON.stringify({
          cedula: CEDULA,
          clave: CLAVE,
        })
        const respPerfil = await callApi('/api/apiLogin', headers, body)
          if(respPerfil.status == 'success'){
          console.log (respPerfil)
          setData(respPerfil)
          }
      }
      getData();
  }, [data])

    return(
       <View >
            <Text style={styles.title}> Dator Personales</Text>
            <Text style={styles.text}> Nombre: {data.nombre} {data.apellido}</Text>
            <Text style={styles.text}> Celular: {data.celular}</Text>
            <Text style={styles.text}> Area: {data.area}</Text>
            <View style={styles.mainContainer}><CustomButton text="Cerrar Sesión" /></View>
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