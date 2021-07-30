import React from 'react'
import {Switch,Route} from 'react-router-dom';
import Home from './../MyApp/component/Home/Home';

 function Routers() {
    return (
        <>
            <Switch>
                <Route component={Home} path="/" exact />
            </Switch>
        </>
    )
}
export default Routers;