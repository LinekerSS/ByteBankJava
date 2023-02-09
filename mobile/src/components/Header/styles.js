import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        backgroundColor: '#20295F',
        borderBottomWidth: 5,
        borderBottomColor: '#EE6B26',
        alignItems: 'center',
        justifyContent: 'center'
    },

    logo: {
        width: 120,
        height: 40
    },
    notification: {
        position: 'absolute',
        right: 20,

    },
    notificationImage: {
        width: 30,
        height: 35
    },
    circle: {
        width: 25,
        height: 25,
        backgroundColor: '#FFF',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 13,
        bottom: 13
    },
    leftIcon: {
        position: 'absolute',
        left: 20 
    },
    leftIconImage: {
        width: 30,
        height: 30
    },
    notificationText: {
        fontWeight: 'bold',
        color: '#EE6B26'
    }
});

export default styles;