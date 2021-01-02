import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import * as firebase from 'firebase';
import firebaseConfig from '../config';

export default class Profil extends Component {

  state = {
    email: '',
    name: '',
  }

  componentDidMount = async () =>{
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    await  firebase.auth().onAuthStateChanged(auth=>{

      if (auth) {
        firebase.database().ref('users').child(auth.uid).once('value', (snap) => {
          this.setState( console.log(snap.val().email)  )
          this.setState({ email: snap.val().email });
          this.setState( console.log(snap.val().name)  )
          this.setState({ name: snap.val().name });
        })
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: "#fff"}}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://i.pinimg.com/originals/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.name}</Text>
              <Text style={styles.info}>{this.state.email}</Text>
              <Text style={styles.description}>Merhaba {this.state.name} !</Text>
              <Text style={styles.description2}>Bize katıldığın için teşekkür ederiz. ToDo ile o gün yapacağın işleri rahat bir şekilde not alabilirsin. Ayrıca keşfet kısmından senin için seçtiğimiz sürprizlere ulaşabilir ve beğendiklerini listene ekleyebilirsin :)</Text>

              <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                firebase.auth().signOut();
						    this.props.navigation.navigate('Login');
				    	}}>
                <Text style = {{color: "#FFF"}}>Çıkış Yap</Text> 
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#681829",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#FFF",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#40928f",
    fontWeight: "600",
    fontWeight: 'bold'
  },
  info:{
    fontSize:13,
    color: "#264746",
    marginTop:1
  },
  description:{
    fontSize:16,
    color: "#264746",
    marginTop:10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  description2:{
    fontSize:16,
    color: "#264746",
    marginTop:5,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  buttonContainer: {
    marginHorizontal:65,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    width: 200,
    height: 30,
    backgroundColor:"#7b1113",
    borderColor:"#171D32",
    paddingVertical:10,
    borderRadius:23
  },
});