import React, { useEffect } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text, StatusBar } from 'react-native';
import Animated from 'react-native-reanimated';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderSetting from './HeaderSetting';
import { Logout } from '../components/LoadIconSvg'
import { connect } from 'react-redux'

const Setting = (props) => {

  useEffect(() => {
  }, [])

  const listButton = [
    {
      icon: <Logout width={20} height={20} />,
      name: "Logout",
      action: () => signout()
    },
  ]

  const signout = async () => {
    auth()
      .signOut()
      .then(async () => {
        console.log('User signed out!');
        await AsyncStorage.removeItem('userLogin');
        props.navigation.navigate('SplashScreen');
      });
  };

  const renderItem = (item, index) => {
    return <TouchableOpacity key={index} style={styles.button} onPress={item.action}>
      <View style={styles.iconButton}>{item.icon}</View>
      <View style={styles.nameButton}>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  }
  return (
    <View style={{ flex: 1 }}>
      <HeaderSetting name={"Phạm Ngọc Duy"} />
      <View style={styles.setting}>
        {
          listButton.map((item, index) => renderItem(item, index))
        }
      </View>

      {/* <Button title="Screen1"  /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  setting: {
    margin: 20
  },
  iconButton: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  nameButton: {
    flex: 0.8,
    justifyContent: "center",
  },
  button: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    elevation: 5,
    marginBottom: 10
  }
});
const mapDispatchToProps = (dispatch) => {
  return {
    setProfile: (data) => {
      dispatch(setProfile(data))
    }
  }
}

const mapStateToProps = (state) => {
  console.log("mapDispatchToProps", state);
  return {
    auth: state.auth.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)
