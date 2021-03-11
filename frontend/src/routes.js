import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import EventsPage from './pages/EventsPage';
import MapEditor from './pages/MapEditor';
import TopNav from './components/TopNav';
import MapBrowser from './pages/MapBrowser';
import LayerBrowser from './pages/LayerBrowser';
import NodeBrowser from './pages/NodeBrowser';
import CreateMap from './pages/CreateMap';
import CreateLayer from './pages/CreateLayer';
import CreateNode from './pages/CreateNode';
import MyMaps from './pages/MyMaps';

export default function Routes() {
    return (
        <BrowserRouter>
            <TopNav />
            <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/profile' exact component={Profile} />
                <Route path='/mapbrowser' exact component={MapBrowser} />
                <Route path='/layerbrowser' exact component={LayerBrowser} />
                <Route path='/nodebrowser' exact component={NodeBrowser} />
                <Route path='/createmap' exact component={CreateMap} />
                <Route path='/createlayer' exact component={CreateLayer} />
                <Route path='/createnode' exact component={CreateNode} />
                <Route path='/events' component={EventsPage} />
                <Route path='/mapeditor' component={MapEditor} />
                <Route path='/mymaps' component={MyMaps}></Route>
            </Switch>
        </BrowserRouter>
    );
}
