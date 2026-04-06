import { TouchableOpacity } from "react-native";
export default function CadastroForm() {
    return (
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.linkCenter} >
                Já tem uma conta? Entre!
            </Text>
        </TouchableOpacity>
    )
} 