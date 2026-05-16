import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';

import React, { useState, useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

type CartItem = {
    id: number;
    nome: string;
    preco: number;
    imagem: string;
    quantidade: number;
    img?: any;
};

export default function Shop() {

    const navigation = useNavigation<any>();

    const [cartItems, setCartItems] =
        useState<CartItem[]>([]);


    // CARREGAR CARRINHO

    async function carregarCarrinho() {

        try {

            const data =
                await AsyncStorage.getItem('@cart');

            if (data) {

                setCartItems(JSON.parse(data));

            }

        } catch (error) {

            console.log(error);

        }
    }

    // AUMENTAR

    async function aumentarQuantidade(id: number) {

        const novoCarrinho = cartItems.map(
            item => {

                if (item.id === id) {

                    return {
                        ...item,
                        quantidade: item.quantidade + 1,
                    };

                }

                return item;
            }
        );

        setCartItems(novoCarrinho);

        await AsyncStorage.setItem(
            '@cart',
            JSON.stringify(novoCarrinho)
        );
    }

    // DIMINUIR

    async function diminuirQuantidade(id: number) {

        const novoCarrinho = cartItems
            .map(item => {

                if (item.id === id) {

                    return {
                        ...item,
                        quantidade: item.quantidade - 1,
                    };

                }

                return item;
            })
            .filter(item => item.quantidade > 0);

        setCartItems(novoCarrinho);

        await AsyncStorage.setItem(
            '@cart',
            JSON.stringify(novoCarrinho)
        );
    }

    // REMOVER

    async function removerItem(id: number) {

        const novoCarrinho =
            cartItems.filter(
                item => item.id !== id
            );

        setCartItems(novoCarrinho);

        await AsyncStorage.setItem(
            '@cart',
            JSON.stringify(novoCarrinho)
        );
    }

    // TOTAL

    const total = cartItems.reduce(

        (acc, item) =>

            acc + item.preco * item.quantidade,

        0

    );

    useFocusEffect(

        React.useCallback(() => {

            carregarCarrinho();

        }, [])

    );

    return (

        <View style={styles.container}>

            {/* VAZIO */}

            {cartItems.length === 0 ? (

                <View style={styles.emptyContainer}>

                    <View style={styles.emptyCircle}>

                        <Ionicons
                            name="bag-handle-outline"
                            size={90}
                            color="#C78B74"
                        />

                    </View>

                    <Text style={styles.emptyTitle}>
                        Seu carrinho está vazio
                    </Text>

                    <Text style={styles.emptyText}>
                        Adicione sobremesas deliciosas
                        para começar ✨
                    </Text>

                    <TouchableOpacity
                        style={styles.shopBtn}
                        onPress={() => navigation.navigate('Home', { screen: 'Home' })}
                    >
                        <Text style={styles.shopBtnText}>
                            Explorar cardápio
                        </Text>
                    </TouchableOpacity>
                </View>

            ) : (

                <>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 180,
                        }}
                    >

                        <Text style={styles.title}>
                            Meu Carrinho
                        </Text>

                        <Text style={styles.subtitle}>
                            {cartItems.length} itens
                        </Text>

                        {cartItems.map((item) => (

                            <View
                                key={item.id}
                                style={styles.card}
                            >

                                <View style={styles.imageBox}>

                                    <Image
                                        source={item.img || require('../assets/bolos.png')}
                                        style={styles.image}
                                    />

                                </View>

                                <View style={styles.info}>

                                    <Text style={styles.name}>
                                        {item.nome}
                                    </Text>

                                    <Text style={styles.price}>
                                        R$ {item.preco.toFixed(2)}
                                    </Text>

                                    <View style={styles.actions}>

                                        {/* QUANTIDADE */}

                                        <View style={styles.quantity}>

                                            <TouchableOpacity
                                                onPress={() =>
                                                    diminuirQuantidade(item.id)
                                                }
                                            >
                                                <Text style={styles.qtdBtn}>
                                                    -
                                                </Text>
                                            </TouchableOpacity>

                                            <Text style={styles.qtdText}>
                                                {item.quantidade}
                                            </Text>

                                            <TouchableOpacity
                                                onPress={() =>
                                                    aumentarQuantidade(item.id)
                                                }
                                            >
                                                <Text style={styles.qtdBtn}>
                                                    +
                                                </Text>
                                            </TouchableOpacity>

                                        </View>

                                        {/* REMOVER */}

                                        <TouchableOpacity
                                            onPress={() =>
                                                removerItem(item.id)
                                            }
                                        >

                                            <Ionicons
                                                name="trash-outline"
                                                size={22}
                                                color="#9A8578"
                                            />

                                        </TouchableOpacity>

                                    </View>

                                </View>

                            </View>

                        ))}

                        {/* SUMMARY */}

                        <View style={styles.summary}>

                            <Text style={styles.summaryTitle}>
                                Resumo
                            </Text>

                            <View style={styles.row}>

                                <Text style={styles.label}>
                                    Subtotal
                                </Text>

                                <Text style={styles.value}>
                                    R$ {total.toFixed(2)}
                                </Text>

                            </View>

                            <View style={styles.row}>

                                <Text style={styles.label}>
                                    Entrega
                                </Text>

                                <Text style={styles.value}>
                                    R$ 8.00
                                </Text>

                            </View>

                            <View style={styles.line} />

                            <View style={styles.row}>

                                <Text style={styles.totalText}>
                                    Total
                                </Text>

                                <Text style={styles.totalValue}>
                                    R$ {(total + 8).toFixed(2)}
                                </Text>

                            </View>

                        </View>

                    </ScrollView>

                    {/* BOTÃO */}

                    <TouchableOpacity
                        style={styles.checkoutBtn}
                    >

                        <Text style={styles.checkoutText}>
                            Finalizar Pedido
                        </Text>

                    </TouchableOpacity>

                </>
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

    title: {
        fontSize: 42,
        color: '#4B2E2B',
        fontFamily: 'MaliBold',
    },

    subtitle: {
        fontSize: 20,
        color: '#9A8578',
        marginBottom: 25,
        fontFamily: 'MaliRegular',
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 16,
        flexDirection: 'row',
        marginBottom: 20,

        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 10,

        elevation: 1,
    },

    imageBox: {
        width: 90,
        height: 90,
        borderRadius: 25,
        backgroundColor: '#FFE7EA',

        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: 55,
        height: 55,
        resizeMode: 'contain',
    },

    info: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'space-between',
    },

    name: {
        fontSize: 20,
        color: '#4B2E2B',
        fontFamily: 'MaliBold',
    },

    price: {
        fontSize: 18,
        color: '#B57B5B',
        fontFamily: 'MaliBold',
    },

    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    quantity: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7EFEA',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 8,
        gap: 20,
    },

    qtdBtn: {
        fontSize: 22,
        color: '#4B2E2B',
    },

    qtdText: {
        fontSize: 18,
        color: '#4B2E2B',
        fontFamily: 'MaliBold',
    },

    summary: {
        backgroundColor: '#F7EFEA',
        borderRadius: 30,
        padding: 24,
        marginTop: 10,
    },

    summaryTitle: {
        fontSize: 30,
        marginBottom: 25,
        color: '#4B2E2B',
        fontFamily: 'MaliBold',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18,
    },

    label: {
        fontSize: 18,
        color: '#9A8578',
        fontFamily: 'MaliRegular',
    },

    value: {
        fontSize: 18,
        color: '#4B2E2B',
        fontFamily: 'MaliRegular',
    },

    line: {
        height: 1,
        backgroundColor: '#E7D7CC',
        marginVertical: 10,
    },

    totalText: {
        fontSize: 26,
        color: '#4B2E2B',
        fontFamily: 'MaliBold',
    },

    totalValue: {
        fontSize: 32,
        color: '#B57B5B',
        fontFamily: 'MaliBold',
    },

    checkoutBtn: {
        position: 'absolute',
        bottom: 95,
        left: 20,
        right: 20,

        height: 65,
        borderRadius: 22,
        backgroundColor: '#B57B5B',

        justifyContent: 'center',
        alignItems: 'center',
    },

    checkoutText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'MaliBold',
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },

    emptyCircle: {
        width: 180,
        height: 180,

        borderRadius: 100,

        backgroundColor: 'rgba(255,255,255,0.6)',

        justifyContent: 'center',
        alignItems: 'center',

        marginBottom: 35,

        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 15,

        elevation: 2,
    },

    emptyTitle: {
        fontSize: 32,
        color: '#4B2E2B',
        fontFamily: 'MaliBold',
        textAlign: 'center',
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
        marginTop: 35,

        backgroundColor: '#B57B5B',

        paddingHorizontal: 35,
        paddingVertical: 16,

        borderRadius: 18,

        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,

        elevation: 2,
    },

    shopBtnText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'MaliBold',
    },
}); 