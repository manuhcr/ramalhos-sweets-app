import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CadastroForm({ isLogin, setIsLogin }) {
    return (
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.linkCenter}>
                Já tem uma conta? Entre!
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    linkCenter: {
        textAlign: 'center',
        color: 'pink',
        marginTop: 500,
    },
});