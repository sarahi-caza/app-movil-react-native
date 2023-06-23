import React, { Component, useEffect, useState } from 'react';
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
      <ScrollView>
        <Collapse>
          <CollapseHeader>
            <View>
              <Text>Lunes</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text> {data.lunes} </Text>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseHeader>
            <View>
              <Text>Martes</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text> {data.martes} </Text>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseHeader>
            <View>
              <Text>Miercoles</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text> {data.miercoles} </Text>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseHeader>
            <View>
              <Text>Jueves</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text> {data.jueves} </Text>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseHeader>
            <View>
              <Text>Viernes</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text> {data.viernes} </Text>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseHeader>
            <View>
              <Text>Sábado</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text> {data.sabado} </Text>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseHeader>
            <View>
              <Text>Domingo</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text> {data.domingo} </Text>
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
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    marginTop: 13,
    marginBottom:20,
    },
   header: {
    backgroundColor: '#F5FCFF',
    padding: 18,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#091585',
  },
  content: {
    padding: 20,
    backgroundColor: '#D6F0E7',
  },
  active: {
    backgroundColor: '#B6F2FB',
  },
  inactive: {
    backgroundColor: '#8AD2DD',
  },
  multipleToggle: {
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    justifyContent: 'center',
    },
  multipleToggle__title: {
    marginTop:12,
    fontSize: 27,
    color: '#061389',
  },
  
});
export default HomeScreen; 
