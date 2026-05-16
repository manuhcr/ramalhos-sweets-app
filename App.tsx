import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './telas/Home';
import Favoritos from './telas/Favoritos';
import Shop from './telas/Shop';
import Perfil from './telas/Perfil';
import Login from './telas/Login';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  MysteryQuest_400Regular,
} from '@expo-google-fonts/mystery-quest';
import { View } from 'react-native';
import {
  useFonts,
  Mali_400Regular,
  Mali_700Bold,
} from '@expo-google-fonts/mali';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// COMPONENTE DAS ABAS
function Menu() {
  return (
    <Tab.Navigator id={undefined}
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = 'help-circle';

          if (route.name === "Home") {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === "Favoritos") {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Carrinho') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: 'rgb(255, 207, 207)',
        tabBarInactiveTintColor: 'rgb(255, 255, 255)',

        tabBarStyle: {
          position: 'absolute',

          bottom: 10,
          left: 20,
          right: 20,
          height: 70,
          borderRadius: 30,
          backgroundColor: 'rgba(141, 88, 67, 0.82)',
          borderWidth: 2,
          borderColor: 'rgba(255, 219, 227, 0.6)',
          borderTopWidth: 0,

          elevation: 0,
          margin: 20,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 20,
          shadowOffset: {
            width: 0,
            height: 10,
          },

          overflow: 'hidden',
        },

        tabBarItemStyle: {
          borderRadius: 20,
          marginVertical: 7,
          marginHorizontal: 4,
        },
      })}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Favoritos' component={Favoritos} />
      <Tab.Screen name='Carrinho' component={Shop} />
      <Tab.Screen name='Perfil' component={Perfil} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fonteCarregada] = useFonts({
    "MysteryRegular": MysteryQuest_400Regular,
    "MaliRegular": Mali_400Regular,
    "MaliBold": Mali_700Bold
  });

  if (!fonteCarregada) return <View />;

  return (
    <NavigationContainer>
      <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Menu} />
        <Stack.Screen name="Sobre" component={Home} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
