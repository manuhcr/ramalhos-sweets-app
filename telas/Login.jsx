
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function Login() {
    return (
        // Removi o padding do ScrollView para a calda encostar nas bordas
        <ScrollView style={styles.content}>

            {/* A calda agora tem um container próprio para não ser afetada pelo padding do conteúdo */}
            <View style={styles.caldaContainer}>
                <Svg
                    viewBox="0 0 1440 600" // Ajustado para bater com o final do caminho 'd'
                    height="180"
                    width="100%"

                >
                    <Path
                        fill="#A26F55"
                        d="M0,64L15,58.7C30,53,60,43,90,69.3C120,96,150,160,180,192C210,224,240,224,270,197.3C300,171,330,117,360,117.3C390,117,420,171,450,213.3C480,256,510,288,540,272C570,256,600,192,630,154.7C660,117,690,107,720,101.3C750,96,780,96,810,117.3C840,139,870,181,900,218.7C930,256,960,288,990,272C1020,256,1050,192,1080,160C1110,128,1140,128,1170,144C1200,160,1230,192,1260,170.7C1290,149,1320,75,1350,42.7C1380,11,1410,21,1425,26.7L1440,32L1440,0L1425,0C1410,0,1380,0,1350,0C1320,0,1290,0,1260,0C1230,0,1200,0,1170,0C1140,0,1110,0,1080,0C1050,0,1020,0,990,0C960,0,930,0,900,0C870,0,840,0,810,0C780,0,750,0,720,0C690,0,660,0,630,0C600,0,570,0,540,0C510,0,480,0,450,0C420,0,390,0,360,0C330,0,300,0,270,0C240,0,210,0,180,0C150,0,120,0,90,0C60,0,30,0,15,0L0,0Z"
                    />
                </Svg>
            </View>

            {/* Todo o resto do seu conteúdo dentro de uma View com padding */}
            <View style={styles.innerContent}>
        
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff1f1',
    },
    caldaContainer: {
        // Faz a calda ignorar o fluxo e ficar no topo
        marginTop: 0, // Remove frestas
    },
    innerContent: {
        padding: 20, // O padding agora fica aqui, e não no ScrollView
        marginTop: -180, // Ajuste isso para o texto subir "para dentro" da calda se quiser
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },

    image: {
        width: '100%',
        height: 300,
        borderRadius: 20,
        marginBottom: 20,
    },

    text: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 30,
        color: '#3d2b21'
    },
    video: {
        width: '68%',
        height: 400,
        borderRadius: 20,
        marginBottom: 40,
        alignSelf: 'center',
        backgroundColor: '#000'
    },

    videoContainer: {
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    videoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },

});