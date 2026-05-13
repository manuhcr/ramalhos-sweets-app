import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
export default function CadastroForm({ isLogin, setIsLogin }) {

    const [criaemail, setCriaEmail] = useState('');
    const [criasenha, setCriaSenha] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const navigation = useNavigation();
    const logar = () => {
        if (criasenha === senha) {
            navigation.navigate('Home');
        } else {
            console.log("Senhas não coincidem");
        }
    };
    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>Comece algo doce!</Text>
            <View style={styles.linha} />

            <TextInput
                placeholder="Digite seu email"
                placeholderTextColor="#d67274"
                style={styles.input}
                onChangeText={setCriaEmail}
                value={criaemail}
            />

            <TextInput
                placeholder="Crie sua senha"
                placeholderTextColor="#D67274"
                style={styles.input}
                value={criasenha}
                onChangeText={setCriaSenha}
                secureTextEntry
            />

            <TextInput
                placeholder="Repita sua nova senha"
                placeholderTextColor="#D67274"
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            <TextInput
                placeholder="Como devemos te chamar?"
                placeholderTextColor="#D67274"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                secureTextEntry
            />


            <TouchableOpacity style={styles.botao} onPress={logar}>
                <Text style={styles.textoBotao}>Criar conta</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.link}>
                    Já tem uma conta? <Text style={styles.linkBold}>Entre!</Text>
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
    texto: {
        textAlign: 'left',
        fontFamily: 'FonteRegular',
        color: '#D67274',
        fontSize: 32,
        top: 200,
        left: 30,
        position: 'relative',
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
        justifyContent: 'center'
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
        marginTop: 160
    },

    titulo: {
        fontSize: 32,
        color: '#D67274',
        fontFamily: "MysteryRegular"

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
        fontFamily: 'MaliRegular',
        elevation: 3,
        shadowColor: '#a76279',
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
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 4,
        fontFamily: 'MysteryRegular'
    },

    textoBotao: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'MaliRegular'
    },

    link: {
        textAlign: 'center',
        marginTop: 25,
        fontSize: 16,
        color: '#D67274',
        fontFamily: 'MaliRegular'
    },
    linkBold: {
        fontFamily: 'MaliBold'
    }
});