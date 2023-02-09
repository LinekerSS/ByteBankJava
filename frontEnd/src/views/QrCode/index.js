import React from "react";
import * as S from './styles'
import Qr from 'qrcode.react'


//Components
import Header from "../../components/Header";
import Footer from '../../components/Footer'
import { useState } from "react";
import { Navigate } from "react-router-dom";

function QrCode() {

    const [mac, setMac] = useState();
    const [redirect, setRedirect] = useState(false)

    const SaveMac = async () => {
        if(!mac)
        alert("Você precisa informar o número solicitado pelo celular!");
        else
            await localStorage.setItem('@todo/macaddress', mac)
            setRedirect(true);
            window.location.reload();
    }

    return (
        <S.Container>
            { redirect && <Navigate to="/"/>}
            <Header />

            <S.content>
                <h1>CAPTURE O QRCODE PELO APP</h1>
                <p>Suas atividades serão sincronizadas com o seu celular</p>
                <S.QrCodeArea>
                    <Qr value="getmacaddress" size={350}></Qr>
                </S.QrCodeArea>

                <S.ValidationCode>
                    <span>Digite a numeração enviada para seu celular</span>
                    <input type="text" onChange={e => setMac(e.target.value)} value={mac}/>
                    <button type="button" onClick={SaveMac}>SINCRONIZAR</button>
                </S.ValidationCode>

            </S.content>

            <Footer />
        </S.Container>
    )
}

export default QrCode;