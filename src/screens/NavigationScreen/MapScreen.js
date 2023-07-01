import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import {Text, View, StyleSheet} from"react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/native'; 
import MapView ,{Marker} from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MapScreen = () => {

    const navigation = useNavigation();
    const [data, setData] = useState({});
    const [origen, setOrigen]= useState({
        latitude: null,
        longitude: null,
    })
    
    useEffect(()=>{

    const getData = async () => {
        const ubicacionActual = JSON.parse(await AsyncStorage.getItem('ubicacionActual'));
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        setData(user)
        if(user.ubicacion?.latitud){
            setOrigen({
                latitude: user.ubicacion.latitud,
                longitude: user.ubicacion.longitud,
            })
        } else if(ubicacionActual?.latitude) {
            setOrigen(ubicacionActual)
        } else {
            setOrigen({
                latitude: -0.17885,
                longitude: -78.4782,
            })
        }
        //getPermisoUbicacion()
        console.log('userMapa>>',user)
    }
      getData();
  }, [])

  const getPermisoUbicacion = async() =>{
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
        console.log (status)
        alert('Permiso denegado')
        return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const ubicacionActual = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
    }
    setOrigen(ubicacionActual)
  }
    return(
        <View style={styles.background}>
            <View style={styles.button}>
                <CustomButton 
                onPress={() => navigation.navigate("ListaStackScreen")}
                text="Lista Recorrido" />
                {origen.latitude && <MapView
                style={styles.map}
                initialRegion={{
                    latitude: origen.latitude,
                    longitude: origen.longitude,
                    latitudeDelta: 0.0100,
                    longitudeDelta: 0.0100,
                    //zoom:7,
                }}>
                <Marker
                    coordinate={origen}
                    pinColor='#00b8d4'
                    //draggable  
                />
                </MapView>}
  
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    background:{
        height:'100%',
        backgroundColor: '#D9F4F8',
    },
    button:{
        alignItems:'center',
    },
    map:{
        width:'100%',
        maxHeight:'100%',
        minHeight:'84%',
    },
})

export default MapScreen;