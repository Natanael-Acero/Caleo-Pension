import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { CajonesLibres } from '../components/dashboard/CajonesLibres'
import { GestCajones } from '../components/cajones/GestCajones';
import { GestUsuarios } from '../components/usuarios/GestUsuarios';
import { AuthRouter } from '../router/AuthRouter'
import ProtectedRoute from './ProtectedRoute';
import { Perfil } from '../components/account/Perfil';


export const AppRouter = () => {

    return (

        <Router>
            <div>
                <Switch>

                    <Route path="/auth" component={AuthRouter} />

                    <ProtectedRoute exact path='/dashboard' component={CajonesLibres} role={null} />

                    <ProtectedRoute exact path='/account/perfil' component={Perfil} role={null} />

                    <ProtectedRoute exact path='/gestionUsuarios' component={GestUsuarios} role={true} />

                    <ProtectedRoute exact path='/gestionCajones' component={GestCajones} role={true} />

                    <ProtectedRoute exact path='/rentar/:_id' component={GestCajones} role={true} />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}