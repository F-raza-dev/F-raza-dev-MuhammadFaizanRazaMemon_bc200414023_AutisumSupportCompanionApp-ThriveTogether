// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './src/screens/Login';
import SplashScreen from './src/screens/SplashScreen';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';
import Todo from './src/screens/Todo';
import Calming from './src/screens/Calming';
import Learner from './src/screens/Learner';
import Youtube from './src/screens/Youtube';
import Homee from './src/components/AccesComp';
import {FontSizeProvider} from './src/Hooks/FontSizeContext';
import LinearGradient from 'react-native-linear-gradient';
import {ThemeProvider, useTheme} from './src/Hooks/ThemeContext';
import Toast from 'react-native-toast-message';
import toastConfig from './src/components/ToastConfig';
import Profile from './src/screens/Profile';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const {theme, changeTheme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          let iconLib = 'FontAwesome';

          switch (route.name) {
            case 'Home':
              iconName = 'home-heart';
              iconLib = 'MaterialCommunityIcons';
              break;
            case 'Todo':
              iconName = 'tasks';
              break;
            case 'Calming':
              iconName = 'leaf';
              break;
            case 'Learner':
              iconName = 'book';
              break;
            case 'YouTube':
              iconName = 'youtube-play';
              break;
            default:
              iconName = 'circle';
              break;
          }

          const IconComponent =
            iconLib === 'MaterialCommunityIcons'
              ? require('react-native-vector-icons/MaterialCommunityIcons')
                  .default
              : require('react-native-vector-icons/FontAwesome').default;

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.backgroundColor,
        tabBarInactiveTintColor: '#d4d4d8',
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: 15,
          right: 15,
          borderRadius: 15,
          height: 60,
          backgroundColor: '#020617',
          shadowColor: '#94a3b8',
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 0,
          marginBottom: 5,
        },
      })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="Todo" component={Todo} options={{headerShown: false}} />
      <Tab.Screen
        name="Calming"
        component={Calming}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Learner"
        component={Learner}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="YouTube"
        component={Youtube}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};



const Stack = createNativeStackNavigator();

function App() {
  return (
    <ThemeProvider >
      <FontSizeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HomeTabs"
              component={HomeTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
          <Toast config={toastConfig} />
        </NavigationContainer>
      </FontSizeProvider>
    </ThemeProvider>
  );
}

export default App;
