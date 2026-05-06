import { useState } from "react";
import { TextInput, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Checkbox from "expo-checkbox";

import EsqueciSenhaForm from './EsqueceuForm'
import { useNavigation } from "@react-navigation/native";

export default function LoginForm({ isLogin, setIsLogin }) {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [checado, setChecado] = useState(false);

    const logar = () => {
        console.log("Enviado: ", email, senha);
        if (email === "cruzmanoela55@gmail.com" && senha === 'm@nu2CR4') {
            console.log("Logado com sucesso!");
            navigation.navigate('Home')

        } else {
            console.log("Falha no login");

        }
    };
    const [isEsqueci, setIsEsqueci] = useState(false);

    if (isEsqueci) {
        return <EsqueciSenhaForm setIsEsqueci={setIsEsqueci} setIsLogin={setIsLogin} />;
    }
    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>Que seja doce!</Text>
            <View style={styles.linha} />

            <TextInput
                placeholder="Email"
                placeholderTextColor="#d67274"
                style={styles.input}
                onChangeText={setEmail}
                value={email}
            />

            <TextInput
                placeholder="Senha"
                placeholderTextColor="#D67274"
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />

            <View style={styles.row}>
                <View style={styles.remember}>
                    <Checkbox
                        value={checado}
                        onValueChange={setChecado}
                        color={checado ? '#D67274' : undefined}
                    />
                    <Text style={styles.rememberText}>Lembre-me</Text>
                </View>

                <TouchableOpacity onPress={() => setIsEsqueci(true)}>
                    <Text style={styles.forgot}>Esqueceu a senha?</Text>
                </TouchableOpacity>

            </View>

            <TouchableOpacity style={styles.botao} onPress={logar}>
                <Text style={styles.textoBotao}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.link}>
                    Não tem conta? <Text style={{ fontWeight: 'bold' }}>Criar</Text>
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    linkCenter: {
        textAlign: 'center',
        color: 'blue',
        marginTop: 100,

    },
 
    linha: {
        marginTop: 210,
        height: 4,
        width: 150,
        backgroundColor: '#EB8F96',
        marginLeft: 30,
        borderRadius: 20
    },
    campo: {
        marginTop: 30,
        height: 2,
        width: 320,
        backgroundColor: '#A66C4D',
        marginLeft: 30,
        borderRadius: 20
    },
    botao: {
        margin: 35,
        padding: 10,
        backgroundColor: '#EB8F96',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoBotao: {
        textAlign: 'center',
        color: '#FFEAEA',
        fontSize: 16,
        fontFamily: 'MaliBold'
    },
    check: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 20
    },
    forgot: {
        color: '#EB8F96',
        fontSize: 16,
        fontFamily: 'MaliRegular'

    },

    container: {
        justifyContent: 'center',
        paddingHorizontal: 30,
        marginTop: 160,
    },

    titulo: {
        fontSize: 32,
        color: '#D67274',
        fontFamily: 'MysteryRegular'

    },

    linha: {
        width: 140,
        height: 4,
        backgroundColor: '#EB8F96',
        borderRadius: 10,
        marginBottom: 40,
        marginTop: 5
    },

    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 20,

        // sombra (iOS + Android)
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30
    },

    remember: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    rememberText: {
        marginLeft: 8
    },

    forgot: {
        color: '#D67274',
        fontWeight: '500'
    },

    botao: {
        backgroundColor: '#D67274',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 4
    },

    link: {
        textAlign: 'center',
        marginTop: 25,
        color: '#D67274'

    }
});