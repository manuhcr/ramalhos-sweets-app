//Menu
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Sobre from './telas/Sobre';

//ícones 
import Ionicons from '@expo/vector-icons/Ionicons';


const Tab = createBottomTabNavigator();
function Menu() {
  return <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: any;

        if (route.name === "Sobre") {
          iconName = focused ? 'paw' : 'paw-outline'
        }
        return <Ionicons name={iconName} size={size} />
      },
      headerShown: false,
      tabBarActiveTintColor: '#A86B49',
      tabBarInactiveBackgroundColor: '#EB8D96'

    })}>
    <Tab.Screen name='Sobre' component={Sobre} />
    <Tab.Screen name='Sobre1' component={Sobre} />
    <Tab.Screen name='Sobre2' component={Sobre} />
    <Tab.Screen name='Sobre3' component={Sobre} />
  </Tab.Navigator >

}
export default function App() {
  return (
    <NavigationContainer>
      <Menu />
    </NavigationContainer>

  )


}

