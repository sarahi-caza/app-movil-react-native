import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";

import HomeScreen from "./src/screens/NavigationScreen/HomeScreen";
import MapScreen from "./src/screens/NavigationScreen/MapScreen";
import ChatScreen from "./src/screens/NavigationScreen/ChatScreen";
//import ListaScreen from "./src/screens/NavigationScreen/ListaStackScreem";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            
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