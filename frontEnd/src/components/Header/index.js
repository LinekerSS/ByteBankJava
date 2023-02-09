import React, { useEffect, useState } from "react";
import * as S from './styles'
import { Link } from "react-router-dom";

import logo from '../../assets/logo.png'
import bell from '../../assets/bell.png'
import api from "../../services/api";
import isConnected from '../../utils/isConnected'

function Header({ clickNotification }) {
    const [lateCount, setLateCount] = useState(); 


    const lateVerify = async () => {
        try {
            await api.get(`/task/filter/late/${isConnected}`)
            .then(response => {
            setLateCount(response.data.length)
            console.log(response.data.length);
        })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        lateVerify()
    }, [])

    const logOut = async () => {
        localStorage.removeItem('@todo/macaddress')
        window.location.reload();
    }

    return (
        <S.Container>
            <S.LeftSide>
                <img src={logo} alt="Logo"/>
            </S.LeftSide>
            <S.RightSide>
                <Link to="/">Início</Link>
                <span className="divider" />
                <Link to="/task">Nova Tarefa</Link>
                <span className="divider" />
                {isConnected ? 
                    <Link to="/qrcode">Sincronizar celular</Link> 
                    :
                    <button type="button" onClick={logOut}>Sair</button>
                }
                {
                    lateCount &&
                    <>
                    
                        <span className="divider" />
                        <button onClick={clickNotification} id="notification">
                            <img src={bell} alt="Notificação" />
                            <span>{lateCount}</span>
                        </button>
                    </>
                }
            </S.RightSide>
        </S.Container>
    )
}

export default Header;