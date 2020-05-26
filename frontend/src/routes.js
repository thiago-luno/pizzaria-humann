import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Order from './pages/Order';
import Register from './pages/Register';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/pedido" component={Order} />
                <Route path="/cadastro" component={Register} />
            </Switch>
        </BrowserRouter>
    );
}