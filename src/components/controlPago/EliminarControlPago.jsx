import React, { useEffect, useState } from 'react';
import { Enviroments } from '../../enviroments/enviroments.url';
import Swal from 'sweetalert2'
import axios from 'axios';
import moment from 'moment';
export const EliminarControlPago = ({ setReload, id }) => {
    const [ultimoPago, setUltimoPago] = useState();

    const initialState = {
        _id: id,
        nmbCantidad: '',
        dteFechaPagoFin: '',
        dteFechaPagoInicio: '',
        blnActivo: true
    };
    const [cargar, setCargar] = useState(true)
    const [data, setData] = useState(initialState);
    const handleInputChange = ({ target }) => {
        setData({
            ...data,
            [target.name]: target.value
        });
    }
    const reset = () => {
        setData(initialState);
        setReload(reload => !reload);
    }

    useEffect(() => {

    }, [ultimoPago])

    const handleSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            text: `¿Estas seguro de eliminar este pago?`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Eliminar`,
            reverseButtons: true
        }).then(async (res) => {
            if (res.isConfirmed) {
                await axios.delete(`${Enviroments.urlBack}/api/controlPago/${data._id}`).then(res => {
                    setCargar(false);
                    Swal.fire({
                        position: 'top-end',
                        title: 'Información eliminada exitosamente',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    reset()
                }).catch(err => {
                    console.log(err.response);
                    Swal.fire({
                        title: 'Error al  eliminar el pago',
                        text: err.response.data.msg,
                        icon: 'error',
                        showConfirmButton: true,
                    })
                })
            }
        })

    }
    const getDatosId = async () => {
        await axios.get(`${Enviroments.urlBack}/api/controlPago/obtenerId/${initialState._id}`).then(res => {
            console.log(res.data.cont.controlPago[0]);
            setData({
                ...data,
                ['_id']: res.data.cont.controlPago[0]._id,
                ['nmbCantidad']: res.data.cont.controlPago[0].nmbCantidad,
                ['dteFechaPagoFin']: moment(res.data.cont.controlPago[0].dteFechaPagoFin).add(1, 'days').format('YYYY-MM-DD'),
                ['dteFechaPagoInicio']: moment(res.data.cont.controlPago[0].dteFechaPagoInicio).add(1, 'days').format('YYYY-MM-DD')
            });
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(async () => {
        getDatosId();
    }, [])
    return (
        <div className="container">
            <h5 className="card-title">Eliminar Pago</h5>
            <hr />
            <form onSubmit={handleSubmit} className="was-validated">

                <div className="form-group mb-3">
                    <label htmlFor="dteFechaPagoInicio">Fecha inicio del pago:</label>
                    <input type="date" className="form-control form-control-sm" id="dteFechaPagoInicio" name="dteFechaPagoInicio"
                        value={data.dteFechaPagoInicio}
                        onChange={handleInputChange} required disabled />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="dteFechaPagoFin">Fecha fin del pago:</label>
                    <input type="date" className="form-control form-control-sm" id="dteFechaPagoFin" name="dteFechaPagoFin"
                        value={data.dteFechaPagoFin}
                        onChange={handleInputChange} min={moment(data.dteFechaPagoInicio).add(1, 'days').format('YYYY-MM-DD')} disabled required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="nmbCantidad">Precio a pagar:</label>
                    <input type="number" className="form-control form-control-sm" id="nmbCantidad" placeholder="Cantidad a pagar" name="nmbCantidad"
                        value={data.nmbCantidad}
                        onChange={handleInputChange} required disabled />
                </div>
                <hr />
                <div className=" form-group row text-right" >
                    <div className="col-12 text-center">
                        <button className="btn btn-danger m-1 " type="button" onClick={() => reset()}>Cancelar</button>
                        <button className="btn btn-primary m-1" type="submit">Eliminar Pago</button>
                    </div>
                </div>
            </form >
        </div >
    )
}