import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import VideosContainer from './components/VideosContainer';
import {connect} from 'react-redux'

import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

class App_1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            data1: undefined,
            loading: false
        };
    }

    componentWillMount() {
        this.getShow();
    }

    async getShow() {
        this.setState({loading: true});
        try {
            const response = await axios.get(`http://localhost:3001/loggedUser/`);

            this.setState({data: response.data, loading: false});
        } catch (e) {
            console.log(`error ${e}`);
        }
    }

    render() {
        const {auth} = this.props;
        if (!auth.uid)
            return <Redirect to='/signin'/>

        return (<Router>
            <div className="App">
                <header className="App-header">
                    <br/>
                    <br/>
                    <br/>
                    <Link className="showlink" to="/videos/page/">
                        All Videos
                    </Link>

                    <Link className="showlink" to="/favorite/page/">
                        Favorites
                    </Link>

                    <Link className="showlink" to="/recommended/page/">
                        Recommended Videos
                    </Link>
                    <br/>
                    <br/>

                </header>

                <div className="App-body">
                <br/>

                <h1 className="App-body">Enjoy the videos you love with non-stop streaming.</h1>
                <p className="App-body">Registered users get personalized video recommendations in their account.
                  Add videos to your favorites list when logged in and watch it at one place.</p>
                <br/>

                <Route path="/" component={VideosContainer} />
               </div>
            </div>
        </Router>);
    }
}

const mapStateToProps = (state) => {
    return {auth: state.firebase.auth}
};

export default connect(mapStateToProps)(App_1);
