import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const ScreenChangeListener = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const currentRoute = navigation.getCurrentRoute();
      console.log('Current Screen:', currentRoute.name);
    });

    return unsubscribe;
  }, [navigation]);

  return null; // This component doesn't render anything visible
};

export default ScreenChangeListener;
