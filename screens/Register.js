import React from 'react';
import { Alert, Dimensions, Text, View, Image, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as firebase from 'firebase';
import firebaseConfig from '../config';

const {width, height} = Dimensions.get('window');


export default class Register extends React.Component{
    state = {
        email: '',
        password:'',
        name:'',
        login:false,
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
        this.setState({ login: true });

        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then((auth) => {
            let uid = auth.user.uid;
            this.createUser(uid)
            this.props.navigation.navigate('SecondScreen');
          }).catch((err) => {
            this.setState({ login: false });
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

    createUser = (uid) => {
        firebase.database().ref('users').child(uid).set({
          email: this.state.email,
          uid: uid,
          name: this.state.name,
        });
    }


    render(){
        // if (this.state.login) {
        //     return (
        //       <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
        //         <Text 
        //             onPress={()=>navigate('Home')}
                
        //             style={{
        //                 alignSelf:"center",
        //                 color:"#00716F",
        //                 paddingVertical:30
        //             }}>New User
        //         </Text>
        //       </View>
        //     );
        //   } else{
            return(
                <View style={{backgroundColor:"#FFF",height:"100%"}}>
                    <Image source ={require('../images/logo.png')}
                        style={{width:"100%",height:"43%"}}
                    />
    
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
                            placeholder="Name"
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
                            placeholder="Password"
                            placeholderTextColor="#00716F"
                            style={{paddingHorizontal:10}}
                            value={this.state.password}
                            secureTextEntry
                            onChangeText={password=>this.setState( { password: password})}
                        />
                    </View>
    
    
                    {/* <View style={{
                        flexDirection:"row",
                        alignItems:"center",
                        marginHorizontal:55,
                        borderWidth:2,
                        marginTop:15,
                        paddingHorizontal:10,
                        borderColor:"#00716F",
                        borderRadius:23,
                        paddingVertical:2
                    }}>
                       
                       <TextInput 
                            secureTextEntry
                            placeholder="Confirm Password"
                            placeholderTextColor="#00716F"
                            style={{paddingHorizontal:10}}
                        />
                        
    
                    </View> */}
    
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
                    
                </View>
            )
          //}
        
    }
}