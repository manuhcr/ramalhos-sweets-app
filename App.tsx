import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>

      {/* Parte de cima (Rosa) */}
      <View style={styles.top}>
        {/* O SVG posicionado na base do View rosa */}
        <View style={styles.svgContainer}>
          <Svg height="400" width={width} viewBox="0 0 1500 500">
            <Path
              fill="#A86B49" // Cor do fundo (marrom) para fazer o recorte
              fillOpacity="1"
              d="M0,128L17.1,154.7C34.3,181,69,235,103,218.7C137.1,203,171,117,206,96C240,75,274,117,309,138.7C342.9,160,377,160,411,181.3C445.7,203,480,245,514,266.7C548.6,288,583,288,617,261.3C651.4,235,686,181,720,186.7C754.3,192,789,256,823,245.3C857.1,235,891,149,926,144C960,139,994,213,1029,202.7C1062.9,192,1097,96,1131,96C1165.7,96,1200,192,1234,202.7C1268.6,213,1303,139,1337,90.7C1371.4,43,1406,21,1423,10.7L1440,0L1440,0L1422.9,0C1405.7,0,1371,0,1337,0C1302.9,0,1269,0,1234,0C1200,0,1166,0,1131,0C1097.1,0,1063,0,1029,0C994.3,0,960,0,926,0C891.4,0,857,0,823,0C788.6,0,754,0,720,0C685.7,0,651,0,617,0C582.9,0,549,0,514,0C480,0,446,0,411,0C377.1,0,343,0,309,0C274.3,0,240,0,206,0C171.4,0,137,0,103,0C68.6,0,34,0,17,0L0,0Z"
            />
          </Svg>
        </View>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={styles.title}>Sign in</Text>

        <TextInput placeholder="Email" style={styles.input} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A86B49',
  },
  top: {
    height: 250,
    backgroundColor: '#FFC0C7',
    // Removido os borderRadios antigos para a onda aparecer
  },
  svgContainer: {
    position: 'absolute',
    bottom: -1, // Cola o SVG na base do rosa
    width: '100%',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -20, // Ajuste esse valor para subir/descer o card sobre a onda
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#F58C8C',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
