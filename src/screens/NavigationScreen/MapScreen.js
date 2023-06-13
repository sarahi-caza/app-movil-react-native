import React from "react";
import {Text, View, StyleSheet} from"react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/native'; 

const MapScreen = () => {

    const navigation = useNavigation();

    return(
        <View>
            <Text style={styles.text}>Map</Text>
            <CustomButton 
                onPress={() => navigation.navigate("ListaStackScreen")}
                text="Lista" />
      
        </View>
    )

}

const styles = StyleSheet.create({

})

export default MapScreen;