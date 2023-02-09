import React, { useState } from 'react';
import {
    TouchableOpacity,
    Image,
    DatePickerIOSComponent
} from 'react-native';

import styles from './styles';

import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';
 
export default function DateTimeInputIOS ({ type }){
    const [dateTime, setDateTime] = useState(new Date);

    return(
        <TouchableOpacity style={styles.input}>
            <DatePickerIOSComponent date={dateTime} mode={type} minimumDate={new Date} onDateChange={setDateTime}/>
            <Image style={styles.iconTextInput} source={type == 'date' ? iconCalendar : iconClock}/>
        </TouchableOpacity>

    )
}