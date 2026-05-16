import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useEffect, useState } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function Favoritos() {

    const navigation = useNavigation<any>();

    // ========================================
    // STATE
    // ========================================

    const [favoritos, setFavoritos] =
        useState<any[]>([]);

    // ========================================
    // CARREGAR FAVORITOS
    // ========================================

    async function carregarFavoritos() {

        try {

            const data =
                await AsyncStorage.getItem('@favoritos');

            if (data) {

                setFavoritos(JSON.parse(data));

            }

            else {

                setFavoritos([]);

            }

        }

        catch (error) {

            console.log(error);

        }
    }

    // ========================================
    // REMOVER FAVORITO
    // ========================================

    async function removerFavorito(
        nome: string
    ) {

        try {

            const novosFavoritos =
                favoritos.filter(
                    item => item.nome !== nome
                );

            setFavoritos(novosFavoritos);

            await AsyncStorage.setItem(
                '@favoritos',
                JSON.stringify(novosFavoritos)
            );

        }

        catch (error) {

            console.log(error);

        }
    }

    // ========================================
    // USE EFFECT
    // ========================================

    useFocusEffect(

        React.useCallback(() => {

            carregarFavoritos();

        }, [])

    );

    // ========================================
    // RENDER
    // ========================================

    return (

        <View style={styles.container}>

            {/* ========================================
            HEADER
            ======================================== */}

            <View style={styles.header}>

                <Text style={styles.title}>
                    Meus doces favoritos
                </Text>

                <Text style={styles.subtitle}>
                    Total de {favoritos.length} doces salvos
                </Text>

            </View>

            {/* ========================================
            VAZIO
            ======================================== */}

            {favoritos.length === 0 ? (

                <View style={styles.emptyContainer}>

                    <View style={styles.emptyCircle}>

                        <Ionicons
                            name="heart-outline"
                            size={90}
                            color="#D98A97"
                        />

                    </View>

                    <Text style={styles.emptyTitle}>
                        Nenhum favorito ainda
                    </Text>

                    <Text style={styles.emptyText}>
                        Salve seus doces favoritos
                        para encontrar depois ✨
                    </Text>

                    <TouchableOpacity
                        style={styles.shopBtn}
                        onPress={() =>
                            navigation.navigate('Home', {
                                screen: 'Home',
                            })
                        }
                    >

                        <Text style={styles.shopBtnText}>
                            Explorar cardápio
                        </Text>

                    </TouchableOpacity>

                </View>

            ) : (

                // ========================================
                // CHEIO
                // ========================================

                <FlatList

                    data={favoritos}

                    numColumns={2}

                    keyExtractor={(item, index) =>
                        index.toString()
                    }

                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        marginBottom: 18,
                    }}

                    showsVerticalScrollIndicator={false}

                    contentContainerStyle={{
                        paddingBottom: 140,
                    }}

                    renderItem={({ item }) => (

                        <View style={styles.card}>

                            {/* CORAÇÃO */}

                            <TouchableOpacity
                                style={styles.heartBtn}
                                onPress={() =>
                                    removerFavorito(item.nome)
                                }
                            >

                                <Ionicons
                                    name="heart"
                                    size={18}
                                    color="#E68A9B"
                                />

                            </TouchableOpacity>

                            {/* IMAGEM */}

                            {item.img && (

                                <Image
                                    source={item.img}
                                    style={styles.image}
                                />

                            )}

                            {/* NOME */}

                            <Text style={styles.name}>
                                {item.nome}
                            </Text>

                            {/* PREÇO */}

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

            )}

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFF8F6',
        paddingHorizontal: 20,
        paddingTop: 60,
    },

    // ========================================
    // HEADER
    // ========================================

    header: {
        marginBottom: 25,
    },

    title: {
        fontSize: 34,
        color: '#4B2E2B',
        fontFamily: 'MaliBold',
    },

    subtitle: {
        fontSize: 16,
        color: '#A38A82',
        marginTop: 4,
        fontFamily: 'MaliRegular',
    },



    // ========================================
    // CARD
    // ========================================
    card: {

        width: '47%',

        minHeight: 240,

        backgroundColor: '#FFFDFD',

        borderRadius: 28,

        padding: 14,

        borderWidth: 1,
        borderColor: '#F5E7E2',

        shadowColor: '#000',

        shadowOpacity: 0.04,

        shadowRadius: 12,

        elevation: 2,
    },

    heartBtn: {

        position: 'absolute',

        top: 12,
        right: 12,

        width: 30,
        height: 30,

        borderRadius: 20,

        backgroundColor: '#fff',

        justifyContent: 'center',
        alignItems: 'center',

        zIndex: 2,
    },

    image: {
        width: '100%',
        height: 120,
        resizeMode: 'contain',
        marginTop: 15,
    },

    name: {
        marginTop: 18,
        fontSize: 16,
        color: '#4B2E2B',
        lineHeight: 22,
        fontFamily: 'MaliBold',
    },

    price: {
        marginTop: 8,
        fontSize: 16,
        color: '#D67274',
        fontFamily: 'MaliBold',
    },

    desc: {
        color: '#9A8578',
        fontSize: 12,
        fontFamily: 'MaliRegular',
    },

    // ========================================
    // EMPTY
    // ========================================

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 35,
        marginTop: -60,
    },

    emptyCircle: {

        width: 190,
        height: 190,

        borderRadius: 100,

        backgroundColor: 'rgba(255,255,255,0.7)',

        justifyContent: 'center',
        alignItems: 'center',

        marginBottom: 35,

        shadowColor: '#000',

        shadowOpacity: 0.04,

        shadowRadius: 18,

        elevation: 2,
    },

    emptyTitle: {
        fontSize: 34,
        color: '#4B2E2B',
        textAlign: 'center',
        fontFamily: 'MaliBold',
    },

    emptyText: {
        fontSize: 18,
        color: '#9A8578',
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 28,
        fontFamily: 'MaliRegular',
    },

    shopBtn: {

        marginTop: 40,

        backgroundColor: '#B57B5B',

        paddingHorizontal: 35,

        paddingVertical: 18,

        borderRadius: 20,
    },

    shopBtnText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'MaliBold',
    },

});