import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Home/Home';
import Setting from '../Setting/Setting';
import SplashScreen from '../SplashScreen';
import BottomBar from './BottomBar';
import Login from '../login/Login';
import Register from '../login/Register';
import SetupInformation from '../Home/SetupInformation';

const Stack = createNativeStackNavigator();

export default function MainRouter() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        animationDuration: 0,
        animation: "fade",
        // presentation: "transparentModal",
        animationTypeForReplace: "push",
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BottomBar" component={BottomBar} />
      {/* <Stack.Screen name="Profile" component={Profile} /> */}
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SetupInformation" component={SetupInformation} />
    </Stack.Navigator>
  );
}
