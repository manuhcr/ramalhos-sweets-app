import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default function LoginForm({ isLogin, setIsLogin }) {
    return (
        <View>

            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.texto}>Que seja doce!</Text>
                <Text style={styles.linkCenter}>
                    Não tem uma conta? Crie uma!
                </Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    linkCenter: {
        textAlign: 'center',
        color: 'blue',
        marginTop: 500,
    },
    texto: {
        textAlign: 'justify',
        fontFamily: 'FonteRegular',
        color: '#D67274',
        fontSize: 32,
        top: 200,
        position: 'relative'
    }
});