import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
const { width, height} = Dimensions.get('window')
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomImput from "../../components/CustomInput/CustomInput";

const UpdatePasswordScreen = () => {
    const [password, setPassword] = useState('');
       
    const onUpdatePasswordPress = () => {
        console.warn("Contraseña Actualizada")
    }

    return(
        <ScrollView style={styles.scrollContainer}>
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Actualización de Contraseña</Text>
            <CustomImput
              placeholder='Ingresa Contraseña'
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
            />
            <CustomImput
              placeholder='Ingresa Contraseña Nuevamente'
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
            />
            <CustomButton text="Actualizar" onPress={onUpdatePasswordPress}/>
            
        </View>
      </ScrollView>
        )
        
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent:'center',
        height: height,
        alignItems: 'center',
    },
    scrollContainer:{
        height: height,
        backgroundColor: '#f1f1f1',
    },
    title:{
        fontSize:20,
    },
});
export default UpdatePasswordScreen;