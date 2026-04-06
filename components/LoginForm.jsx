import { TouchableOpacity } from "react-native";
export default function LoginForm() {
    return (
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.linkCenter} >
                Não tem uma conta? Crie uma!
            </Text>
        </TouchableOpacity>
    )
} 