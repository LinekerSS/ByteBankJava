import React from "react";
import * as S from './styles'
import api from '../../services/api';
import { Link, Navigate } from "react-router-dom";

//Components
import Header from "../../components/Header";
import Footer from '../../components/Footer'
import FilterCard from "../../components/FilterCard";
import TaskCard from "../../components/TaskCard";
import { useState, useEffect } from "react";
import isConnected from "../../utils/isConnected";

function Home() {

    const [filterActived, setFilterActived] = useState("all");
    const [tasks, setTasks] = useState([]);
    const [redirect, setRedirect] = useState(false);

    const loadTasks = async () => {
        try {
            await api.get(`/task/filter/${filterActived}/${isConnected}`)
            .then(response => {
            setTasks(response.data)
        })
        } catch (error) {
            console.log(error);
        }
        
    };
    

    useEffect(() => {
        loadTasks();
        if(!isConnected) 
        setRedirect(true);

    }, [filterActived]);

    function Notification() {
        setFilterActived('late')
    }

    return (
        <S.Container>
            { redirect && <Navigate to="/qrcode" /> }
            <Header clickNotification={Notification}/>
            <S.FilterArea>
                <button type='button' onClick={() => setFilterActived("all")} >
                    <FilterCard title="Todos" actived={filterActived === "all"} />
                </button>
                <button type='button' onClick={() => setFilterActived("today")}>
                    <FilterCard title="Hoje" actived={filterActived === "today"} />
                </button>
                <button type='button' onClick={() => setFilterActived("week")}>
                    <FilterCard title="Semana" actived={filterActived === "week"} />
                </button>
                <button type='button' onClick={() => setFilterActived("month")}>
                    <FilterCard title="Mês" actived={filterActived === "month"} />
                </button>
                <button type='button' onClick={() => setFilterActived("year")}>
                    <FilterCard title="Ano" actived={filterActived === "year"} />
                </button>
            </S.FilterArea>

            <S.title>
                <h3>{filterActived === 'late' ? 'TAREFAS ATRASADAS' : 'TAREFAS'}</h3>
            </S.title>

            <S.Content>
                {
                tasks.map(t => (
                    <Link to={`/task/${t._id}`}>
                        <TaskCard type={t.type} title={t.title} when={t.when} done={t.done}/>
                    </Link>
                ))
                }
            </S.Content>
            <Footer />
        </S.Container>
    )
}

export default Home;