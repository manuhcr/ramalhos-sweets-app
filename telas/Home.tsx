import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from 'react-native';
import React, {
    useState,
    useCallback
} from 'react';
import Svg, { Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Home() {

    const [user, setUser] = useState(null)
    const [favoritos, setFavoritos] = useState<any[]>([]);


    const carregarDados = async () => {

        // USER

        const savedUser =
            await AsyncStorage.getItem("usuario");

        if (savedUser) {

            setUser(JSON.parse(savedUser));

        }

        // FAVORITOS

        const favoritosSalvos =
            await AsyncStorage.getItem('@favoritos');

        if (favoritosSalvos) {

            setFavoritos(
                JSON.parse(favoritosSalvos)
            );

        }

    };

    useFocusEffect(

        useCallback(() => {

            carregarDados();

        }, [])

    );
    const toggleFavorito = async (
        item: any
    ) => {

        try {

            const data =
                await AsyncStorage.getItem('@favoritos');

            let favoritosSalvos =
                data ? JSON.parse(data) : [];

            const existe =
                favoritosSalvos.some(
                    (fav: any) =>
                        fav.nome === item.nome
                );

            let novosFavoritos;

            // REMOVE

            if (existe) {

                novosFavoritos =
                    favoritosSalvos.filter(
                        (fav: any) =>
                            fav.nome !== item.nome
                    );

            }

            // ADICIONA

            else {

                novosFavoritos = [
                    ...favoritosSalvos,
                    item
                ];

            }

            // SALVA

            await AsyncStorage.setItem(
                '@favoritos',
                JSON.stringify(novosFavoritos)
            );

            // ATUALIZA

            setFavoritos(novosFavoritos);

        }

        catch (error) {

            console.log(error);

        }
    }
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

            {
                nome: "Bolo de chocolate com cobertura cremosa",
                preco: 49.90,
                descricao: "(1kg)",
                img: require("../assets/bolochoco.png")
            },

            {
                nome: "Bolo de morango com chantilly",
                preco: 54.90,
                descricao: "(1kg)",
                img: require("../assets/bolomorango.png")
            },

            {
                nome: "Bolo de cenoura com calda de chocolate",
                preco: 44.90,
                descricao: "(1kg)"
            },

            {
                nome: "Bolo Red Velvet com cream cheese",
                preco: 64.90,
                descricao: "(1kg)",
                img: require("../assets/boloredvelvet.png")
            },

            {
                nome: "Bolo de ninho com morango",
                preco: 59.90,
                descricao: "(1kg)"
            },

            {
                nome: "Bolo de limão siciliano",
                preco: 52.90,
                descricao: "(1kg)"
            },

            {
                nome: "Bolo prestígio",
                preco: 56.90,
                descricao: "(1kg)",
                img: require("../assets/boloprestigio.png")
            },

            {
                nome: "Bolo de doce de leite",
                preco: 58.90,
                descricao: "(1kg)"
            },

            {
                nome: "Cheesecake de frutas vermelhas",
                preco: 54.90,
                descricao: "(1kg)"
            }
        ],

        doces: [

            {
                nome: "Brigadeiro gourmet",
                preco: 3.50,
                descricao: "(unidade)"
            },

            {
                nome: "Beijinho de coco",
                preco: 3.00,
                descricao: "(unidade)"
            },

            {
                nome: "Cajuzinho",
                preco: 3.00,
                descricao: "(unidade)"
            },

            {
                nome: "Bicho de pé",
                preco: 3.50,
                descricao: "(unidade)"
            },

            {
                nome: "Palha italiana",
                preco: 5.00,
                descricao: "(unidade)"
            },

            {
                nome: "Quindim",
                preco: 6.50,
                descricao: "(unidade)"
            },

            {
                nome: "Cocada",
                preco: 4.50,
                descricao: "(unidade)"
            },

            {
                nome: "Canjica doce",
                preco: 9.90,
                descricao: "(250g)"
            }
        ],

        colddesserts: [

            {
                nome: "Pavê de chocolate",
                preco: 49.90,
                descricao: "(1kg)"
            },

            {
                nome: "Mousse de maracujá",
                preco: 7.90,
                descricao: "(taça)"
            },

            {
                nome: "Mousse de chocolate com raspas",
                preco: 8.90,
                descricao: "(taça)"
            },

            {
                nome: "Torta gelada de morango",
                preco: 54.90,
                descricao: "(1kg)"
            },

            {
                nome: "Sorvete artesanal",
                preco: 12.90,
                descricao: "(500ml)"
            },

            {
                nome: "Geladinho gourmet",
                preco: 5.00,
                descricao: "(unidade)"
            }
        ],

        chocoandbrownie: [

            {
                nome: "Brownie de chocolate",
                preco: 7.90,
                descricao: "(unidade)"
            },

            {
                nome: "Brownie recheado",
                preco: 9.90,
                descricao: "(unidade)"
            },

            {
                nome: "Cookie recheado",
                preco: 6.50,
                descricao: "(unidade)"
            },

            {
                nome: "Trufas de chocolate",
                preco: 4.90,
                descricao: "(unidade)"
            },

            {
                nome: "Barrinha de chocolate caseira",
                preco: 7.50,
                descricao: "(unidade)"
            }
        ],

        especiais: [

            {
                nome: "Macarons coloridos",
                preco: 5.50,
                descricao: "(unidade)"
            },

            {
                nome: "Churros",
                preco: 7.90,
                descricao: "(unidade)"
            },

            {
                nome: "Rabanada açucarada",
                preco: 6.50,
                descricao: "(unidade)"
            },

            {
                nome: "Waffle com frutas",
                preco: 14.90,
                descricao: "(prato)"
            },

            {
                nome: "Donuts",
                preco: 8.90,
                descricao: "(unidade)"
            }
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
                    <Text style={styles.greeting}>Olá, {user?.nome || 'visitante'}</Text>
                </View>

                <View style={styles.search}>
                    <TextInput
                        placeholder=" Buscar doces..."
                        placeholderTextColor="#C89A9A"
                        style={{
                            color: '#5A3E36',
                            backgroundColor: '#f1dede8f',
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
                    <FlatList
                        data={categorias}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingRight: 20,
                        }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.cat,
                                    categoriaSelecionada === item.id &&
                                    styles.catSelected
                                ]}
                                onPress={() =>
                                    setCategoriaSelecionada(item.id)
                                }
                            >
                                <Image
                                    source={item.img}
                                    style={styles.catImg}
                                />
                            </TouchableOpacity>
                        )}
                    />
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
                            <View style={styles.favoriteRow}>

                                <TouchableOpacity
                                    onPress={() => toggleFavorito(item)}
                                >

                                    <Ionicons
                                        name={favoritos.some(fav => fav.nome === item.nome) ? 'heart' : 'heart-outline'}
                                        size={20}
                                        color="#D67274"
                                    />

                                </TouchableOpacity>

                            </View>
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

                                R$ {item.preco
                                    .toFixed(2)
                                    .replace('.', ',')}

                                <Text style={styles.desc}>
                                    {' '}{item.descricao}
                                </Text>

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
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 20,
        color: '#5e382e',
        fontFamily: 'MysteryRegular',
    },

    categories: {
        marginBottom: 20,
    },
    cat: {
        width: 70,
        height: 70,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
        backgroundColor: 'hsla(36, 100%, 86%, 0.36)',
        borderWidth: 1.5,
        borderColor: '#A66C4D',
        marginBottom: 40,
    },
    catSelected: {
        backgroundColor: '#D67274',
        borderColor: '#D67274',
    },

    catImg: {
        margin: 10,
        width: 45,
        height: 45,
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
        position: 'relative',
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
        color: '#c55d5f',
        marginTop: 4,
    },
    favoriteRow: {

        position: 'absolute',

        top: 10,
        right: 10,

        width: 32,
        height: 32,

        borderRadius: 20,

        backgroundColor: '#ffffffd9',

        justifyContent: 'center',
        alignItems: 'center',

        zIndex: 2,
    },
});