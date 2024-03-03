import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const Input = () => {
  console.log("hjgsfjsdn");
  return (
    <View>
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        onChangeText={text => onChangeText(text)}
        value={value}
        style={{padding: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Input;
