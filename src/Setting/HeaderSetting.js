import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function HeaderSetting(props) {
    return (
        <View style={styles.container}>
            <View style={styles.imageBackgroundView}>
                <Image style={styles.imageBackground} source={{ uri: "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/313387976_1891665104508918_2922622729497319790_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=e3f864&_nc_ohc=I-wC8bSl7oAAX_p3mL3&_nc_ht=scontent.fhan15-1.fna&oh=00_AfB-XxvX7PzJnsqRoJjPpKx7spj6ArevLLY2qcMkRCt2mA&oe=644B481C" }} />
            </View>

            <View style={styles.info}>
                <View style={styles.imageView}>
                    <Image style={styles.image} source={{ uri: "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/331092601_929399758239652_762998126141615788_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=hAv_Yx3B9YoAX-KZ6Tv&_nc_ht=scontent.fhan15-1.fna&oh=00_AfCbM19QKHbDu2AMt0BYOPzn9AZTwSIcpn2KV0-bT0g8cw&oe=644B0DC4" }} />
                </View>
                <Text style={styles.name}>{props.name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 250,
        alignItems: "center"
    },
    imageView: {
        height: 80,
        width: 80,
        borderRadius: 40,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "#fff",

        elevation: 5
    },
    image: {
        width: "100%",
        height: "100%"
    },
    imageBackgroundView: {
        height: 150,
        width: '100%',
        overflow: "hidden",
    },
    imageBackground: {
        height: "100%",
        width: '100%',
        resizeMode: "cover"
    },
    info: {
        position: "absolute",
        top: 110,
        alignItems: "center"
    },
    name: {
        marginTop: 6,
        fontSize: 18,
        fontWeight: "700",
        color: "#000"
    }
})