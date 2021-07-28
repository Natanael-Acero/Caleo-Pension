import React, { useEffect, useState, Fragment } from 'react'
import { RegistroControlPago } from './RegistroControlPago';
import { ActualizarControlPago } from './ActualizarControPago';
import { Enviroments } from '../../enviroments/enviroments.url';
import axios from 'axios';
import Swal from 'sweetalert2'
import * as moment from 'moment'

import './App.css'
export const GestControlPago = () => {
    const [reload, setReload] = useState(false)
    const [data, setData] = useState([]);
    const [pagosCoche, setPagosCoche] = useState([]);
    const [gananciaTotal, setGananciaTotal] = useState(0);
    const [cocheSelect, setCocheSelect] = useState();
    const [mostrarActualizar, setMostrarActualizar] = useState({
        mostrar: false,
        id: ''
    });

    const getPagosId = (coche) => {
        setCocheSelect(coche);
        // console.log(cocheSelect);
        axios.get(`http://localhost:3000/api/controlPago/obtenerIdVehiculo/${coche._id.vehiculo[0]._id}`).then(res => {
            console.log(res.data.cont.controlPago);
            // moment(pago.dteFechaInicio).format('DD/MM/YYYY')
            setPagosCoche(res.data.cont.controlPago)
        }).catch(err => {
            console.log(err);
        })
    }
    // const estatus = async (_id, blnActivo) => {
    //     const valor = blnActivo === true ? false : true;
    //     // console.log(valor);
    //     Swal.fire({
    //         text: `¿Estas seguro de ${blnActivo === true ? 'desactivar' : 'activar'} el cajón?`,
    //         icon: 'warning',
    //         showCancelButton: true,
    //         cancelButtonText: 'Cancelar',
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: `${blnActivo === true ? 'Desactivar' : 'Activar'}`,
    //         reverseButtons: true
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axios.delete(`${Enviroments.urlBack}/api/cajon/${_id}/${valor}`)
    //                 .then(res => {
    //                     setReload(reload => !reload);
    //                     Swal.fire({
    //                         position: 'top-end',
    //                         icon: 'success',
    //                         text: res.data.msg,
    //                         showConfirmButton: false,
    //                         timer: 1500
    //                     })

    //                 }).catch((error) => {
    //                     console.log(error.response.data.msg);
    //                     Swal.fire({
    //                         position: 'center',
    //                         icon: 'error',
    //                         text: error.response.data.msg,
    //                         showConfirmButton: false,
    //                         timer: 1500
    //                     })
    //                 })

    //         }
    //     })

    // }

    // const actualizar = (id) => {
    //     setMostrarActualizar({
    //         mostrar: true,
    //         id: id,
    //     });
    // }

    const { mostrar, id, cajon } = mostrarActualizar;

    useEffect(async () => {
        await axios.get(`${Enviroments.urlBack}/api/controlPago`)
            .then(res => {
                const datos = res.data.cont.controlPago;
                let sum = [];
                for (const coche of datos) {
                    sum.push({ sum: coche.cantidad })
                }
                setGananciaTotal(sum.reduce((a, v) => a = a + v.sum, 0));
                setData(datos);
            }).catch((err) => {
                console.log(err);
            })
    }, [reload]);

    useEffect(() => {
        setMostrarActualizar({
            mostrar: false
        })
    }, [reload])




    return (
        <Fragment>

            <div className="card shadow mt-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-sm-12 mt-3">

                            {
                                mostrar ? <ActualizarControlPago id={id} setReload={setReload} reload={reload} />
                                    :
                                    <RegistroControlPago setReload={setReload} />
                            }

                        </div>

                        <div className="col-md-8 col-lg-8 col-sm-12 mt-3">
                            <div className="container">

                                <div className="table-responsive tableFixHead">
                                    <table className="table">

                                        <thead >
                                            <tr className="text-center">
                                                <th scope="col">Vehiculo</th>
                                                <th scope="col" >Cajon</th>
                                                <th scope="col">Persona</th>
                                                <th scope="col" >Total de pagos</th>
                                                <th scope="col">Pagos realizados</th>
                                                <th scope="col">Ver Pagos</th>
                                            </tr>
                                        </thead>



                                        <tbody  >
                                            {
                                                data.map((coche, index) => {
                                                    return (
                                                        <tr key={index} className="text-center">
                                                            <td>{coche._id.vehiculo ? coche._id.vehiculo[0].strMarca : ''}-{coche._id.vehiculo ? coche._id.vehiculo[0].strModelo : ''}</td>
                                                            <td >{coche._id.cajon ? coche._id.cajon[0].nmbCajon : ''}</td>
                                                            <td>{coche._id.persona ? coche._id.persona[0].strNombre : ''} {coche._id.persona ? coche._id.persona[0].strPrimerApellido : ''}</td>
                                                            <td ><strong>$</strong>{coche.cantidad}.00</td>
                                                            <td>{coche.nmbPagosRealizados}</td>
                                                            <td><button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => getPagosId(coche)} className="btn btn-outline-primary btn-sm"><i className="far fa-eye"></i></button></td>
                                                        </tr>
                                                    )

                                                })
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        data.length < 1 &&
                                        <div className="alert alert-primary text-center" role="alert">
                                            No existe informacion para mostrar
                                        </div>
                                    }
                                </div>
                                <div className="row">
                                    <div className="col-md-6 text-center">
                                        <span>Total de coches: <strong>{data.length}</strong> </span>
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <span>Ganancia Total: <strong>${gananciaTotal}</strong></span>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>

                </div>
            </div>


            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{cocheSelect ? cocheSelect._id.vehiculo[0].strMarca : ''}-{cocheSelect ? cocheSelect._id.vehiculo[0].strModelo : ''}<i class="fas fa-chevron-right fa-sm"></i>{cocheSelect ? cocheSelect._id.persona[0].strNombre : ''}{cocheSelect ? cocheSelect._id.persona[0].strPrimerApellido : ''}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">N° Pago</th>
                                        <th scope="col">Fecha Inicio</th>
                                        <th scope="col">Fecha Fin</th>
                                        <th scope="col">Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pagosCoche.map((pago, index) => {
                                        return (
                                            <tr key={pago._id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {pago.dteFechaPagoInicio ? moment(pago.dteFechaPagoInicio).format('LL') : 'N/A'}
                                                </td>
                                                <td>
                                                    {pago.dteFechaPagoFin ? moment(pago.dteFechaPagoFin).format('LL') : 'N/A'}
                                                </td>

                                                <td>{pago.nmbCantidad}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment >
    )
}