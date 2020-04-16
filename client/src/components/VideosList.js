import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../App.css';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';

class VideosList extends Component {
    constructor(props) {
        super(props);
        this.searchShows = this.searchShows.bind(this);
        this.state = {
            data: undefined,
            isfavorite: undefined,
            searchTerm: undefined,
            currentLink: '',
            filtered: null
        };
        this.selected = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async getShows() {
        try {
            this.offset = 0;
            const response = await axios.get(`http://localhost:3001/video`);
            const favorites = await axios.get(`http://localhost:3001/favorites`);
            await this.setState({data: response.data, isfavorite: favorites.data});
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

    searchShows(e) {
        console.log(e.target.value);
        var search = e.target.value;
        var filtered = this.state.data.filter((show) => {
            return show.Key.toLowerCase().includes(search.toLowerCase());
        });
        console.log(filtered);
        this.setState({filtered});
    }

    render() {
        const {auth} = this.props;
        if (!auth.uid)
            return <Redirect to='/signin'/>
        let body = null;
        let cols = null;
        let cnt = 0;
        console.log(cnt);

        if (this.state.data && this.state.isfavorite) {
            let favoritesList = this.state.isfavorite.map(videos => {
                return videos.id;
            });
            // console.log(favoritesList);
            if (this.state.filtered) {
                cols = this.state.filtered.map((shows, cnt) => {
                    for (var i = 0; i < favoritesList.length; i++) {
                        if (favoritesList[i] === shows.id) {
                            return (<div className="col-md-4 col-sm-6" key={shows.id}>
                                <div className="card">
                                    <div className="favorites-btn">
                                        <label htmlFor={shows.id} className="favorites-btn">
                                            <input type="checkbox" id={shows.id} name={shows.Key} value={shows.id} onClick={this.handleClick} defaultChecked="defaultChecked"/>
                                            <i className="glyphicon glyphicon-star-empty"></i>
                                            <i className="glyphicon glyphicon-star"></i>
                                            <span className="add-to-favorites">Favorites</span>
                                        </label>
                                    </div>

                                    <Link to={`/videos/${shows.id}/`}>
                                        <br/>
                                        <div className="container">
                                            <img src={shows.posterUrl} alt="Avatar" width="100%"/>
                                            <br/>
                                            <h2>{shows.Key}</h2>
                                        </div>
                                    </Link>

                                </div>

                                <br/>

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
                                    <span className="add-to-favorites">Favorites</span>
                                </label>
                            </div>

                            <Link to={`/videos/${shows.id}/`}>
                                <br/>
                                <div className="container">
                                    <img src={shows.posterUrl} alt="Avatar" width="100%"/>
                                    <br/>
                                    <h2>{shows.Key}</h2>
                                </div>
                            </Link>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>);
                });
            } else {
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
                                            <span className="add-to-favorites">Favorites</span>
                                        </label>
                                    </div>

                                    <Link to={`/videos/${shows.id}/`}>
                                        <br/>
                                        <div className="container">
                                            <img src={shows.posterUrl} alt="Avatar" width="100%"/>
                                            <br/>
                                            <h2>{shows.Key}</h2>
                                        </div>
                                    </Link>

                                </div>

                                <br/>

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
                                    <span className="add-to-favorites">Favorites</span>
                                </label>
                            </div>

                            <Link to={`/videos/${shows.id}/`}>
                                <br/>
                                <div className="container">
                                    <img src={shows.posterUrl} alt="Avatar" width="100%"/>
                                    <br/>
                                    <h2>{shows.Key}</h2>
                                </div>
                            </Link>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>);
                });
            }

            body = (<div>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-md-8">
                                <label for="search" className="search">Search:&nbsp;&nbsp;</label>
                                <input className="search" id = "search" type="text" name="searchTerm" onChange={this.searchShows} style={{width: "200px"}} placeholder="Search.."/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {cols}
                </div>
            </div>);
        }
        return body;
    }
}

const mapStateToProps = (state) => {
    return {auth: state.firebase.auth}
};

export default connect(mapStateToProps)(VideosList);
