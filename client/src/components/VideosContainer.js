import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import VideosList from './VideosList';
import Video from './Video';
import Favorite from './Favorite';
import FavoritesList from './FavoritesList';
import Recommended from './Recommended';
import RecommendedList from './RecommendedList';
import HomePageCarousel from './HomePageCarousel';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

class VideosContainer extends Component {
    render() {
        const {auth} = this.props;
        if (!auth.uid)
            return <Redirect to='/signin'/>

        return (<div>
            <Switch>
                <Route path="/videos/page/" exact component={VideosList}/>
                <Route path="/videos/:id" exact component={Video}/>
                <Route path="/favorite/page/" exact component={FavoritesList}/>
                <Route path="/favorite/:id" exact component={Favorite}/>
                <Route path="/recommended/page/" exact component={RecommendedList}/>
                <Route path="/recommended/:id" exact component={Recommended}/>
                <Route path="/" component={HomePageCarousel}/>
            </Switch>
        </div>);
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {auth: state.firebase.auth, profile: state.firebase.profile}
};

export default connect(mapStateToProps)(VideosContainer);
