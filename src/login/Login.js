import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import Animated from 'react-native-reanimated';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import { Logo, Facebook, Google, Show_Pass, Hide_Pass } from '../components/LoadIconSvg';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InputForm = props => {
  return (
    <View style={styles.view_input}>
      <TextInput
        // editable
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
}

const Login = ({ navigation }) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const validateEmail = (email) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      return true
    } else {
      return false
    }
  }

  const login = () => {
    if (validateEmail(mail)) {
      if (password.length > 6) {

      } else {
        Alert.alert("Thông báo", "Vui lòng nhập password nhiều hơn 6 kí tự")
        return
      }
    } else {
      Alert.alert("Thông báo", "Vui lòng nhập đúng email")
      return;
    }
    auth()
      .signInWithEmailAndPassword(mail, password)
      .then(async respone => {
        console.log('User account created & signed in!', respone);
        try {
          await AsyncStorage.setItem('userLogin', JSON.stringify(respone));
          navigation.navigate('SplashScreen');
        } catch (e) {
          // saving error
        }
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          console.log('That email address is already in use!');
          Alert.alert("Thông báo", "User không tồn tại, vui lòng thử lại.")
        }

        if (error.code === 'auth/wrong-password') {
          Alert.alert("Thông báo", "Mật khẩu không đúng, vui lòng thử lại.")
        }

      });
  };

  const register = () => {
    navigation.navigate('Register');
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
      <View
        style={{
          alignItems: 'center',
          margin: 20,
          backgroundColor: 'red',
          flexDirection: 'row',
          borderRadius: 15,
          overflow: 'hidden',
        }}>
        <TouchableOpacity style={styles.button_submit} onPress={login}>
          <Text style={styles.text_button}>Sign in</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.register}>
        <Text style={{ color: '#ff5b2d' }}>Forget Password ?</Text>
      </TouchableOpacity>

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
        <Text>Don't have an account ?</Text>
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: 'center' }}
          onPress={register}>
          <Text style={{ color: '#ff5b2d', fontSize: 16, fontWeight: '600' }}>
            {' '}
            Sign up
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

export default Login;
