import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import History from './Components/History';
import Entry from './Components/Entry';
import Profile from './Components/Profile';

export default (
    <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/entry' component={Entry}/>
        <Route path='/history' component={History}/>
        <Route path='/profile' component={Profile}/>
    </Switch>
)