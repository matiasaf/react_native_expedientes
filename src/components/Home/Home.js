import React from 'react'
import {ScrollView, View, Button, Text, TextInput, StyleSheet, ActivityIndicator, Alert} from 'react-native'

import axios from 'axios'

class Home extends React.Component {

  state = {
    expediente: [],
    nroExpediente: '',
    errors: [],
    consultaExpediente:false,
    consultaExpedienteLoading:false,
  }

  consultarTramite = () => {

    const {nroExpediente} = this.state;

    this.setState({consultaExpedienteLoading: true, consultaExpediente:false})

    axios.get('https://apps.entrerios.gov.ar/wsEntreRios/getTokenConsultaTramites')
    .then(token => axios.get(`https://apps.entrerios.gov.ar/wsEntreRios/consultaTramite/?nroExpediente=${nroExpediente}`, {
      headers: {
        'Authorization': token.data,
        'hostip': '10.254.254.254',
        'ip_cliente': '10.254.2.2'
      }
    }).then(res => {
      if(res.data.length != 0)
      {
        this.setState({expediente: res.data[0]})
        this.setState({consultaExpedienteLoading: false, consultaExpediente: true})

      }else{

        this.setState({consultaExpedienteLoading: false})
        this.setState({errors: {expediente: 'Ha habido un error en la consulta. Fijese si es un número de expediente válido.'}})
        Alert.alert(
        '¡Hubo problemas!',
        'Ha habido un error en la consulta. Fijese si es un número de expediente válido.'
        )
      }

    })).catch(err => { this.setState({errors: err.message})})

  }

  render() {

    const {expediente, errors, consultaExpediente, consultaExpedienteLoading} = this.state;

    return (<ScrollView>

      <Text style={styles.item}>INGRESE EL NÚMERO DE EXPEDIENTE</Text>

      <TextInput
        style={styles.nroexpediente}
        onChangeText={(nroExpediente) => this.setState({nroExpediente, errors:{expediente :'' }})}
        value={this.state.nroExpediente}
      />

      <Button style={styles.boton} title="consulte expediente" onPress={() => this.consultarTramite()}/>

      {consultaExpediente && <View style={{height:750, marginTop:20}}>

        <View style={styles.movimientosContainer}>
          <Text style={styles.item}>DATOS DEL EXPEDIENTE</Text>
        </View>

          <Text style={styles.subitem}>Nro expediente : {expediente.NRO_EXPEDIENTE}</Text>
          <Text style={styles.subitem}>Iniciado para : {expediente.INVOLUCRADOS}</Text>
          <Text style={styles.subitem}>Fecha de inicio : {expediente.FECHA_EXP}</Text>
          <Text style={styles.subitem}>Tramitado por : {expediente.ENTE_GENERADOR}</Text>
          <Text style={styles.subitem}>Asunto : {expediente.ASUNTO}</Text>

        <View style={styles.movimientosContainer}>
          <Text style={styles.item}>MOVIMIENTOS</Text>
        </View>

          <Text style={styles.subitem}>Fecha : {expediente.FECHA}</Text>
          <Text style={styles.subitem}>Destino : {expediente.ENTE_DESTINO}</Text>
          <Text style={styles.subitem}>Folio : {expediente.CANT_FOLIOS}</Text>
          <Text style={styles.subitem}>Pasa con : {expediente.PASACON}</Text>

      </View>}

      { consultaExpedienteLoading && <ActivityIndicator size="large" color="#0000ff" style={{marginTop:50}} />}

    </ScrollView>)

  }
}

const styles = StyleSheet.create({
  container: {
  },
  nroexpediente:{
   padding: 10,
   borderColor: '#799f4f',
   borderWidth: 1,
  },
  item: {
    padding: 5,
    fontSize: 18,
  },
  subitem: {
    padding: 5,
    fontSize: 15
  },
  errorText:{
    padding:20,
    fontSize: 18,
    color: '#a94442'
  },
  boton: {
    flex: 2
  },
  movimientosContainer:{
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  }
});

export default Home
