import { StyleSheet, View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

/*
const api = {
    url: process.env.EXPO_PUBLIC_API_URL,
    key: process.env.EXPO_PUBLIC_API_KEY,
    icons: process.env.EXPO_PUBLIC_ICONS_URL
}
*/


const api = {
    url: 'https://api.openweathermap.org/data/2.5/weather?',
    key: '0b196a6ba14ee1114b40e477bab3b814',
    icons: 'https://openweathermap.org/img/wn/'
}

export default function Weather(props) {

    useEffect(() => {
        const url = api.url +
            'lat=' + props.latitude +
            '&lon=' + props.longitude +
            '&units=metric' +
            '&appid=' + api.key
        fetch(url)
            .then(res => res.json())
            .then((json) =>{
                console.log(json)
                setTemp(json.main.temp)
                setDescription(json.weather[0].description)
                setIcon(api.icons + json.weather[0].icon + '@2.png')
            })
            .catch((error) => {
                setDescription("Error retrieving weather information.")
                console.log(error)
            })
    }, [])

    const [temp, setTemp] = useState(0)
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')

  return (
    <View>
        <Text style={styles.temp}>{temp}</Text>
        {icon &&
            <Image source={{url: icon}} style={{width: 50,height: 50}} />
        }
        <Text>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    temp: {
        justifyContent: 'center',
        fontSize: 30,
    },
  });