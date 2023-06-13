import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
const { width, height} = Dimensions.get('window')
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomImput from "../../components/CustomInput/CustomInput";
import { useNavigation } from '@react-navigation/native'; 

const ForgotPasswordScreen = () => {
    const [username, setUsername] = useState('');
    const navigation = useNavigation();

    const onSendPress = () => {
        navigation.navigate("SignIn")
    }

    return(
        <ScrollView style={styles.scrollContainer}>
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Recuperación de Contraseña</Text>
            <CustomImput
              placeholder='Ingrese Usuario (Cédula)'
              value={username}
              setValue={setUsername}
              keyboardType='numeric'
              maxLength= {10}
            />
            <CustomButton 
                text="Enviar" 
                onPress={onSendPress} />
            
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
export default ForgotPasswordScreen;