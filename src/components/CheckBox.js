import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

export default function CheckBox({onPress, isChecked}) {
  //const [isChecked, setIsChecked] = useState(selected);
  return (
    <Pressable
      onPress={() => onPress &&onPress()}
      style={[
        {
          borderRadius: scale(15),
          borderColor: 'white',
          height: scale(25),
          width: scale(25),
        },
        isChecked ? styles.checked : styles.unChecked,
      ]}></Pressable>
  );
}

const styles = StyleSheet.create({
  checked: {
    borderWidth: scale(5),
    backgroundColor: 'red',
    borderColor: 'white',
  },
  unChecked: {
    backgroundColor: 'gray',
  },
});
