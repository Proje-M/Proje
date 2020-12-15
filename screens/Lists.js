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
import * as Animatable from 'react-native-animatable';

import TaskList from '../components/TaskList';
//import styles from './global';
import Layout from '../components/global/Layout';
const AnimatableBtn =
  Animatable.createAnimatableComponent(TouchableOpacity);

export default function Nnew ({ navigation }) {
  /* Dados estáticos
  const [task, setTask] = useState([
    { key: 1, task: 'Pagar conta de luz' },
    { key: 2, task: 'Pagar conta de água' },
    { key: 3, task: 'Agendar consulta oftalmo' },
    { key: 4, task: 'Pagar conta escola de inglês' },
    { key: 5, task: 'Agendar consulta cardio' }
  ]);
  */

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

  // Monitorar tasks, para salvar tarefas que foram alteradas
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
    // Filtrar e retornar todos os itens com exceção do clicado
    const find = task.filter(result => result.key !== data.key);

    setTask(find);
  });

  return (
	<Layout navigation={navigation} bold title="NoPaper">
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#171D32"
        barStyle="light-content"
      />
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

      {/* Modal -- Adicionar nova tarefa */}
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