import React, { useState, useCallback, useEffect}
  from 'react';
import
  {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Modal,
    TextInput,
    AsyncStorage
  } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import TaskList from '../components/TaskList';
import Layout from '../components/global/Layout';

const AnimatableBtn =
  Animatable.createAnimatableComponent(TouchableOpacity);

export default function Plans({ navigation }) {

  const [task, setTask] = useState([]);
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');

  // Obtendo todas as tarefas ao iniciar o app
  useEffect(() => {
    async function loadTasks() {
      const taskStorage = await AsyncStorage.getItem('@task');

      if(taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    }

    loadTasks();
  }, []);

  useEffect(() => {
    async function saveTasks(){
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }

    saveTasks();
  }, [task]);

  function handleAdd() {
    if(input === '') return;

    const data = {
      key: input,
      task: input
    };

    setTask([...task, data]);
    setVisible(false);
    setInput('');
  }

  const handleDelete = useCallback((data) => {
    const find = task.filter(result => result.key !== data.key);

    setTask(find);
  });


  monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  var today = new Date();
  date=today.getDate() + "  "+ monthNames[today.getMonth()] +"  "+ today.getFullYear() +"  "+ today.getHours() +":"+ today.getMinutes()+":"+today.getSeconds();
  var textb = ""
  var now = today.getHours();
      if (now < 12 && now >= 8) {
        textb = " Günaydın"
      } else if (now >= 12 && now <= 17) {
        textb = " İyi Öğlenler"
      }else {
        textb = "iyi geceler"
      }


  var msTillEndOfDay = moment().endOf('day').add(1, 'seconds').diff(moment(), 'milliseconds');
  return (
	<Layout navigation={navigation} bold title="NoPaper">
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#171D32"
        barStyle="light-content"
      />
      <View>
        <Text style = {{fontSize: 20, marginLeft: 18, color: '#EB984E', }}> {date} {textb}</Text>
      </View>
      
      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={ task }
        keyExtractor={(item) => String(item.key)}
        renderItem={({ item }) =>
          <TaskList
            data={ item }
            handleDelete={ handleDelete }
          />
        }
      />
      
      <Modal
        animationType="slide"
        transparent={false}
        translucent={false}
        visible={visible}
      >
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Ionicons
                style={{marginLeft: 5, marginRight: 5}}
                name="md-arrow-back"
                size={30}
                color="#FFF"
              />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Yeni Görev Ekle</Text>
          </View>

          <Animatable.View
            style={styles.modalBody}
            useNativeDriver
            animation="fadeInUp"
          >
            <TextInput
              multiline={true}
              placeholder="Bugün sırada hangi görev var?"
              placeholderTextColor="#737373"
              autoCorrect={false}
              style={styles.modalInput}
              value={ input }
              onChangeText={(text) => setInput(text)}
            />
            <Text style = {{fontSize: 20, marginLeft: 18, color: '#EB984E', }}>{date} </Text>

            <TouchableOpacity
              style={styles.modalAddBtn}
              onPress={ handleAdd }
            >
              <Text style={styles.modalAddText}>Kaydet</Text>
            </TouchableOpacity>
          </Animatable.View>
        </SafeAreaView>
      </Modal>

      <AnimatableBtn
        style={styles.addBtn}
        useNativeDriver
        animation="fadeInUp"
        duration={2000}
        onPress={() => setVisible(true)}
      >
        <Ionicons
          name="ios-add"
          size={35}
          color="#FFF"
        />
      </AnimatableBtn>

    </SafeAreaView>
	</Layout>
  );
};