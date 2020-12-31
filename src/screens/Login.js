import React from 'react';
import { Alert, Dimensions, Text,View,Image, TextInput} from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
const {width, height} = Dimensions.get('window');
import firebaseConfig from '../config';

export default class Login extends React.Component{ 
    state = {
        email: '',
        password:'',
        login:false,
        items:[]
    }

    componentDidMount = () =>{
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
         }
        // firebase.initializeApp(firebaseConfig);
      
          firebase.auth().onAuthStateChanged(auth => {
            if(auth) {
              console.log('Giriş Yapıldı.');
            }else{
                this.setState({ login: false });
                console.log('Giriş Yapılmadı.');
            }
          });
    }

    girisYap = () => {
        this.setState({ login: true });
        firebase.database().ref('login').set({
            login: this.state.login,
          });

        //   const myitems = firebase.database().ref("login");
		// myitems.on("value",datasnap=>{
        //     console.log(datasnap.val())
        //     	let deneme=datasnap.val();
		// 		this.setState({ items: deneme });
        // });
        
        const check = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const email = this.state.email;
        !email || check.test(email.toString()) === false
        ? Alert.alert(
            '      Giriş Yapılamadı', 
            '-Email formatını doğru giriniz-',
            [
              {text: 'Tamam', onPress: () => console.log('Ok Pressed'), style: 'default'}
            ],
            { cancelable: false }
          )
        : firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            //giriş başarılı
              
            this.props.navigation.navigate('Main');

        }).catch((err) => {
            this.setState({ login: false });
            Alert.alert(
                '          Giriş Yapılamadı', 
                '-Böyle bir kullanıcı bulunmamaktadır-',
                [
                  {text: 'Tamam', onPress: () => console.log('Ok Pressed'), style: 'default'}
                ],
                { cancelable: false }
              )
        })
    }

    render(){

        return(
            
            <View style={{backgroundColor:"#FFF",height:"100%"}}>
                <Image source ={require('../../assets/images/logo.png')}
                    style={{width:"100%",height:"43%"}}
                />
               
                <Text
                    style={{
                        marginHorizontal:55,
                        textAlign:'center',
                        marginTop:5,
                        opacity:0.4
                    }}
                >Kendi listelerini oluşturup kaydedebilmek için uygulamamıza üye olabilirsin :)
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
                    <Icon name="mail" color="#171D32" size={24}/>
                    <TextInput 
                        style={{paddingHorizontal:10}}
                        placeholder="Email"
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
                        style={{paddingHorizontal:10}}
                        placeholder="Şifre"
                        value={this.state.password}
                        secureTextEntry
                        onChangeText={password=>this.setState( { password: password})}
                    />

                </View>


                <TouchableOpacity onPress={() => this.girisYap()}>
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
                            color:"white"
                        }}>Giriş Yap</Text>  
                    </View>
                </TouchableOpacity>
                   
                
                <Text 
                    onPress={() => {
						this.props.navigation.navigate('Register');
					}}
                
                    style={{
                        alignSelf:"center",
                        color:"#171D32",
                        paddingVertical:30
                    }}>Kayıt Ol
                </Text>
            </View>
    
        )
    }



}
