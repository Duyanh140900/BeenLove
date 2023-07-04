import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home/Home';
import Setting from '../Setting/Setting';
import Colors from '../components/assets/color/Colors'
import {
  HomeIcon,
  SettingIcon
} from '../components/LoadIconSvg';

const Tab = createBottomTabNavigator();

export default function BottomBar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        headerShown: false,
        shifting: true
      }}
    >
      <Tab.Screen options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => focused ? <HomeIcon width={20} height={20} fill={Colors.primary} /> : <HomeIcon width={20} height={20} />

      }}
        name="Home" component={Home} headerShown={false} />
      <Tab.Screen options={{
        tabBarLabel: 'Setting',
        tabBarIcon: ({ focused }) => focused ? <SettingIcon width={20} height={20} fill={Colors.primary} /> : <SettingIcon width={20} height={20} />
      }} name="Setting" component={Setting} headerShown={false} />
    </Tab.Navigator>
  );
}
