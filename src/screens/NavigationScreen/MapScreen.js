import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet} from"react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/native'; 
import MapView ,{Marker} from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MapScreen = () => {

    const navigation = useNavigation();
    const [data, setData] = useState({});

    useEffect(()=>{

    const getData = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        setData(user)
        console.log('userMapa>>',user)
    }
      getData();
  }, [])

    return(
        <View style={styles.background}>
            <View style={styles.button}>
                <CustomButton 
                onPress={() => navigation.navigate("ListaStackScreen")}
                text="Lista Recorrido" />
                <MapView
                style={styles.map}
                initialRegion={{
                    latitude: data?.ubicacion?.latitud ? data.ubicacion.latitud : '-0.17885',
                    longitude: data?.ubicacion?.longitud ? data.ubicacion.longitud : '-78.4782',
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    zoom:47
                }}>
                <Marker
                    coordinate={{
                        latitude: data?.ubicacion?.latitud ? data.ubicacion.latitud : '-0.17885',
                        longitude: data?.ubicacion?.longitud ? data.ubicacion.longitud : '-78.4782',
                    }}
                    pinColor='#00b8d4'
                    
                />
                </MapView>
  
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
        //marginTop:400,
        alignItems:'center',
    },
    map:{
        width:'100%',
        height:'85%',

    },
})

export default MapScreen;