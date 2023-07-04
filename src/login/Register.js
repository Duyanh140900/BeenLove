import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import Animated from 'react-native-reanimated';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import { Logo, Facebook, Google, Show_Pass, Hide_Pass } from '../components/LoadIconSvg';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InputForm = props => (
  <View style={styles.view_input}>
    <TextInput
      editable
      // multiline
      numberOfLines={1}
      maxLength={40}
      onChangeText={text => props.onChangeText(text)}
      value={props.value}
      style={{ padding: 10 }}
      placeholder={props.placeholder}
      secureTextEntry={props?.secureTextEntry && !props?.showPassword}
    />
    {props?.secureTextEntry ? !props?.showPassword ? <TouchableOpacity style={{ position: "absolute", right: 10 }} onPress={() => props.setShowPassword(true)}><Hide_Pass width={20} height={20} /></TouchableOpacity> : <TouchableOpacity style={{ position: "absolute", right: 10 }} onPress={() => props.setShowPassword(false)}><Show_Pass width={20} height={20} /></TouchableOpacity> : null}

  </View>
);

const Register = ({ navigation }) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  submitUser = () => {
    if (password == rePassword) {
      auth()
        .createUserWithEmailAndPassword(mail, password)
        .then(async respone => {
          await AsyncStorage.setItem('userLogin', JSON.stringify(respone));
          navigation.navigate('SplashScreen');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };

  const login = () => {
    navigation.navigate('Login');
  };

  console.log('navigation', mail, password);
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.logo}>
        <Logo height={70} width={70} />
      </View>
      <InputForm value={mail} onChangeText={setMail} placeholder={'Email'} />
      <InputForm
        value={password}
        onChangeText={setPassword}
        placeholder={'Password'}
        secureTextEntry={true}
        showPassword={showPassword}
        setShowPassword={(value) => setShowPassword(value)}
      />
      <InputForm
        value={rePassword}
        onChangeText={setRePassword}
        placeholder={'Confirm password'}
        secureTextEntry={true}
        showPassword={showPassword}
        setShowPassword={(value) => setShowPassword(value)}
      />
      <View
        style={{
          alignItems: 'center',
          margin: 20,
          backgroundColor: 'red',
          flexDirection: 'row',
          borderRadius: 15,
          overflow: 'hidden',
        }}>
        <TouchableOpacity style={styles.button_submit} onPress={submitUser}>
          <Text style={styles.text_button}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 40,
          marginTop: 20,
        }}>
        <TouchableOpacity style={styles.button_login_diff}>
          <Google width={40} height={40} />
          <Text>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_login_diff}>
          <Facebook width={30} height={30} />
          <Text>Facebook</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
          alignItems: 'center',
        }}>
        <Text>You have account ?</Text>
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: 'center' }}
          onPress={login}>
          <Text style={{ color: '#ff5b2d', fontSize: 16, fontWeight: '600' }}>
            {' '}
            Sign in
          </Text>
        </TouchableOpacity>
      </View>

      {/* <Button title="Screen2" onPress={() => navigation.navigate('Setting')} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  view_input: {
    backgroundColor: '#edeef2',
    height: 50,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center"
  },
  button_submit: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5b2d',
    width: '100%',
  },
  text_button: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
  },
  register: {
    alignItems: 'center',
    marginHorizontal: 100,
  },
  button_login_diff: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    width: 120,
    paddingHorizontal: 10,
    borderRadius: 25,
    height: 50,
  },
});

export default Register;
