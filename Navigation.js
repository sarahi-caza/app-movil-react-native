import React from "react";

import {createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator } from "@react-navigation/native-stack"; 
import HomeScreen from "./src/screens/NavigationScreen/HomeScreen";
import MapScreen from "./src/screens/NavigationScreen/MapScreen";
import ProfileScreen from "./src/screens/NavigationScreen/ProfileScreen";
import ListaStackScreen from "./src/screens/NavigationScreen/ListaStackScreen";
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
const MyTabs = () => {
    return(
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor:'#00b8d4',
            }}
        >
            <Tab.Screen 
                name="Inicio"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ({}) => (
                        <Ionicons name="home" size={24} color="#00b8d4" />
                    ),
                }} 
            />
            <Tab.Screen
                name="Map"
                component={MyStack}
                options={{
                    tabBarLabel: 'Mapa',
                    tabBarIcon: ({}) => (
                    <Ionicons name="map-sharp" size={24} color="#00b8d4" />
                ),
                headerShown:false,
                }}
            />
            <Tab.Screen 
                name="Perfil"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({}) => (
                        <Ionicons name="person-circle" size={24} color="#00b8d4" />
                ),
                }}
            />
            
        </Tab.Navigator>
    )
}

const MapStackNavigator = createNativeStackNavigator();
const MyStack = () => {
    return(
        <MapStackNavigator.Navigator
            initialRouteName="Mapa Ruta"
        >
            <MapStackNavigator.Screen
                name="Mapa Ruta"
                component={MapScreen}
            />
            <MapStackNavigator.Screen
                name="Lista"
                component={ListaStackScreen}
            />
        </MapStackNavigator.Navigator>
    )
}

export default function Navigation() {
    return(
            <MyTabs />   
    )
}