import React, { Component } from 'react';
import {Switch, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const CONTENT = [
  {
    title: 'Lunes',
    content: 'Lunes',
  },
  {
    title: 'Martes',
    content: 'Martes',
  },
  {
    title: 'Miércoles',
    content: 'Miércoles',
  },
  {
    title: 'Jueves',
    content: 'Jueves',
  },
  {
    title: 'Viernes',
    content: 'Viernes',
  },
  {
    title: 'Sábado',
    content: 'Sábado',
  },
  {
    title: 'Domingo',
    content: 'Domingo',
  },
];

export default class App extends Component {
  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text>{section.content}</Text>
      </Animatable.View>
    );
  }

  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
            <View style={styles.multipleToggle}>
                <Text style={styles.multipleToggle__title}>Bienvenido a AirWay</Text>
            </View>
            <View style={styles.subtitle}>
                <Text style={{fontSize:20}}>Hola ...... : tu turno semanal</Text>
            </View>
            <Collapsible collapsed={this.state.collapsed}>
                <View style={styles.content}>
                    <Animatable.Text
                        animation={this.state.collapsed ? undefined : 'zoomIn'}
                        duration={200}
                        useNativeDriver>
                    </Animatable.Text>
                </View>
          </Collapsible>
          <Accordion
            align="bottom"
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={300}
            onChange={this.setSections}
            renderAsFlatList={false}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    backgroundColor: '#8AD2DD',
    },
  /*title: {
    textAlign: 'center',
    fontSize: 32,
   },*/
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