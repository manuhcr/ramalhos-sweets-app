import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";

export default function EsqueciSenhaForm({ setIsEsqueci }) {
    const [email, setEmail] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Recuperar senha</Text>
            <View style={styles.linha} />

            <Text style={{ color: '#D67274', marginBottom: 20 , fontFamily: 'MaliRegular' }}>
                Digite seu e-mail para receber as instruções.
            </Text>

            <TextInput
                placeholder="E-mail cadastrado"
                placeholderTextColor="#d67274"
                style={styles.input}
                onChangeText={setEmail}
                value={email}
            />

            <TouchableOpacity style={styles.botao} onPress={() => console.log('Reset enviado')}>
                <Text style={styles.textoBotao}>Enviar e-mail</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => setIsEsqueci(false)}>
                <Text style={styles.link}>
                    Voltar para o login
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 30,
        marginTop: 160,
        flex: 1
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
    botao: {
        backgroundColor: '#D67274',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center'
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'MaliBold'
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        fontFamily: 'MaliRegular'
    },


    link: {
        textAlign: 'center',
        marginTop: 25,
        color: '#D67274',
        fontFamily: 'MaliBold'
    }
});
