import React, { useContext } from 'react'
import caleo_logo from '../../assets/images/caleo_logo.png'
import './styles.css'
import { UserContext } from './UserContext';
import { useHistory } from 'react-router';


export const Login = () => {

    const { setUser } = useContext(UserContext);
    const history = useHistory();

    return (


        <div className="wrapper fadeInDown">
            <div id="formContent">

                <div className="fadeIn first">
                    <img src={caleo_logo} id="icon" alt="User Icon" />
                </div>


                <form>
                    <input type="text" id="login" className="fadeIn second estiloBoton" name="email" placeholder="Correo Electrónico" />
                    <input type="text" id="password" className="fadeIn third estiloBoton" name="password" placeholder="Contraseña" />
                    <button type="submit" className="btn btn-primary fadeIn fourth mb-2 mt-2" onClick={() => history.push(`/dashboard`)} >Iniciar Sesión</button>
                </form>


                <div id="formFooter">
                    <a className="underlineHover">¿Olvidaste tu contraseña?</a>
                </div>

            </div>
        </div>





    )
}
