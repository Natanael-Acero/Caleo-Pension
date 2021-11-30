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

        <svg className="footer-svg" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1006.083 253.374">
            <path id="Trazado_2" data-name="Trazado 2" d="M0,245.477H12.925c12.856,0,38.776,0,64.627-12.639,25.641-12.167,51.7-38.154,77.552-31.421,25.5,6.261,51,44.061,76.854,62.961,25.99,18.9,51.7,18.9,77.552-18.9s51.7-113.4,77.552-107.139c25.711,6.733,51.7,94.145,77.552,88.239,25.5-5.906,51-107.494,76.854-119.66,26.06-12.639,51.7,62.961,77.552,88.121,25.921,25.633,51.7-.354,77.552,12.639,25.711,12.994,51.7,62.606,77.552,88.239,25.571,25.161,51.7,25.161,76.854-6.379,26.13-31.067,51.7-94.854,77.552-125.921,25.99-31.539,51.7-31.539,64.976-31.539h12.576v226.8H0Z" transform="translate(0 -105.503)" fill="#fb8f40" />
        </svg>

    )
}