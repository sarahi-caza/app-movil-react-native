import React, {useEffect, useState} from "react";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from "react-native";
import apiNotificacion from "../lib/apiNotificacion";

export const notificaciones = () =>{

    const crearNotificacion = async(body) => {
        await apiNotificacion(body)
        console.log('BODY====>', body)
    }
      
    const obtenerTokenCelular = async() => {
        let token = null
      
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log('TOKEN ========> ',token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        return token;
      }
    return {
        crearNotificacion, obtenrTokenCelular: obtenerTokenCelular
    }
}