import React, { useEffect, useState } from 'react';
import {Switch, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import callApi from "../../lib/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

  const [data, setData] = useState("");
  const [usuario, setUsuario] = useState({});

    useEffect(()=>{

      const getData = async () => {
    
        const token = await AsyncStorage.getItem('token');
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        setUsuario(user)
            
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token
        }
        const body = JSON.stringify({
          id_usuario: user.id_usuario,
          area: user.area,
        })
        const respHorario = await callApi('/api/getHorario', headers, body)
        
        console.log('horario',respHorario)
        if(respHorario.status == 'success'){
          setData(respHorario)
          await AsyncStorage.setItem('horario', JSON.stringify(respHorario));
        }
      }
      getData();
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle} >Hola {usuario?.nombre} {usuario?.apellido}, tu horario semanal</Text>
      <ScrollView>
        <Collapse>
          <CollapseHeader>
            <View>
              <Text style={styles.headerText}>Lunes</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text style={styles.active}> {data.lunes} </Text>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseHeader>
            <View>
              <Text style={styles.headerText}>Martes</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text style={styles.active}> {data.martes} </Text>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseHeader>
            <View>
              <Text style={styles.headerText}>Miercoles</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text style={styles.active}> {data.miercoles} </Text>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseHeader>
            <View>
              <Text style={styles.headerText}>Jueves</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text style={styles.active}> {data.jueves} </Text>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseHeader>
            <View>
              <Text style={styles.headerText}>Viernes</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text style={styles.active}> {data.viernes} </Text>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseHeader>
            <View>
              <Text style={styles.headerText}>Sábado</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text style={styles.active}> {data.sabado} </Text>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseHeader>
            <View>
              <Text style={styles.headerText}>Domingo</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text style={styles.active}> {data.domingo} </Text>
          </CollapseBody>
        </Collapse>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    backgroundColor: '#8AD2DD',
    },
   subtitle: {
    marginTop: 12,
    marginBottom: 12,
    fontSize: 19,
    color: '#091585',
    },
  headerText: {
    textAlign: 'center',
    fontSize: 25,
    color: '#091585',
    padding: 12,
  },
  active: {
    padding: 9,
    fontSize: 18,
    backgroundColor: '#B6F2FB',
    textAlign: 'center',
  },
 
});
export default HomeScreen; 
