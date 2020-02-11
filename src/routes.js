import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import History from './Components/History';
import Auth from './Components/Auth';
import Entry from './Components/Entry';
import Profile from './Components/Profile';

export default (
    <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/auth/login' component={Auth}/>
        <Route path='/auth/register' component={Auth}/>
        <Route path='/entry' component={Entry}/>
        <Route path='/history' component={History}/>
        <Route path='/profile' component={Profile}/>
    </Switch>
)