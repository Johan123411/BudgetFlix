import React, {Component} from 'react';
import axios from 'axios';
import '../App.css';
import {Player} from 'video-react';
import "../../node_modules/video-react/dist/video-react.css";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

class Video extends Component {
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
            const response1 = await axios.get(`http://localhost:3001/video/${this.props.match.params.id}`);
            this.setState({data1: response1.data, loading: false});
        } catch (e) {
            console.log(`error ${e}`);
        }
    }
    render() {
        const {auth} = this.props;
        if (!auth.uid)
            return <Redirect to='/signin'/>

        let body = null;
        if (this.state.loading) {
            body = (<div>
                <h1>Please Wait...</h1>
                <br/>
            </div>);
        } else if (this.state.error) {
            body = (<div>
                <h1>{this.state.error}</h1>
            </div>);
        } else {
            body = (<div className="megaCard">

                <div className="megaContainer">
                    <h2>
                        <b>{this.state.data1.Key}</b>
                    </h2>
                </div>

                <Player className="video-react" playsInline poster={this.state.data1.posterUrl} src={this.state.data1["url"]} type="video/mp4" fluid={false} width={800} height={400} marginLeft="200" marginRight="200" marginBottom="200" marginTop="200"/>

				<div className="container">
                <h3>Genre</h3>
                <h4>
                    {this.state.data1.Genre}
                </h4>
                <br/>
				</div>
            </div>);
        }
        return body;
    }
}

const mapStateToProps = (state) => {
    return {auth: state.firebase.auth}
};

export default connect(mapStateToProps)(Video);
