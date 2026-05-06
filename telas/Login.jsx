import { StyleSheet, View, ScrollView, Animated, Easing, TouchableHighlight, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useEffect, useRef, useState } from 'react';
import LoginForm from '../components/LoginForm';
import CadastroForm from '../components/CadastroForm'
export default function Login() {
    const translateY = useRef(new Animated.Value(-350)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.4)).current;
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        Animated.parallel([

            // CALDA SUAVE (SEM QUIQUE)
            Animated.timing(translateY, {
                toValue: 0,
                duration: 1200,
                easing: Easing.bezier(0.22, 1, 0.36, 1),
                useNativeDriver: true,
            }),

            // LOGO ENTRANDO
            Animated.sequence([
                Animated.delay(700),
                Animated.parallel([
                    Animated.timing(logoOpacity, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                    Animated.timing(logoScale, {
                        toValue: 1,
                        duration: 400,
                        easing: Easing.bezier(0.22, 1, 0.36, 1),
                        useNativeDriver: true,
                    }),
                ])
            ])

        ]).start();
    }, []);

    return (
        <ScrollView style={styles.content}>

            <Animated.View
                style={[
                    styles.caldaContainer,
                    { transform: [{ translateY }] }
                ]}
            ><View style={styles.caldaBackground} />
                <Svg
                    width="100%"
                    height={160}
                    viewBox="0 0 1440 320"
                    style={styles.svg}
                >
                    <Path
                        fill="#A26F55"
                        d="M0,288L30,266.7C60,245,120,203,180,202.7C240,203,300,245,360,266.7C420,288,480,288,540,266.7C600,245,660,203,720,208C780,213,840,267,900,288C960,309,1020,299,1080,277.3C1140,256,1200,224,1260,224C1320,224,1380,256,1410,272L1440,288L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z" />
                </Svg>

                <Animated.Image
                    source={require('../assets/logo.png')}
                    style={[
                        styles.logo,
                        {
                            opacity: logoOpacity,
                            transform: [{ scale: logoScale }]
                        }
                    ]}
                    resizeMode="contain"
                />

            </Animated.View>
            <View style={[styles.innerContent]}>
                {isLogin ? (
                    <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />
                ) : (
                    <CadastroForm isLogin={isLogin} setIsLogin={setIsLogin} />
                )}
            </View>

        </ScrollView >
    );
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff1f1',
    },
    caldaContainer: {
        height: 450,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },

    },
    caldaBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#A26F55',
        height: 350
    },
    svg: {
        position: 'absolute',
        bottom: 0,
    },
    logo: {
        position: 'absolute',
        top: 60, // ajusta altura
        alignSelf: 'center',
        width: 250,
        height: 250,
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