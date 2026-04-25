import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './telas/Home';
import Favoritos from './telas/Favoritos';
import Shop from './telas/Shop';
import Perfil from './telas/Perfil';
import Login from './telas/Login';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, AtkinsonHyperlegible_400Regular, AtkinsonHyperlegible_700Bold } from '@expo-google-fonts/atkinson-hyperlegible';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// COMPONENTE DAS ABAS
function Menu() {
  return (
    <Tab.Navigator id={undefined}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = 'help-circle';
          if (route.name === "Home") { // Alterado para evitar conflito de nomes
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === "Favoritos") {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Carrinho') {
            iconName = focused ? 'cart' : 'cart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#A86B49',
        tabBarInactiveBackgroundColor: '#FFDEDE',
        tabBarActiveBackgroundColor: 'FFC1C8'
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
    "FonteRegular": AtkinsonHyperlegible_400Regular,
    "FonteBold": AtkinsonHyperlegible_700Bold
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
