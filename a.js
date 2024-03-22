
import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { GestureHandlerRootView, State, TapGestureHandler } from 'react-native-gesture-handler';
import { gyroscope, accelerometer, magnetometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
// import AppNavigator from './src/AppNavigator';
import { getDeviceInfo } from 'raptorx-react-native-sd';
import { store } from './src/redux/store';
import AppNavigator from './src/AppNavigator';

const App = () => {
  const fetchDeviceInfo = async () => {
    try {
      const deviceInfo = await getDeviceInfo();
      console.log(deviceInfo);
    } catch (error) {
      console.error('Error retrieving device information:', error);
    }
  };

  const handleTap = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
        const { x, y } = nativeEvent;
        console.log('Tap coordinates:', x, y);
        // You can perform additional actions here
    }
};

  useEffect(() => {
    // const gyroscopeSubscription = gyroscope.subscribe(({ x, y, z, timestamp }) =>
    //   console.log({ x, y, z, timestamp }, 'gyroscope')
    // );

    // const accelerometerSubscription = accelerometer.subscribe(({ x, y, z, timestamp }) =>
    //   console.log({ x, y, z, timestamp }, 'accelerometer')
    // );

    // const magnetometerSubscription = magnetometer.subscribe(({ x, y, z, timestamp }) =>
    //   console.log({ x, y, z, timestamp }, 'magnetometer')
    // );
fetchDeviceInfo()
  }, []);

 return (
  <Provider store={store}>
    <AppNavigator/>
  </Provider>
//     <GestureHandlerRootView style={{ flex: 1 }}>

//     <View>
//     <TapGestureHandler onHandlerStateChange={handleTap}>
//         <View>
//           <Text>Helo</Text>
//             {/* Your UI components here */}
//         </View>
//     </TapGestureHandler>
// </View>
//     </GestureHandlerRootView>
  );
};

export default App;
