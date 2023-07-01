import React, { useEffect, useState } from 'react';
import {View, StyleSheet} from"react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/native'; 
import MapView ,{Marker} from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LocationScreen = () => {

    const navigation = useNavigation();
    const [data, setData] = useState({});
    const [pin, setPin] = useState({
        latitude: -0.17885,
        longitude: -78.4782,
    });
    
    useEffect(()=>{ 

    const getData = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        setData(user)
        //console.log('userMapa>>',user)
    }
      getData();
  }, [])

    useEffect(() => {
        console.log(pin, new Date())
    },[pin])

        /*user.actualizarUbicacion = false
        //seteat ubicacion (lat y lon)
        await AsyncStorage.setItem('user', JSON.stringify(user));
        */
    return(
        <View style={styles.background}>
            <View style={styles.button}>
            
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: pin.latitude,
                        longitude: pin.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                        zoom:47
                    }}>
                    <Marker
                        draggable
                        coordinate={pin}
                        onDragEnd={e => {
                        setPin(e.nativeEvent.coordinate);
                        }} />
                </MapView>
                <CustomButton 
                    onPress={() => navigation.navigate("MapScreen")}
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
        //marginBottom:10,
        //height:'80%',
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