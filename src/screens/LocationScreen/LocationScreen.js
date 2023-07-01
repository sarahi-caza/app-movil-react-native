import React, { useEffect, useState } from 'react';
import {View, StyleSheet} from"react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/native'; 
import MapView ,{Marker} from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import callApi from '../../lib/api';

const LocationScreen = () => {

    const navigation = useNavigation();
    const [data, setData] = useState({});
    const [pin, setPin] = useState({
        latitude: null,
        longitude: null,
    });
    
    useEffect(()=>{ 

    const getData = async () => {
        const ubicacionActual = JSON.parse(await AsyncStorage.getItem('ubicacionActual'));
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        setData(user)
        //console.log('userMapa>>',user)
        if(user.ubicacion?.latitud){
            setPin({
                latitude: user.ubicacion.latitud,
                longitude: user.ubicacion.longitud,
            })
        } else if(ubicacionActual?.latitude) {
            setPin(ubicacionActual)
        } else {
            setPin({
                latitude: -0.17885,
                longitude: -78.4782,
            })
        }        
    }
      getData();
  }, [])

    useEffect(() => {
        console.log(pin, new Date())
    },[pin])

    const saveLocation = async() => {
        
        const token = await AsyncStorage.getItem('token');
        const user = JSON.parse(await AsyncStorage.getItem('user'));

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token
            }
            const body = JSON.stringify({
            id_usuario: user.id_usuario,
            rol: user.rol,
            latitud: pin.latitude,
            longitud: pin.longitude,
            }) 
            console.log('ubicacion')
            const respUbicacion = await callApi('/api/ubicacionCasa', headers, body)
            console.log(respUbicacion)
            if(respUbicacion.status == 'success'){
                user.actualizarUbicacion = false
                await AsyncStorage.setItem('user', JSON.stringify(user));
                navigation.navigate("NavigationStack")
            }
    }
       
    return(
        <View style={styles.background}>
            <View style={styles.button}>
            {pin.latitude &&
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: pin.latitude,
                        longitude: pin.longitude,
                        latitudeDelta: 0.0100,
                        longitudeDelta: 0.0100,
                    }}>
                    <Marker
                        draggable
                        coordinate={pin}
                        onDragEnd={e => {
                        setPin(e.nativeEvent.coordinate);
                        }} />
                </MapView>}
                <CustomButton 
                    onPress={() => saveLocation()}
                    text="Enviar Ubición Mi Casa" />
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
        marginTop: 30,
        maxHeight:'100%',
        minHeight:'80%',
    },
})

export default LocationScreen;