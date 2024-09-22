/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './firebaseConfig'; // Ensure Firebase is initialized

AppRegistry.registerComponent(appName, () => App);

