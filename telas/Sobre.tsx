import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';


export default function Sobre() {

    const player = useVideoPlayer(
        "https://www.pexels.com/pt-br/download/video/8870910/",
        player => {
            player.loop = true;
            player.play();
        }
    );
    return (

        <LinearGradient
            colors={['#EB8D96', '#FFFAF2', '#FFC0C7', '#FFDDDD']}
            style={{ flex: 1 }}
        >


            <ScrollView contentContainerStyle={styles.content}>

                <Text style={styles.title}>Sobre a doceria</Text>



                <Text style={styles.text}>
                    Minha jornada com a Ramalho Sweets começou de forma muito íntima e
                    afetiva — com a lembrança dos aromas da infância, das tardes na
                    cozinha com minha família e da alegria que um doce bem feito pode trazer.

                    {"\n\n"}

                    Desde muito nova, tive um encantamento especial pela confeitaria.
                    Com o tempo, essa paixão cresceu e se tornou um propósito: espalhar
                    doçura e boas memórias através dos doces.
                </Text>
                <Image
                    source={require('../assets/doceria.webp')}
                    style={styles.image}
                />
                <Text style={styles.videoTitle}>
                    Ficou com vontade? Dá uma olhada nesse vídeo:
                </Text>

                <View style={styles.videoContainer}>
                    <VideoView
                        player={player}
                        style={styles.video}
                        allowsFullscreen
                        allowsPictureInPicture
                    />
                </View>


                <StatusBar style="auto" />

            </ScrollView>

        </LinearGradient>

    );
}

const styles = StyleSheet.create({

    content: {
        padding: 60,

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