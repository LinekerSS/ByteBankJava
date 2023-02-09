import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity, 
  Image, 
  TextInput,  
  Alert
} from 'react-native';
 
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, isPast } from 'date-fns';
 
import styles from './styles';
 
import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';
 
 
export default function DateTimeInputAndroid({ type, save, date, hour }){
  const [dateTime, setDateTime] = useState();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  useEffect(() => {
    if(type == 'date' && date) {
      setDateTime(format(new Date(date),'dd/MM/yyyy'));
      save(format(new Date(date), 'yyyy-MM-dd'));

    }

    if(type == 'hour' && hour) {
      setDateTime(format(new Date(hour),'HH:mm'));
      save(format(new Date(hour), 'HH:mm:ss'));
    }
  }, [])
 
  const newTime = (event, value) => {
    const currentDate = value || dateTime;
    if (type == 'date') {
      setShow(false);
      setDateTime(format(new Date(currentDate),'dd/MM/yyyy'));
      save(format(new Date(currentDate), 'yyyy-MM-dd'));
    } else {
      setShow(false);
      setDateTime(format(new Date(currentDate),'HH:mm'));
      save(format(new Date(currentDate), 'HH:mm:ss'));
    }
  };
 
  async function selectDataOrHour(){
    if(type == 'date'){
      setShow(true);
      setMode('date');
                
    }else{
      setShow(true);
      setMode('time');
      
    }
  }
 
  return(
    <TouchableOpacity onPress={selectDataOrHour}>
      <TextInput 
      style={styles.input} 
      placeholder={type == 'date' ? 'Clique aqui para definir a data...' : 'Clique aqui para definir a hora...' }
      editable={false}
      value={dateTime}
      />
      {
        show && 
        <DateTimePicker
          value={new Date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={newTime}
        />
      }
    
 
      <Image 
      style={styles.iconTextInput} 
      source={type == 'date' ? iconCalendar : iconClock} />
    </TouchableOpacity>
  )
 
}








































/* import React, { useState } from "react";
import {
    TouchableOpacity, 
    Image, 
    TextInput, 
    DatePickerAndroid, 
    TimePickerAndroid 
} from 'react-native';

import styles from "./styles";
import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

export default function DateTimeInputAndroid({ type }) {
    const [dateTime, setDateTime] = useState();

    async function selectDateOrHour(){
        if(type == 'date') {
            const {action, year, month, day} = await DatePickerAndroid.open({
                mode: 'calendar'
            });
            if(action == DatePickerAndroid.dateSetAction)
                setDateTime(`${day} - ${month} - ${year}`)
        } else {
            const {action, hour, minute} = await TimePickerAndroid.open({
                is24hour: true
            });
            if(action != TimePickerAndroid.dismissedAction)
            setDateTime(`${hour}:${minute}`);
        }
    }

    return (
        <TouchableOpacity onPress={selectDateOrHour}>
            <TextInput style={styles.input} placeholder={type == 'date' ? 'Clique aqui para definir a data...' : 'Clique aqui para definir a hora...'} editable={false} value={dateTime} />
            <Image style={styles.iconTextInput} source={type == 'date' ? iconCalendar : iconClock} />
        </TouchableOpacity>
    )
} */