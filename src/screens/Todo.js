import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Tts from 'react-native-tts';
import Common from '../components/Common';
import {useTheme} from '../Hooks/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import storage from '@react-native-firebase/storage'; // Import Firebase Storage

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [mode, setMode] = useState('date');
  const {theme} = useTheme();
  const navigation = useNavigation(); // Get the navigation prop

  useEffect(() => {
    const loadTasksFromStorage = async () => {
      const storedTasks = await loadTasks();
      setTasks(storedTasks);
    };

    loadTasksFromStorage();
  }, []);

  const saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  };

  const loadTasks = async () => {
    try {
      const tasksString = await AsyncStorage.getItem('tasks');
      if (tasksString) {
        return JSON.parse(tasksString);
      }
      return [];
    } catch (error) {
      console.error('Failed to load tasks:', error);
      return [];
    }
  };

  const addTask = async () => {
    if (task) {
      const newTask = {
        id: Date.now().toString(),
        task,
        taskTime: taskDate.toISOString(),
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      await saveTasks(updatedTasks);
      setTasks(updatedTasks);
      setTask('');
      setTaskDate(new Date());
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a task.',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };

  const deleteTask = async id => {
    const updatedTasks = tasks.filter(item => item.id !== id);
    await saveTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  const editTask = task => {
    setTask(task.task);
    setTaskDate(new Date(task.taskTime));
    setEditingTaskId(task.id);
  };

  const updateTask = async () => {
    if (task) {
      const updatedTasks = tasks.map(item =>
        item.id === editingTaskId
          ? {...item, task, taskTime: taskDate.toISOString()}
          : item,
      );
      await saveTasks(updatedTasks);
      setTasks(updatedTasks);
      setTask('');
      setTaskDate(new Date());
      setEditingTaskId(null);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a task.',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };

  const handleAlertAndSpeech = task => {
    Alert.alert(
      'Task Reminder',
      task.task,
      [
        {
          text: 'OK',
          onPress: () => completeTask(task.id),
        },
      ],
      {cancelable: false},
    );
    Tts.speak(task.task);
    setTimeout(() => {
      completeTask(task.id);
    }, 120000);
  };

  const speakTask = task => {
    const dateObj = new Date(task.taskTime);
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[dateObj.getMonth()];
    
    const daySuffix = day => {
      if (day > 3 && day < 21) return 'th'; 
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    const taskTime = dateObj.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  
   
    // Final TTS output
    Tts.speak(
      `As-salamu alaykum It's time for your ${task.task}. Scheduled for: ${day}${daySuffix(day)} ${month} ${year} at ${taskTime}.`
      , {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 1.0, // Increase volume
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      })
  };
  

  const completeTask = async id => {
    const updatedTasks = tasks.map(item =>
      item.id === id ? {...item, completed: true} : item,
    );
    await saveTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      tasks.forEach(task => {
        const taskDate = new Date(task.taskTime);
        if (taskDate <= now && !task.completed) {
          handleAlertAndSpeech(task);
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [tasks]);

  const showPicker = currentMode => {
    setMode(currentMode);
    setShowDatePicker(true);
  };

  const onChangeDatePicker = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTaskDate(selectedDate);
      if (mode === 'date') {
        setMode('time');
        setShowDatePicker(true);
      }
    }
  };


  const [pic, setPic] = useState(''); // Default profile picture URL
  const [name, setName] = useState('');

  useEffect(() => {
    
    

    fetchUserData();
  }, []);


  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      if (userId) {
        const userDoc = await firestore().collection('users').doc(userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setName(userData.name || '');

          setPic(userData.pic || '');
        }
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };




  return (
    <Common>
      <LinearGradient
        colors={[theme.backgroundColor, '#cbd5e1']}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={styles.gradientBackground}>

<View style={styles.header}>
        <View>

       <Text style={styles.nam}>
        hello' {name?name:null}
       </Text>
       <Text style={styles.name}>Thrive Together</Text>
        </View>

        <TouchableOpacity style={styles.userIconContainer}
        onPress={() => navigation.navigate('Profile')}
        >
         {
          pic ? 
          <Image
          source={{ uri: pic }} 
          style={styles.userIcon}
        />
        :
        <Image
        source={{ uri: 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png' }} 
        style={styles.userIcon}
      />
         }
        </TouchableOpacity>
      </View>


        <View style={styles.todo}>
          <Icon
            name="checklist"
            size={30}
            color={theme.backgroundColor}
            style={styles.todoIcon}
          />

          <Text style={[styles.heading, {color: theme.textColor}]}>
            Plan Your Day
          </Text>
        </View>

        <TextInput
          style={[styles.input, {color: theme.textColor}]}
          placeholder="Enter Task"
          value={task}
          placeholderTextColor={theme.textColor}
          onChangeText={setTask}
        />
        <View style={styles.dateTimePicker}>
          <TouchableOpacity
            style={[
              styles.pickButton,
              {backgroundColor: theme.backgroundColor},
            ]}
            onPress={() => showPicker('date')}>
            <Text style={styles.pickButtonText}>Pick Date & Time</Text>
          </TouchableOpacity>
          <Text style={styles.taskDateText}>{taskDate.toLocaleString()}</Text>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={taskDate}
            mode={mode}
            display="default"
            onChange={onChangeDatePicker}
          />
        )}

        <View style={styles.buttonContainer}>
          {editingTaskId ? (
            <TouchableOpacity
              style={[
                styles.updateButton,
                {backgroundColor: theme.backgroundColor},
              ]}
              onPress={updateTask}>
              <Text style={styles.buttonText}>Update Task</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.addButton,
                {backgroundColor: theme.backgroundColor},
              ]}
              onPress={addTask}>
              <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={[
                styles.taskItem,
                item.completed
                  ? [styles.completedTask, {color: theme.textColor}]
                  : new Date(item.taskTime) < new Date()
                  ? [styles.expiredTask, {color: theme.textColor}]
                  : [styles.pendingTask, {color: theme.textColor}],
              ]}>
              <Text style={styles.taskText}>
                {item.task}
              </Text>
              <Text style={styles.taskTime}>
                {new Date(item.taskTime).toLocaleString()}
              </Text>
              <View style={styles.taskActions}>
                <TouchableOpacity style={{backgroundColor: 'white',paddingHorizontal:20,paddingVertical:5,borderRadius:10}} onPress={() => speakTask(item)}>
                  <Icon
                    name="volume-up"
                    size={20}
                    color="#6b7280"
                    style={styles.icon}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: 'white',paddingHorizontal:20,paddingVertical:5,borderRadius:10}} onPress={() => editTask(item)}>
                  <Icon
                    name="edit"
                    size={20}
                    color="#6b7280"
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'white',paddingHorizontal:20,paddingVertical:5,borderRadius:10}} onPress={() => deleteTask(item.id)}>
                  <Icon
                    name="delete"
                    size={20}
                    color="#6b7280"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />



        
      </LinearGradient>
    </Common>
  );
};

export default Todo;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop:5

  },
  userIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  userIcon: {
    width: '100%',
    height: '100%',
  },
  nam:{
  fontSize:18,
  color:"black"
  },
  name:{
  fontSize:28,
  color:"black",
  fontWeight:"bold"
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    fontSize: 16,
    color: '#333',
    // marginHorizontal: 20,
  },
  dateTimePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    // marginHorizontal: 20,
  },
  pickButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  pickButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskDateText: {
    marginHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },

  taskItem: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 20,
    marginVertical: 5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    // marginHorizontal: 5,
    marginTop: 10,
  },

  completedTask: {
    backgroundColor: '#064e3b',
    marginBottom: 10,
  },
  expiredTask: {
    backgroundColor: '#334155',
  },
  pendingTask: {
    backgroundColor: '#b91c1c',
  },
  taskText: {
    fontSize: 25,
    fontWeight:"bold",
    flex: 1,
    marginBottom: 2,
    color:"white"

  },
  taskTime: {
    fontSize: 14,
    color: '#888',
    marginRight: 10,
    marginBottom: 2,
    color:"white"

  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 2,
    padding: 3,
    borderRadius: 10,
    marginTop: 10,
  },
  speakerButton: {
    fontSize: 20,
    marginRight: 10,

  },
  editButton: {
    color: '#007bff',
    marginRight: 10,
  },
  deleteButton: {
    color: '#ff4d4d',
  },
  gradientBackground: {
    flex: 1,

    padding: 20,
    paddingTop: 15,
  },
  icon: {
    marginHorizontal: 1,
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginVertical: 20,
    // marginHorizontal: 20,
    backgroundColor: '#fafaf9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  todoIcon: {
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    // marginHorizontal: 20,
    marginBottom: 10,
  },
  updateButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
