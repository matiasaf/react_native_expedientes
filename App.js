import React from 'react'
import {StyleSheet, Text, View, Image } from 'react-native'
import {NativeRouter, Route, Link} from 'react-router-native'

import Home from './src/components/Home/Home'

const App = () => (<NativeRouter>
  <View style={styles.container}>

    <View style={styles.nav}>
      <Link to="/" underlayColor='#799f4f' style={styles.navItem}>
      <View>
        <Image
              style={{width: 340, height:52 }}
              resizeMode="cover"
              source={{uri: 'https://www.entrerios.gov.ar/dgin/imagenes/enca_sitio.png'}}
            />
        <Text style={styles.textoNavBar}>CONSULTA DE EXPEDIENTE</Text>
      </View>
      </Link>

    </View>

    <Route exact={true} path="/" component={Home}/>

  </View>
</NativeRouter>)

const styles = StyleSheet.create({
  container: {
    // padding: 10,
  },
  header: {
    fontSize: 25,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#799f4f',
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: 'center',
    fontSize: 15
  },
  textoNavBar:{
    padding:10,
    marginLeft:25,
    fontSize: 22,
    color:'white',
  }
})

export default App
