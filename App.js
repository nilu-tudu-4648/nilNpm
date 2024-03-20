import {View, Text} from 'react-native';
import React, { useEffect } from 'react';
import AppNavigator from './src/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import { getDeviceInfo } from 'react-native-nilbutton';

const App = () => {
  const fetchDeviceInfo = async () => {
    try {
      const deviceInfo = await getDeviceInfo();
      console.log(deviceInfo);
    } catch (error) {
      console.error('Error retrieving device information:', error);
    }
  };
  useEffect(() => {
fetchDeviceInfo()
  }, [])
  
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
