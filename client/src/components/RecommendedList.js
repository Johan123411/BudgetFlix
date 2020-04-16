import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import '../App.css';

class RecommendedList extends Component {
    constructor(props) {
        super(props);
        this.searchShows = this.searchShows.bind(this);
        this.state = {
            data: undefined,
            isfavorite: undefined,
            loading: false,
            searchTerm: undefined,
            searchData: undefined,
            currentLink: 'https://pokeapi.co/api/v2/machine/',
            nextLink: undefined,
            prevLink: undefined,
            offset: 0,
            limit: 0
        };
        this.selected = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async getShows() {
        try {
            if (!this.props.match.params.page) {
                this.offset = 0;
                const response = await axios.get(`http://localhost:3001/recommendation/`);
                const favorites = await axios.get(`http://localhost:3001/favorites`);
                await this.setState({data: response.data, isfavorite: favorites.data});
            } else {
                this.offset = this.props.match.params.page * 20;
                this.limit = 20;
                const response = await axios.get(`http://localhost:3001/recommendation/`);
                const favorites = await axios.get(`http://localhost:3001/favorites`);
                await this.setState({data: response.data, isfavorite: favorites.data});
            }
        } catch (e) {
            console.log(e);
        }
    }

    async componentDidMount() {
        await this.getShows();
    }

    handleChange = (e) => {
        let value = e.target.value;
        this.setState({
            currentLink: value
        }, () => {
            this.getShows();
        });
    }

    handleClick = (e) => {
        let value = e.target.value;
        let isChecked = e.target.checked;

        if (isChecked === true) {
            axios.post(`http://localhost:3001/favorites/` + value).then(response => {
                console.log(response.data);
            });
        }

        if (isChecked === false) {
            axios.delete(`http://localhost:3001/favorites/` + value).then(response => {
                console.log(response.data);
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
    }

    searchShows() {
        try {
            //const response = await axios.get('https://pokeapi.co/api/v2/pokemon' + this.state.searchTerm);
            const response = axios.get(this.state.nextLink);
            this.setState({searchData: response.data, searchTerm: true});
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let body = null;
        let cols = null;
        let cnt = 0;
        console.log(cnt);
        if (this.state.data && this.state.isfavorite) {
            let favoritesList = this.state.isfavorite.map(videos => {
                return videos.id;
            });

            cols = this.state.data && this.state.data.map((shows, cnt) => {
                for (var i = 0; i < favoritesList.length; i++) {
                    if (favoritesList[i] === shows.id) {
                        return (<div className="col-md-4 col-sm-6" key={shows.id}>
                            <div className="card">
                                <div className="favorites-btn">
                                    <label htmlFor={shows.id} className="favorites-btn">
                                        <input type="checkbox" id={shows.id} name={shows.Key} value={shows.id} onClick={this.handleClick} defaultChecked="defaultChecked"/>
                                        <i className="glyphicon glyphicon-star-empty"></i>
                                        <i className="glyphicon glyphicon-star"></i>
                                        <span className="add-to-favorites">Add to Favorites</span>
                                    </label>
                                </div>

                                <Link to={`/recommended/${shows.id}/`}>
                                    <br/>
                                    <div className="container">
                                        <img src={shows.posterUrl} alt="Avatar" width="100%"/>
                                        <br/>
                                        <h2>
                                            <b>{shows.Key}</b>
                                        </h2>
                                    </div>
                                </Link>
                            </div>
                        </div>);
                    }
                }

                return (<div className="col-md-4 col-sm-6" key={shows.id}>
                    <div className="card">
                        <div className="favorites-btn">
                            <label htmlFor={shows.id} className="favorites-btn">
                                <input type="checkbox" id={shows.id} name={shows.Key} value={shows.id} onClick={this.handleClick}/>
                                <i className="glyphicon glyphicon-star-empty"></i>
                                <i className="glyphicon glyphicon-star"></i>
                                <span className="add-to-favorites">Add to Favorites</span>
                            </label>
                        </div>

                        <Link to={`/recommended/${shows.id}/`}>
                            <br/>
                            <div className="container">
                                <img src={shows.posterUrl} alt="Avatar" width="100%"/>
                                <br/>
                                <h2>
                                    <b>{shows.Key}</b>
                                </h2>
                            </div>
                        </Link>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>);
            });

            body = (<div>
                <h1>Recommended Videos</h1>
                <br/>
                <br/>
                <div className="row">{cols}</div>
            </div>);
        }
        return body;
    }
}

export default RecommendedList;
