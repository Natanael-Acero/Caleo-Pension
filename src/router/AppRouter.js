import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { AuthRouter } from '../router/AuthRouter'
import { CajonesLibres } from '../components/dashboard/CajonesLibres';
import { Navbar } from '../components/shared/Navbar'

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/auth" component={AuthRouter} />

                    <Route exact path='/dashboard' >
                        <Navbar />
                        <div className="container">
                            <CajonesLibres />
                        </div>
                    </Route>

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
