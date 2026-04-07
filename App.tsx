import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Adicionado
import Sobre from './telas/Sobre';
import Login from './telas/Login';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  useFonts,
  AtkinsonHyperlegible_400Regular
} from '@expo-google-fonts/atkinson-hyperlegible';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); // Adicionado

// COMPONENTE DAS ABAS (Sem o Login aqui)
function Menu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = 'help-circle';
          if (route.name === "Sobre") {
            iconName = focused ? 'paw' : 'paw-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#A86B49',
        tabBarInactiveBackgroundColor: '#EB8D96'
      })}>
      <Tab.Screen name='Sobre' component={Sobre} />
      <Tab.Screen name='Sobre2' component={Sobre} />
      <Tab.Screen name='Sobre3' component={Sobre} />
    </Tab.Navigator>
  );
}

// COMPONENTE PRINCIPAL (O Stack controla o Login vs Menu)
export default function App() {
  const [fontsLoaded] = useFonts({
    AtkinsonHyperlegible_400Regular,
    AtkinsonHyperlegible_700Bold,
  });
  if (!fontsLoaded) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* A primeira tela da lista é a que abre primeiro (Login) */}
        <Stack.Screen name="Login" component={Login} />

        {/* A tela 'Home' carrega o componente das abas */}
        <Stack.Screen name="Home" component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}