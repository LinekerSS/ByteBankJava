import React from "react";
import * as S from './styles'
import api from '../../services/api';
import isConnected from "../../utils/isConnected";
import TypeIcons from '../../utils/typeIcons';
import { format } from "date-fns";
import { Navigate, useParams  } from "react-router-dom";


//Components
import Header from "../../components/Header";
import Footer from '../../components/Footer'
import { useState, useEffect } from "react";

function Task({ useParams }) {
    const [redirect, setRedirect] = useState(false)
    const [type, setType] = useState();
    const [id, setId] = useState();
    const [done, setDone] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
 
    
    async function LoadTaskDetails(){
        await api.get(`/task/${useParams.id}`)
        .then(response => {
          setType(response.data.type)
          setDone(response.data.done)
          setTitle(response.data.title)
          setDescription(response.data.description)
          setDate(format(new Date(response.data.when), 'yyyy-MM-dd'))
          setHour(format(new Date(response.data.when), 'HH:mm'))
        })
      }

    const save = async () => {

        // Validando
        if(!title)
            return alert("Você precisa informar o título da tarefa")
        else if(!description)
            return alert("você precisa informar a descrição da tarefa")
        else if(!type)
            return alert("você precisa informar o tipo da tarefa")
        else if(!date)
            return alert("você precisa informar a data da tarefa")
        else if(!hour)
            return alert("você precisa informar a hora da tarefa")

        if(useParams.id) {
            await api.put(`/task/${useParams.id}`, {
                macaddress: isConnected,
                done,
                type,
                title,
                description,
                when: `${date}T${hour}:00.000`
            })
            .then(() =>
                setRedirect(true)
            )
        } else {
            await api.post('/task', {
                macaddress: isConnected,
                type,
                title,
                description,
                when: `${date}T${hour}:00.000`
            })
            .then(() =>
                setRedirect(true)
            )
        }
        
    }

    const remove = async () => {
        const res = window.confirm('Deseja realmente remover a tarefa?')
        if(res === true){
            alert('Ok, vamos remover')
            await api.delete(`/task/${useParams.id}`).then(() => setRedirect(true));
        } else {
            alert('Ok, vamos manter')
        }
    }

    useEffect(() => {
        if(!isConnected)
        setRedirect(true);
        LoadTaskDetails();
    }, []);

    return (
        <S.Container>
            { redirect && <Navigate to={"/"} />}
            <Header />

            <S.form>
                <S.TypeIcons>
                {
                    TypeIcons.map((icon, index) => (
                        index > 0 && 
                        <button type="button" onClick={() => setType(index)}>
                            <img src={icon} alt="Tipo da Tarefa" 
                            className={type && type !== index && 'inative'}/>
                        </button>
                    ))
                }
                </S.TypeIcons>

                <S.Input>
                    <span>Título</span>
                    <input type="text" placeholder="Título da tarefa..." onChange={e => setTitle(e.target.value)} value={title}/>
                </S.Input>

                <S.TextArea>
                    <span>Descrição</span>
                    <textarea rows={5} placeholder="Detalhes da Tarefa" onChange={e => setDescription(e.target.value)} value={description}></textarea>
                </S.TextArea>
                
                <S.Input>
                    <span>Data</span>
                    <input type="date" placeholder="Título da tarefa" onChange={e => setDate(e.target.value)} value={date}/>
                    {/*<img src={iconCalendar} alt="Calendário"/>*/}
                </S.Input>
                
                <S.Input>
                    <span>Hora</span>
                    <input type="time" placeholder="Título da tarefa" onChange={e => setHour(e.target.value)} value={hour} />
                    {/*<img src={iconClock} alt="Relógio"/>*/}
                </S.Input>

                <S.Options>
                    <div>
                        <input type='checkbox' checked={done} onChange={() => setDone(!done)} />
                        <span>Concluído</span>
                    </div>
                    <button type="button" onClick={remove}>
                        Excluir
                    </button>
                </S.Options>

                <S.Save>
                    <button type="button" onClick={save}>Salvar</button>
                </S.Save>

            </S.form>            
            <Footer />
        </S.Container>
    )
}

export default Task;