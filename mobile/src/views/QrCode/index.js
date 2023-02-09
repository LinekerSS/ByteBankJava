import React, { useState, useEffect} from "react";
import {
    Text, 
    View, 
    TouchableOpacity, 
    Alert
} from 'react-native';

import {BarCodeScanner} from 'expo-barcode-scanner';
import * as NetWork from 'expo-network'

import styles from './styles'

export default function QrCode({navigation}) {
    const [hasPermition, setHasPermition] = useState(null);
    const [scanned, setScanned] = useState(false);

    const getMacaddress = async () => {
        await NetWork.getIpAddressAsync().then(mac => {
            Alert.alert(`Seu número é: ${mac}`)
        })
    }

    useEffect(() => {
        (async() => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermition(status === 'granted')   
        })();
    }, [])

    const handleBarCodeScanner = ({data}) => {
        setScanned(true);
        if(data === 'getmacaddress')
        getMacaddress();
        else
        Alert.alert('QrCode Inválido!')
    }
    return (
        <View style={styles.container}>
            <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanner} style={StyleSheet.absoluteFillObject} />
            <View style={styles.header}>
                <Text style={styles.headerText}>Conectar com minha conta na web</Text>
            </View>
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.textButton}>VOLTAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={scanned ? styles.buttonScanActive : styles.buttonScanInative} onPress={() => setScanned(false)}>
                    <Text style={styles.textButton}>SCAN NOVAMENTE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}