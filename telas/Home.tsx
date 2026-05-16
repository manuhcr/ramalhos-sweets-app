import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from 'react-native';
import { useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';




export default function Home() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const carregarUser = async () => {
            try {
                const savedUser = await AsyncStorage.getItem("usuario")

                if (savedUser) {
                    const dadosUsuario =
                        JSON.parse(savedUser);

                    setUser(dadosUsuario);
                }
            } catch (error) {

                console.log("Erro ao carregar usuário:", error);

            }

        };

        carregarUser();

    }, []);


    type Categoria = keyof typeof cardapio | 'todos';
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria>('todos');


    const dia = new Date().getDay();

    const banners = [
        require('../assets/cupons/domingo.png'),
        require('../assets/cupons/segunda.png'),
        require('../assets/cupons/terca.png'),
        require('../assets/cupons/quarta.png'),
        require('../assets/cupons/quinta.png'),
        require('../assets/cupons/sexta.png'),
        require('../assets/cupons/sabado.png'),
    ];


    const cardapio = {
        bolos: [
            { nome: "Bolo de chocolate com cobertura cremosa", preco: "R$ 49,90 (1kg)", img: require("../assets/bolochoco.png") },
            { nome: "Bolo de morango com chantilly", preco: "R$ 54,90 (1kg)", img: require("../assets/bolomorango.png") },
            { nome: "Bolo de cenoura com calda de chocolate", preco: "R$ 44,90 (1kg)" },
            { nome: "Bolo Red Velvet com cream cheese", preco: "R$ 64,90 (1kg)", img: require("../assets/boloredvelvet.png") },
            { nome: "Bolo de ninho com morango", preco: "R$ 59,90 (1kg)" },
            { nome: "Bolo de limão siciliano", preco: "R$ 52,90 (1kg)" },
            { nome: "Bolo prestígio", preco: "R$ 56,90 (1kg)", img: require("../assets/boloprestigio.png") },
            { nome: "Bolo de doce de leite", preco: "R$ 58,90 (1kg)" },
            { nome: "Chessecake de frutas vermelhas", preco: "R$ 54,90 (1kg)" }
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
    const [pesquisa, setPesquisa] = useState('');

    const allItems = [
        ...cardapio.bolos,
        ...cardapio.doces,
        ...cardapio.colddesserts,
        ...cardapio.chocoandbrownie,
        ...cardapio.especiais,
    ];

    const filtros = allItems.filter(item =>
        item.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );
    const categorias: {
        id: Categoria;
        img: any;
    }[] = [
            {
                id: "bolos",
                img: require('../assets/bolos.png'),
            },

            {
                id: "doces",
                img: require('../assets/docesbrasileiros.png'),
            },

            {
                id: "colddesserts",
                img: require('../assets/sobremesasgeladas.png'),
            },

            {
                id: "chocoandbrownie",
                img: require('../assets/chocoandbrownies.png'),
            },

            {
                id: "especiais",
                img: require('../assets/docesespeciais.png'),
            }
        ];

    const destaques = categorias.map((categoria) => ({
        ...categoria,
        quantidade: categoria.id === 'todos' ? allItems.length : cardapio[categoria.id].length
    }));

    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (


        <LinearGradient
            colors={['#d88f8c6c', '#FFF5F7', '#ffd8d8']}
            style={{ flex: 1 }}
        >

            <View style={styles.caldaContainer}>

                <View style={styles.caldaBackground} />

                <Svg
                    width="100%"
                    height={160}
                    viewBox="0 0 1440 320"
                    style={styles.svg}
                >
                    <Path
                        fill="#fdd5d5"
                        d="M0,288L30,266.7C60,245,120,203,180,202.7C240,203,300,245,360,266.7C420,288,480,288,540,266.7C600,245,660,203,720,208C780,213,840,267,900,288C960,309,1020,299,1080,277.3C1140,256,1200,224,1260,224C1320,224,1380,256,1410,272L1440,288L1440,0L0,0Z"
                    />
                </Svg>

            </View>

            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.header}>
                    <Text style={styles.greeting}>Olá, {user?.nome}</Text>
                </View>

                <View style={styles.search}>
                    <TextInput
                        placeholder=" Buscar doces..."
                        placeholderTextColor="#C89A9A"
                        style={{
                            color: '#5A3E36',
                            backgroundColor: '#f1dede63',
                            borderRadius: 8,
                            fontSize: 15,
                            flex: 1,

                        }}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        value={pesquisa}
                        onChangeText={setPesquisa}



                    />

                </View>

                <View style={styles.bannerContainer}>
                    <Image
                        source={banners[dia]}
                        style={styles.banner}
                        resizeMode="cover"
                    />
                </View>

                <View style={{ marginTop: 60 }}>
                    <Text style={styles.section}>Categorias</Text>
                    <View style={styles.categories}>
                        {categorias.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.cat,
                                    categoriaSelecionada === item.id && styles.catSelected
                                ]}
                                onPress={() => setCategoriaSelecionada(item.id)}
                            >
                                <Image
                                    source={item.img}
                                    style={styles.catImg}
                                />

                            </TouchableOpacity>

                        ))}
                    </View>
                </View>




                <FlatList
                    data={
                        pesquisa
                            ? filtros
                            : categoriaSelecionada === 'todos'
                                ? allItems
                                : cardapio[categoriaSelecionada]
                    }
                    numColumns={2}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        marginBottom: 15,
                    }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{
                        paddingBottom: 30,
                    }}
                    renderItem={({ item }) => (
                        <View style={styles.product}>

                            {item.img && (
                                <Image
                                    source={item.img}
                                    style={styles.productImg}
                                />
                            )}

                            <Text style={styles.productName}>
                                {item.nome}
                            </Text>

                            <Text style={styles.price}>
                                {item.preco}
                            </Text>

                        </View>
                    )}
                />
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
        paddingTop: 8
    },
    caldaContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 465,
    },

    caldaBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#fdd5d5',
        height: 350,
    },

    svg: {
        position: 'absolute',
        bottom: 0,
    },
    header: {
        marginTop: 50,
        marginBottom: 20,
        zIndex: 2,
    },

    greeting: {
        fontSize: 40,
        color: '#A25F3C',
        fontFamily: 'MysteryRegular'
    },

    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#D67274',
    },

    search: {
        backgroundColor: '#fff',
        padding: 6,
        borderWidth: 0.5,
        borderColor: '#5c2e16',
        borderRadius: 20,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row'
    },
    searchFocused: {
        borderColor: '#bd4749',
        borderWidth: 1,
    },

    bannerContainer: {
        alignItems: 'center',
    },

    banner: {
        width: '100%',
        height: undefined,
        aspectRatio: 2.6,
        borderRadius: 18,
    },

    section: {
        fontSize: 21,
        fontWeight: '700',
        marginBottom: 14,
        marginTop: 10,
        color: '#5e382e',
        fontFamily: 'MisteryRegular',
    },

    categories: {
        justifyContent: 'space-between',
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',

    },

    cat: {
        borderColor: '#A66C4D',
        borderWidth: 1.5,
        borderRadius: 40,
        alignItems: 'center',
        width: 70,
        height: 70
    },

    catSelected: {
        backgroundColor: '#D67274',
        borderColor: '#D67274',
    },

    catImg: {
        margin: 10,
        width: 50,
        height: 50,
        resizeMode: 'cover'
    },

    cards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },


    product: {
        backgroundColor: '#FFF9F7',
        borderRadius: 20,
        padding: 14,
        width: '48%',
    },

    productImg: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },

    productName: {
        marginTop: 8,
        fontWeight: '600',
        color: '#5A3E36',
        fontSize: 15,
    },

    price: {
        color: '#D67274',
        marginTop: 4,
    }

});