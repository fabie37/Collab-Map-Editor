import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import EventsPage from './pages/EventsPage'
import MapEditor from './pages/MapEditor'
import TopNav from './components/TopNav'
import MapBrowser from './pages/MapBrowser'
import CreateMap from './pages/CreateMap'
import CreateLayer from './pages/CreateLayer'


export default function Routes() {
    return (
        <BrowserRouter>
            <TopNav/>
            <Switch>
                <Route path='/' exact component={Dashboard} /> 
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/profile' exact component={Profile} />
                <Route path='/mapbrowser' exact component={MapBrowser} />
                <Route path='/createmap' exact component={CreateMap} />
                <Route path='/createlayer' exact component={CreateLayer} />
                <Route path='/events' component={EventsPage} /> 
                <Route path='/mapeditor' component={MapEditor} />
            </Switch>
        </BrowserRouter>
    );
}