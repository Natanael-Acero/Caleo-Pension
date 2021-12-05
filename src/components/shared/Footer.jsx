import React, { useEffect, useState } from 'react'
import './App.css'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router';
import axios from 'axios';

export const Footer = () => {
    const history = useHistory();
    let decoded = localStorage.getItem('authorization');
    if (localStorage.getItem("authorization")) {
        decoded = jwt_decode(localStorage.getItem("authorization"));
    } else {
        history.push('/');
    }
    const [weather, setWeather] = useState();
    const color = localStorage.getItem('color') ? localStorage.getItem('color') : 'black';
    const colorLetras = localStorage.getItem('obscuro') ? localStorage.getItem('obscuro') : 'true';
    const getWeather = async () => {
        await axios.get(`https://api.openweathermap.org/data/2.5/find?lat=21.8858107&lon=-102.326319&cnt=1&appid=57d1ae31db0f78a34bab0084c8aa796c&units=metric`).then(res => {
            setWeather(res.data.list[0].main.temp)
        }).catch(err => {
            console.log(err);
        })
        setTimeout(() => {
            getWeather()
        }, 9000);
    }
    useEffect(() => {
        getWeather()
    }, [])
    return (

        <div></div>

    )
}