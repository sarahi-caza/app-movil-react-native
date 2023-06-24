import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, FlatList} from"react-native";
import callApi from "../../lib/api";

const ListaScreen = () => {
    const [data, setData] = useState("");

    useEffect(()=>{

      const getData = async () => {
    
        TOKEN = '648b32db84633961ac012414|1I6ht482IlLU47XEZDHfK58th1tPgc0DXHgDpLcw';
        ID_USUARIO = '646911b6565f1a01700ddc45';
        DIA= 'martes';
        TURNO= 'N';
    
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + TOKEN
        }
        const body = JSON.stringify({
          id_usuario: ID_USUARIO,
          dia: DIA,
          turno: TURNO,
        })
        const respLista = await callApi('/api/listaRecorrido', headers, body)
          if(respLista.status == 'success'){
          console.log (respLista)
          const textComponent = respLista.lista_empleados.map(emp => <Text>{emp}</Text>)
          respLista.lista_empleados=textComponent
          setData(respLista)
          }
      }
      getData();
  }, [data])

    return(
        <View>
            <Text style={styles.text}> Ruta: {data.nombre_ruta}</Text>
            <Text style={styles.text}> Chofer: {data.nombre_chofer}</Text>
            <Text style={styles.textLista}> Lista</Text>
            <View style={styles.lista}>
                {data.lista_empleados}
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    text:{
        textAlign: 'left',
        fontSize: 20,
        color: '#091585',
        padding: 4,
        },
    textLista:{
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 25,
        color: '#091585',
    },
    lista:{
        alignItems: 'left',
        margin:9,
        paddingTop: 7,
    },

})

export default ListaScreen;