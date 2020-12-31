import React from 'react';
import { Alert, Dimensions, Text, View, Image, TextInput, ScrollView } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as firebase from 'firebase';
import firebaseConfig from '../config';

const {width, height} = Dimensions.get('window');


export default class Register extends React.Component{
    state = {
        email: '',
        password:'',
        passwordConfirm:'',
        name:''
    }

    componentDidMount = () =>{
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
         }
      
          firebase.auth().onAuthStateChanged(auth => {
            if(auth) {
              console.log('Giriş Yapıldı.');
            }else{
              console.log('Giriş Yapılmadı.');
            }
          });
    }
    
    kayitol = () => {
        const email = this.state.email;
        const password = this.state.password;
        const passwordConfirm = this.state.passwordConfirm;

        const check = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!email || check.test(email.toString()) === false)
        {
            Alert.alert(
                '      Giriş Yapılamadı', 
                '-Email formatını doğru giriniz-',
                [
                  {text: 'Tamam', onPress: () => console.log('Ok Pressed'), style: 'default'}
                ],
                { cancelable: false }
              )
        }else if(password.length < 6){
            Alert.alert(
                '        Giriş Yapılamadı', 
                '-Şifre en az 6 karakter olmalıdır-',
                [
                  {text: 'Tamam', onPress: () => console.log('Ok Pressed'), style: 'default'}
                ],
                { cancelable: false }
            )
        }else if(passwordConfirm!=password){
            Alert.alert(
                '     Giriş Yapılamadı', 
                '-Şifreler birbiriyle uyuşmuyor-',
                [
                  {text: 'Tamam', onPress: () => console.log('Ok Pressed'), style: 'default'}
                ],
                { cancelable: false }
            )
        }
        else{
            firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then((auth) => {
            let uid = auth.user.uid;
            this.createUser(uid)
            Alert.alert(
                '    Giriş Yapabilirsiniz',
                'Kullanıcı Başarıyla Kaydedildi',
                [
                  {text: 'Tamam', onPress: () => this.props.navigation.navigate('Main'), style: 'default'}
                ],
                { cancelable: false }
           )
          }).catch((err) => {
            Alert.alert(
                'Kullanıcı Kaydedilemedi',
                '      -Lütfen tekrar deneyiniz-',
                [
                  {text: 'Tamam', onPress: () => console.log('Ok Pressed'), style: 'default'}
                ],
                { cancelable: false }
           )
        })
        } 
    }

    createUser = (uid) => {
        firebase.database().ref('users').child(uid).set({
          email: this.state.email,
          uid: uid,
          name: this.state.name,
        });
    }


    render(){
       
        return(
            <View style={{backgroundColor:"#FFF",height:"100%"}}>
                <Image source ={require('../../assets/images/logo.png')}
                    style={{width:"100%",height:"43%"}}
                />
                 <ScrollView  blurRadius={100}>
    
                <Text
                style={{
                    marginHorizontal:55,
                    textAlign:'center',
                    marginTop:5,
                    opacity:0.4
                }}
                >
                    Kendi listelerini oluşturup kaydedebilmek için uygulamamıza üye olabilirsin :)  
                </Text>


                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginHorizontal:55,
                    borderWidth:2,
                    marginTop:50,
                    paddingHorizontal:10,
                    borderColor:"#171D32",
                    borderRadius:23,
                    paddingVertical:2
                }}>
                  <Icon name="user" color="#171D32" size={24}/>
                    <TextInput 
                        placeholder="İsim Soyisim"
                        placeholderTextColor="#00716F"
                        style={{paddingHorizontal:10}}
                        value={this.state.name}
                        onChangeText={name=>this.setState( { name: name})}
                    />
    
                </View>
    
                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginHorizontal:55,
                    borderWidth:2,
                    marginTop:15,
                    paddingHorizontal:10,
                    borderColor:"#171D32",
                    borderRadius:23,
                    paddingVertical:2
                }}>
                  <Icon name="mail" color="#171D32" size={24}/>
                    <TextInput 
                        placeholder="Email"
                        placeholderTextColor="#00716F"
                        style={{paddingHorizontal:10}}
                        value={this.state.email}
                        keyboardType='email-address'
                        onChangeText={email=>this.setState( { email: email})}
                    />
    
                </View>
    
                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginHorizontal:55,
                    borderWidth:2,
                    marginTop:15,
                    paddingHorizontal:10,
                    borderColor:"#171D32",
                    borderRadius:23,
                    paddingVertical:2
                }}>
                   <Icon name="lock" color="#171D32" size={24}/>
                   <TextInput 
                        secureTextEntry
                        placeholder="Şifre"
                        placeholderTextColor="#00716F"
                        style={{paddingHorizontal:10}}
                        value={this.state.password}
                        secureTextEntry
                        onChangeText={password=>this.setState( { password: password})}
                    />
                </View>
    
    
                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginHorizontal:55,
                    borderWidth:2,
                    marginTop:15,
                    paddingHorizontal:10,
                    borderColor:"#171D32",
                    borderRadius:23,
                    paddingVertical:2
                }}>
                    <Icon name="lock" color="#171D32" size={24}/>

                   <TextInput 
                        secureTextEntry
                        placeholder="Şifreyi Onayla"
                        placeholderTextColor="#00716F"
                        style={{paddingHorizontal:10}}
                        value={this.state.passwordConfirm}
                        secureTextEntry
                        onChangeText={passwordConfirm=>this.setState( { passwordConfirm: passwordConfirm})}
                    />
                    
    
                </View>
    
                <TouchableOpacity onPress={() => this.kayitol()} >
                    <View style={{
                        marginHorizontal:55,
                        alignItems:"center",
                        justifyContent:"center",
                        marginTop:30,
                        backgroundColor:"#171D32",
                        paddingVertical:10,
                        borderRadius:23
                    }}>
                        <Text style={{
                            color:"white",
                        }}>Kayıt Ol</Text>
                    </View>
                </TouchableOpacity>
                </ScrollView>
                    
            </View>
        )
    }
}