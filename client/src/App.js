import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import App_1 from './App_1'
import ErrorContainer from './components/ErrorContainer';

class App extends Component {
    render() {
        return (<BrowserRouter>
            <div className="App">
                <Navbar/>
                <Switch>
                    <Route path='/signin' exact component={SignIn}/>
                    <Route path='/signup' exact component={SignUp}/>
                    <Route path='/' component={App_1}/>
                    <Route path="*" component={ErrorContainer}/>
                </Switch>
            </div>
        </BrowserRouter>);
    }
}

export default App;
