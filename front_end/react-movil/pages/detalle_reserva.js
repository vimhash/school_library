import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView, AsyncStorage, Image } from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import { Card } from 'react-native-elements';
import { Link } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const API = 'http://192.168.100.6:8001/server/library_byID'

export default class detalleBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      libros: [],
      libro_id: '',
    };
  }

  componentDidMount() {
    this.asyncstorageGet()
  }

  getData = () => {
    axios.get(`${ API }?tabla=libro&&id=${ this.state.libro_id }`)
    .then(response => {
      this.setState({ libros: response.data.datos })
    })
    .catch(error => {
      console.log(error)
    })
  }
 
  asyncstorageGet = async () => {
    try {
      const id = await AsyncStorage.getItem('libro_id')
      this.setState({ libro_id: id})
      this.getData()
    } catch (e) {
      alert(e)
    }
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  drawerContent = () => {
    return (
      <View style={styles.animatedBox}>
      <TouchableOpacity onPress={this.toggleOpen} >
        <Icon style={styles.closeButton} name="close" size={30} color="#fff" />
      </TouchableOpacity>
      <View>
          <Image
          style={{width: 100, height: 100, marginHorizontal: '15%', borderRadius: 100,}}
          source={require('../assets/book.jpg')}
        />
        <Text style={{color: '#fff', marginVertical: '10%', alignItems: 'center', paddingHorizontal: '5%'}}>Sistema de Biblioteca</Text>
            <TouchableHighlight>
              <Link to="/library" style={styles.menuButton}>
                  <Text style={{color: '#fff'}}>Biblioteca</Text>
              </Link>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight>
              <Link to="/reserve" style={styles.menuButton}>
                <Text style={{color: '#fff'}}>Reservaciones</Text>
              </Link>
            </TouchableHighlight>
          </View>
        </View>
    );
  };
  
  render() {
    const { libros } = this.state
    return (
      <View style={styles.container}>
        <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          animationTime={250}
          overlay={true}
          opacity={0.4}
        >
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={this.toggleOpen} style={styles.menu}>
              <Icon style={styles.openButton} name="navicon" size={30} color="#fff" />
            </TouchableOpacity>
              <View style={styles.header} >
                <Text style={styles.textHeader}>Sistema de biblioteca</Text>
              </View>
                <TouchableHighlight style={styles.menu}>
                  <Link to="/library">
                    <Icon style={styles.openButton} name="chevron-left" size={30} color="#fff" />
                  </Link>
                </TouchableHighlight>
          </View>
          <View style={styles.body}>
          <ScrollView vertical={true}>
          <Text style={styles.text}>Detalle de su Reservación.</Text>
          <Text style={{marginHorizontal: 5, marginTop: 5, color: '#1a202c', paddingHorizontal: 15, paddingVertical: 5,  borderColor: '#fff', borderWidth: 2,}}>Para poder realizar una reservación deberá de llenar los siguientes campos.</Text>
            { libros.map(element => 
              <Card title={ element.titulo } image={require('../assets/iconos-libros.png')} key={ element.id }>
                <Text style={{marginBottom: 10}}>
                  Autor: { element.autor }
                </Text>
                <Text style={{marginBottom: 10}}>
                  Editorial: { element.editorial }
                </Text>
                <Text style={{marginBottom: 10}}>
                  País: { element.pais }
                </Text>
                <Text style={{marginBottom: 10}}>
                  Año: { element.año }
                </Text>
                <TouchableOpacity style={styles.button}>
                    <Link to="/detalle" onPress={ () => this.asyncstorageSave(element.id) }>
                        <Text style={{marginHorizontal: 20, color: '#000'}} >
                          <Icon name="bookmark" size={20} color="#000" /> Realizar Reservación
                        </Text>
                    </Link>
                </TouchableOpacity>
              </Card>
              )
            }
            </ScrollView>
          </View>   
        </MenuDrawer> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%', 
    height: '100%',
    backgroundColor: '#fff',
  },
  animatedBox: {
    flex: 1,
    backgroundColor: '#2c7a7b',
  },
  header: {
    flex: 2, 
    height: 75, 
    backgroundColor: '#2c7a7b',
  },
  body: {
    flex: 6,
  },
  text:{
    color:'#000',
    paddingLeft:'10%',
    paddingBottom: '5%',
    paddingTop: '8%',
    fontSize: 18,
  },
  textHeader:{
    color:'white',
    paddingLeft:'10%',
    paddingBottom: '5%',
    paddingTop: '15%',
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  menu: {
    flex: 0.5, 
    height: 75, 
    backgroundColor: '#2c7a7b',
  },
  openButton: {
    marginTop: '50%',
    marginHorizontal: '15%',
  },  
  closeButton: {
    marginTop: '15%',
    marginBottom: '20%',
    marginLeft: '5%',
    marginRight: '60%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  menuButton: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255, .1)',
  },
})