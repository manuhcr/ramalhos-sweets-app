import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
const [fontsLoaded] = useFonts({
    AtkinsonHyperlegible_400Regular,
});

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
        textAlign: 'left',
        fontFamily: 'AtkinsonHyperlegible_400Regular',
        fontSize: 18,
    }
});