import React, { useEffect, useState } from 'react';
import {Switch, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import callApi from "../../lib/api";

const HomeScreen = () => {

  const [data, setData] = useState("");

    useEffect(()=>{

      const getData = async () => {
    
        TOKEN = '648b32db84633961ac012414|1I6ht482IlLU47XEZDHfK58th1tPgc0DXHgDpLcw';
        ID_USUARIO = '64691085565f1a01700ddc44';
        AREA = 'TWR';
    
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + TOKEN
        }
        const body = JSON.stringify({
          id_usuario: ID_USUARIO,
          area: AREA
        })
        const respHorario = await callApi('/api/getHorario', headers, body)
          if(respHorario.status == 'success'){
          //console.log (respHorario)
          setData(respHorario)
          }
      }
      getData();
  }, [data])
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle} >Hola.... este es tu horario semanal</Text>
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
