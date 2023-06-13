import React from "react";

import {createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import HomeScreen from "./src/screens/NavigationScreen/HomeScreen";
import MapScreen from "./src/screens/NavigationScreen/MapScreen";
import ChatScreen from "./src/screens/NavigationScreen/ChatScreen";
import ListaStackScreen from "./src/screens/NavigationScreen/ListaStackScreen";
import { Ionicons } from '@expo/vector-icons';


const MapStackNavigator = createNativeStackNavigator();
const MyStack = () => {
    return(
        <MapStackNavigator.Navigator
            initialRouteName="MapStack"
        >
            <MapStackNavigator.Screen
                name="MapStack"
                component={MapScreen}
            />
            <MapStackNavigator.Screen
                name="ListaStackScreen"
                component={ListaStackScreen}
            />
        </MapStackNavigator.Navigator>
    )
}

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
                name="Home"
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
                name="Chat"
                component={ChatScreen}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({}) => (
                        <Ionicons name="chatbubble-ellipses" size={24} color="#00b8d4" />
                ),
                }}
            />
            
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return(
        <NavigationContainer>
            <MyTabs />   
        </NavigationContainer>
    )
}