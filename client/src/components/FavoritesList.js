import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class FavoritesList extends Component {
    constructor(props) {
        super(props);
        this.searchShows = this.searchShows.bind(this);
        this.state = {
            data: undefined,
            loading: false,
            searchTerm: undefined,
            searchData: undefined,
            currentLink: 'https://pokeapi.co/api/v2/berry',
            nextLink: undefined,
            prevLink: undefined,
            offset: 0,
            limit: 0
        };
    }

    async getShows() {
        try {
            if (!this.props.match.params.page) {
                this.offset = 0;
                const response = await axios.get(`http://localhost:3001/favorites/`);
                await this.setState({data: response.data});
            } else {
                this.offset = this.props.match.params.page * 20;
                this.limit = 20;
                const response = await axios.get(`http://localhost:3001/favorites/`);
                await this.setState({data: response.data});
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
        // console.log(value);
        // console.log(isChecked);

        if (isChecked === true) {
            axios.delete(`http://localhost:3001/favorites/` + value).then(response => {
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

        cols = this.state.data && this.state.data.map((shows, cnt) => {

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

                    <Link to={`/favorite/${this.state.data && this.state.data[cnt].id}/`}>
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

        body = (<div >
            <h1>Favorites</h1>
            <br/>
            <br/>
            <div className="row">
                {cols}
            </div>
        </div>);

        return body;
    }
}

export default FavoritesList;
