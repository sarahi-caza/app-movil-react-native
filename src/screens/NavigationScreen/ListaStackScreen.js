import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, FlatList} from"react-native";
import callApi from "../../lib/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListaScreen = () => {
    const [data, setData] = useState("");

    useEffect(()=>{

      const getData = async () => {
    
        const token = await AsyncStorage.getItem('token');
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const diasArray = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado']
        const fechaActual = new Date()
        const diaActual = fechaActual.getDay()
        const dia = diasArray[diaActual]  
        const horario = JSON.parse(await AsyncStorage.getItem('horario'));
        const turno = horario[dia].substring(0,1).toUpperCase()
            
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token
        }
        const body = JSON.stringify({
          id_usuario: user.id_usuario,
          dia: dia,
          turno: turno,
        })
        const respLista = await callApi('/api/listaRecorrido', headers, body)
          if(respLista.status == 'success'){
          console.log (respLista)
          const textComponent = respLista.lista_empleados.map((emp, index ) => <Text key={index} style={styles.lista}>{emp}</Text>)
          respLista.lista_empleados=textComponent
          setData(respLista)
          }
      }
      getData();
  }, [])

    return(
        <View style={styles.background}>
            <Text style={styles.text}> Ruta: {data.nombre_ruta}</Text>
            <Text style={styles.text}> Chofer: {data.nombre_chofer}</Text>
            <Text style={styles.textLista}> Lista</Text>
            <View>
                {data.lista_empleados}
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    background:{
        height:'100%',
        backgroundColor: '#D9F4F8',
    },
    text:{
        textAlign: 'left',
        fontSize: 20,
        color: '#091585',
        padding: 5,
        },
    textLista:{
        paddingBottom:20,
        textAlign: 'center',
        paddingTop: 25,
        fontSize: 25,
        color: '#091585',
    },
    lista:{
        marginLeft:10,
        paddingTop:7,
        fontSize: 20,
        color: '#091585',

    },

})

export default ListaScreen;