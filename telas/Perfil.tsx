import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native';


export default function Perfil() {


    const player = useVideoPlayer(
        "https://www.pexels.com/pt-br/download/video/8870910/",
        player => {
            player.loop = true;
            player.play();
        }
    );

    const destaques = [
        {
            nome: "Bolo Red Velvet com cream cheese",
            preco: "R$ 64,90",
            img: "pedaco-de-bolo.png"
        },
        {
            nome: "Brownie recheado (Nutella, doce de leite, Oreo)",
            preco: "R$ 9,90",
            img: "chocolate.png"
        },
        {
            nome: "Macarons coloridos",
            preco: "R$ 5,50",
            img: "doces.png"
        }
    ];
    const imagens = {
        "pedaco-de-bolo.png": require('../assets/doceria.webp'),
        "chocolate.png": require('../assets/doceria.webp'),
        "doces.png": require('../assets/doceria.webp'),
    };
    return (

        <LinearGradient
            colors={['#FFF5F7', '#FFE4E8']}
            style={{ flex: 1 }}
        >


            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.header}>
                    <Text style={styles.greeting}>Olá, { }</Text>
                </View>

                <View style={styles.search}>
                    <Text>🔍</Text>  <TextInput placeholder=' Buscar doces...' style={{ color: '#999' }}></TextInput>
                </View>

                <Text style={styles.section}>Categorias</Text>

                <View style={styles.categories}>
                    <View style={styles.cat}><Text>🍰</Text><Text>Bolos</Text></View>
                    <View style={styles.cat}><Text>🍫</Text><Text>Choco</Text></View>
                    <View style={styles.cat}><Text>🍓</Text><Text>Doces</Text></View>
                </View>
                <FlatList
                    data={destaques}
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    renderItem={({ item }) => (
                        <View style={[styles.product, { width: 160 }]}>
                            <Image source={imagens[item.img]} style={styles.productImg} />
                            <Text>{item.nome}</Text>
                        </View>
                    )}
                />
                <Text style={styles.section}>Destaques</Text>

                <FlatList
                    data={destaques}
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    renderItem={({ item }) => (
                        <View style={[styles.product, { width: 160 }]}>
                            <Image source={imagens[item.img]} style={styles.productImg} />
                            <Text>{item.nome}</Text>
                        </View>
                    )}
                />


                <StatusBar style="auto" />

            </ScrollView>

        </LinearGradient>

    );
}
const styles = StyleSheet.create({

    content: {
        padding: 20,

    },

    header: {
        marginTop: 40,
        marginBottom: 20,
    },

    greeting: {
        fontSize: 30,
        color: '#A25F3C',
        fontFamily: 'FonteRegular',
    },

    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#D67274',
    },

    search: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 20,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row'
    },

    section: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#5A3E36'
    },

    categories: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    cat: {
        backgroundColor: '#FFFAF1',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        width: '30%',
    },

    cards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    product: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        width: '40%',
    },

    productImg: {
        width: '100%',
        height: 60,
        borderRadius: 10,
    },

    productName: {
        marginTop: 8,
        fontWeight: 'bold',
    },

    price: {
        color: '#D67274',
        marginTop: 4,
    }

});