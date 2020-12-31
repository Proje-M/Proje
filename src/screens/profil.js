import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import * as firebase from 'firebase';
import firebaseConfig from '../config';

const signOutUser = () => {
  Alert.alert(
    'Bildirim',
    'Çıkmak istediğinize emin misiniz?',
    [
      {
        text: 'Hayır',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Evet', onPress: () => firebase.auth().signOut() },
    ],
    { cancelafble: false },
  );
};

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
      const email = this.state.email;
      const name = this.state.name;

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
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.name}</Text>
              <Text style={styles.info}>{this.state.email}</Text>
              <Text style={styles.description}>Merhabe {this.state.email} Uygulamamız ile o gün yapacağın işleri rahat bir şekilde not alabilir ve takvim kısmından ayları görüntüleyebilirsin.</Text>
              
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                signOutUser
						    this.props.navigation.navigate('Login');
				    	}}>
                <Text>Çıkış Yap</Text> 
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#EB984E",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
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
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#EB984E",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#EB984E",
  },
});