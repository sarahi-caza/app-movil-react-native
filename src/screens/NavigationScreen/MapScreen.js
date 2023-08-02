import React, { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import {Text, View, StyleSheet} from"react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/native'; 
import MapView ,{Marker} from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapViewDirections from 'react-native-maps-directions';
import callApi from '../../lib/api';
import rutaOptimaAlgoritmo from '../../lib/rutaOptimaAlgoritmo';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { notificaciones } from '../../hooks/notificaciones';
import apiNotificacion from '../../lib/apiNotificacion';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

const MapScreen = () => {

    const navigation = useNavigation();
    const [data, setData] = useState({});
    const [lista, setLista] = useState({});
    const [origen, setOrigen]= useState({
        latitude: null,
        longitude: null,
    })
    const [turnoGlobal, setTurnoGlobal] = useState(null);
    
    const destino = {latitude: -0.1267707974354061, longitude: -78.35948547634963};
    const GOOGLE_MAPS_APIKEY = 'AIzaSyDRZpcY9MU5c1atDcgLv4Cyur78hT71YMI';
    const [puntosCasas, setPuntosCasas] = useState ([])

    const [primeraVez,setPrimeraVez] = useState(true)
    const [nodos, setNodos] = useState ({})
    const [puntosRecorrido, setPuntosRecorrido] = useState ([]) 
    const [enLinea, setEnLinea]= useState({
        latitude: null,
        longitude: null,
    })
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const {crearNotificacion, obtenerTokenCelular}=notificaciones();
    const [horarioDefinido, setHorarioDefinido] = useState(null); 
    const diasArray = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado']
    const [idEmpleado, setIdEmpleado] = useState (null);
        
    useEffect(() => {
    const getData = async () => {
        const token = await AsyncStorage.getItem('token');
        const fechaActual = new Date()
        const diaActual = fechaActual.getDay()
        const dia = diasArray[diaActual]  
        const turno = horarioDefinido[dia].substring(0,1).toUpperCase()
        setTurnoGlobal(turno)
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token
        }
        const body = JSON.stringify({
          id_usuario: data.rol == 'empleado' ? data.id_usuario : idEmpleado,
          dia: dia,
          turno: turno,
        })
        console.log('BODy:::', body, data.id_usuario, idEmpleado)
        const respLista = await callApi('/api/listaRecorrido', headers, body)
        if(respLista.status == 'success'){
            setLista(respLista)
            const temp = []
            if(data.rol == 'chofer'){
                let location = await Location.getCurrentPositionAsync({});
                const ubicacionActual = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }
                temp.push(ubicacionActual)
                setOrigen(ubicacionActual)
                            
            }else{
                let ubicacionChofer = {
                    latitude: respLista.ubicacionChofer.latitud,
                    longitude: respLista.ubicacionChofer.longitud,
                }
                temp.push(ubicacionChofer)
                setOrigen(ubicacionChofer)
            }
            
            for(const emp of respLista.lista_empleados){
                if(!!emp.ubicacion && emp.ubicacion.latitud && !!emp.ubicacion.longitud){
                    let ubicacion = {
                        latitude: emp.ubicacion?.latitud,
                        longitude: emp.ubicacion?.longitud,
                    }
                    temp.push(ubicacion)
                }
                
            } 
            temp.push(destino)
            if(temp.length > 2){
                setPuntosCasas(temp)
            }
        }
    }
    if(origen.latitude && primeraVez && horarioDefinido){
        setPrimeraVez(false);
        getData();
    } 

    if(horarioDefinido){
        setTimeout(() => {
            getData();
        },5000)
    }
    console.log('TIEMPO REAL origen',origen, primeraVez, horarioDefinido)

  }, [origen, horarioDefinido, idEmpleado])

useEffect(() => {
    //grafo de los puntos disponibles sin pesos 
    if(puntosCasas.length > 0){
        let nodos = {}
        for(let i = 0; i < puntosCasas.length-1; i++){
            nodos[i == 0 ? 'start' : i] = {}
            for(let j = 1; j < puntosCasas.length; j++){
                if(i!=j && !(i==0 && j==puntosCasas.length-1)){
                    nodos[i == 0 ? 'start' : i][j == puntosCasas.length-1 ? 'finish' : j ] = {
                        distancia: null,
                        tiempo: null,
                        origen: puntosCasas[i],
                        destino: puntosCasas[j],
                    }

                }
            }
        }
        nodos.finish={}
        if(Object.keys(nodos).length>3){
            setNodos(nodos)
        }
        //console.log('NODOS=======>',nodos)
    }
},[puntosCasas]) 



    useEffect(() => {
        if(!origen.latitude){
            userData()
        }
    },[])
    const userData = async () => {
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
                latitude: -0.179502,
                longitude: -78.481451,
            })
        }
        console.log('userMapa>>',user)

    }
    const getUbicacionReal = async() =>{
        let location = await Location.getCurrentPositionAsync({});
        const ubicacionActual = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        }
        setEnLinea(ubicacionActual)
        await actualizarTiempoReal(ubicacionActual)
    }
    const actualizarTiempoReal = async(ubicacionActual) =>{
        const token = await AsyncStorage.getItem('token');
        const headers1 = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token
        }
        const body1 = JSON.stringify({
            id_usuario: data.id_usuario,
            latitud: ubicacionActual.latitude,
            longitud: ubicacionActual.longitude,
        })
        console.log('body2==>>', body1)
        await callApi('/api/actualizarTiempoReal', headers1, body1)
    }
    useEffect(() => {
        if(data?.rol=='chofer'){
            getUbicacionReal()
    /*        if(!enLinea.latitude){
                getUbicacionReal()
            }else{
                setTimeout(() => {
                    getUbicacionReal()
                },5000)
            }*/
        }
        console.log('TIEMPO REAL',enLinea)
    }, [origen])

    //notificaciones
    
    /*useEffect(() => {
        if(expoPushToken){
            const body= [
                {
                    to: expoPushToken,
                    title:"Notificacion AirWay",
                    body:"Estoy",
                    sound:"default"
                }
            ]
            nuevaNotificacion(body)  
        }            
    }, [expoPushToken])
    const nuevaNotificacion = async (body) => {
        await crearNotificacion(body)
    }*/

    const obtenerHorario = async () => {
        
        if(data.rol=='empleado'){
            const horario = await AsyncStorage.getItem('horario');
            console.log('HORA:::', horario)
            if(horario){
                setHorarioDefinido(JSON.parse(horario))
            }
        }
    }
    useEffect(()=> {
        obtenerHorario()
    }, [data])
    const seleccionarHorario = async (turno) =>{
        const fechaActual = new Date()
        const diaActual = fechaActual.getDay()
        const dia = diasArray[diaActual]
        const horario = {}
        horario[dia]=turno
        const respListaChofer = await AsyncStorage.getItem('respListaChofer');
        if(respListaChofer){
            const respuesta = JSON.parse(respListaChofer)
            //console.log('respuesta', respuesta.lista_matutina, respuesta.lista_nocturna, turno )
            if(turno=='M' && respuesta.lista_matutina?.length>0){
                setIdEmpleado(respuesta.lista_matutina[0])
                setHorarioDefinido(horario)
            }else if(turno=='N' && respuesta.lista_nocturna?.length>0){
                setIdEmpleado(respuesta.lista_nocturna[0])
                setHorarioDefinido(horario)
            }else{
                alert('NO HAY ??????')
            }
            
        }
    }

    return(
        <View style={styles.background}>
            {turnoGlobal != 'L' && 
            <View style={styles.button}>
                {data?.rol=='empleado' && 
                <CustomButton 
                    onPress={() => navigation.navigate("Lista")}
                    text="Lista Recorrido" />}
                {data?.rol=='chofer' &&
                <View style={styles.buttonDN}>
                <CustomButton 
                    onPress={() => seleccionarHorario('M')}
                    text="Día" />
                <CustomButton 
                    onPress={() => seleccionarHorario('N')}
                    text="Noche" />
                </View>}
                {origen.latitude && <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: origen.latitude,
                        longitude: origen.longitude,
                        latitudeDelta: 0.1090,
                        longitudeDelta: 0.1090,
                    }}>
                    <Marker
                        coordinate={origen}
                        pinColor='#00b8d4'
                    />
                {puntosRecorrido.length>0 && puntosRecorrido.map ((x,index) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={x}
                            pinColor='#00000'
                        />
                    )
                })}
                    <Marker
                        coordinate={destino}
                        pinColor='black'
                    />
                    {enLinea.latitude && 
                        <Marker
                            coordinate={enLinea}
                            pinColor='orange'
                        />
                    }
                    
                    {puntosRecorrido.length>0 &&<MapViewDirections
                        apikey={GOOGLE_MAPS_APIKEY}
                        origin={origen}
                        destination={destino}
                        waypoints={puntosRecorrido}
                        optimizeWaypoints = {true}
                        strokeColor='blue'
                        strokeWidth={3}
                        onReady={result =>{
                            console.log('distancia:', result.distance)
                            console.log('tiempo:', result.duration)
                        }}
                    />}


                </MapView>}
                
                {Object.keys(nodos).length>0 && Object.keys(nodos).map((clave, i) => {
                    return (
                        <View key={i}>
                          {Object.keys(nodos[clave]).length>0 && Object.keys(nodos[clave]).map( (valores, j) =>{
                            if(nodos[clave][valores].destino){
                                return( 
                                    <MapViewDirections key={j}
                                        apikey={GOOGLE_MAPS_APIKEY}
                                        origin={nodos[clave][valores].origen}
                                        destination={nodos[clave][valores].destino}
                                        onReady={result =>{
                                            console.log('distancia:==>', result.distance)
                                            console.log('tiempo::==>', result.duration)
                                            nodos[clave][valores].distancia=result.distance
                                            nodos[clave][valores].tiempo=result.duration
                                            if(i== Object.keys(nodos).length-2 && j== Object.keys(nodos[clave]).length-1){
                                                setPuntosRecorrido(rutaOptimaAlgoritmo(nodos))
                                            }
                                        }}
                                    />
                                )
                            }else {
                                return ''
                            }
                          })}  
                        </View>
                    )
                })
                 }
            </View>}
            {turnoGlobal == 'L' && 
            <View style={{...styles.button, marginTop: 250 }}>
                <Text style={{fontSize: 50}}>Día Libre</Text>
            </View>}
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
    /*buttonDN:{
        width:'25%',
        alignItems: 'left',
    
        

    },*/
    map:{
        width:'100%',
        maxHeight:'100%',
        minHeight:'84%',
    },
})

export default MapScreen;