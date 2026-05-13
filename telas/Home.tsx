import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { useState } from 'react';



export default function Home() {

    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null)


    const player = useVideoPlayer(
        "https://www.pexels.com/pt-br/download/video/8870910/",
        player => {
            player.loop = true;
            player.play();
        }
    );
    const categorias = [
        {
            id: "bolos",
            img: require('../assets/pedaco-de-bolo.png'),
        },

        {
            id: "doces",
            img: require('../assets/brigadeiro.png'),
        },

        {
            id: "colddesserts",
            img: require('../assets/sorvete.png'),
        },

        {
            id: "chocoandbrownie",
            img: require('../assets/chocolate.png'),
        },

        {
            id: "especiais",
            img: require('../assets/doces.png'),
        }
    ];

    const cardapio = {
        bolos: [
            { nome: "Bolo de chocolate com cobertura cremosa", preco: "R$ 49,90 (1kg)" },
            { nome: "Bolo de morango com chantilly", preco: "R$ 54,90 (1kg)" },
            { nome: "Bolo de cenoura com calda de chocolate", preco: "R$ 44,90 (1kg)" },
            { nome: "Bolo Red Velvet com cream cheese", preco: "R$ 64,90 (1kg)" },
            { nome: "Cheesecake de frutas vermelhas", preco: "R$ 69,90 (1kg)" },
            { nome: "Torta holandesa", preco: "R$ 59,90 (1kg)" },
            { nome: "Torta de limão com merengue", preco: "R$ 49,90 (1kg)" },
            { nome: "Torta de maçã caramelizada", preco: "R$ 55,90 (1kg)" }
        ],

        doces: [
            { nome: "Brigadeiro gourmet", preco: "R$ 3,50 (unidade)" },
            { nome: "Beijinho de coco", preco: "R$ 3,00 (unidade)" },
            { nome: "Cajuzinho", preco: "R$ 3,00 (unidade)" },
            { nome: "Bicho de pé", preco: "R$ 3,50 (unidade)" },
            { nome: "Palha italiana", preco: "R$ 5,00 (unidade)" },
            { nome: "Quindim", preco: "R$ 6,50 (unidade)" },
            { nome: "Cocada", preco: "R$ 4,50 (unidade)" },
            { nome: "Canjica doce", preco: "R$ 9,90 (250g)" }
        ],

        colddesserts: [
            { nome: "Pavê de chocolate", preco: "R$ 49,90 (1kg)" },
            { nome: "Mousse de maracujá", preco: "R$ 7,90 (taça)" },
            { nome: "Mousse de chocolate com raspas", preco: "R$ 8,90 (taça)" },
            { nome: "Torta gelada de morango", preco: "R$ 54,90 (1kg)" },
            { nome: "Sorvete artesanal", preco: "R$ 12,90 (500ml)" },
            { nome: "Geladinho gourmet", preco: "R$ 5,00 (unidade)" }
        ],

        chocoandbrownie: [
            { nome: "Brownie de chocolate", preco: "R$ 7,90 (unidade)" },
            { nome: "Brownie recheado", preco: "R$ 9,90 (unidade)" },
            { nome: "Cookie recheado", preco: "R$ 6,50 (unidade)" },
            { nome: "Trufas de chocolate", preco: "R$ 4,90 (unidade)" },
            { nome: "Barrinha de chocolate caseira", preco: "R$ 7,50 (unidade)" }
        ],

        especiais: [
            { nome: "Macarons coloridos", preco: "R$ 5,50 (unidade)" },
            { nome: "Churros", preco: "R$ 7,90 (unidade)" },
            { nome: "Rabanada açucarada", preco: "R$ 6,50 (unidade)" },
            { nome: "Waffle com frutas", preco: "R$ 14,90 (prato)" },
            { nome: "Donuts", preco: "R$ 8,90 (unidade)" }
        ]
    };
    const destaques = categorias.map((categoria) => ({
        ...categoria,
        quantidade: cardapio[categoria.id].length
    }));
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
                     <TextInput placeholder=' Buscar doces...' style={{ color: '#999' }}></TextInput>
                </View>

                <Text style={styles.section}>Categorias</Text>

                <View style={styles.categories}>
                    {categorias.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.cat}
                            onPress={() => setCategoriaSelecionada(item.id)}
                        >
                            <Image
                                source={item.img}
                                style={{ width: 20, height: 20 }}
                            />
                        
                        </TouchableOpacity>

                    ))}
                </View>
                <Text>{categoriaSelecionada}</Text>
                {categoriaSelecionada && (
                    <FlatList
                        data={cardapio[categoriaSelecionada]}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={[styles.product, { width: 180 }]}>
                                <Image
                                    source={item.img}
                                    style={styles.productImg}
                                />

                                <Text style={styles.productName}>
                                    {item.titulo}
                                </Text>

                                <Text style={styles.price}>
                                    {item.quantidade} opções
                                </Text>
                            </View>
                        )}
                    />
                )}

                <Text style={styles.section}>Destaques</Text>

                <FlatList
                    data={destaques}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={[styles.product, { width: 180 }]}>
                            <Image
                                source={item.img}
                                style={styles.productImg}
                            />

                            <Text style={styles.price}>
                                {item.quantidade} opções
                            </Text>
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
        backgroundColor: '#fff5e8',
        borderColor: '#A66C4D',
        borderWidth: 1,
        padding: 20,
        borderRadius: 100,
        alignItems: 'center',
        width: 60,
        height: 60
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