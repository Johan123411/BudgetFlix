import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import jumanji from '../img/jumanji.png';
import toy_story from '../img/toy_story.png';
import golden_eye from '../img/golden_eye.png';
import space_jam from '../img/space_jam.png';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

class ControlledCarousel extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleSelect = this.handleSelect.bind(this);
  
      this.state = {
        index: 0,
        direction: null,
      };
    }
  
    handleSelect(selectedIndex, e) {
      this.setState({
        index: selectedIndex,
        direction: e.direction,
      });
    }
  
    render() {

      const {auth} = this.props;
        if (!auth.uid)
          return <Redirect to='/signin'/>

        const { index, direction } = this.state;
        return (
          <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
          wrap = {true}
         >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={jumanji}
              alt="Jumanji (1995)"
            />
            <div className="text-block"> 
              <h2 className="text-block">Jumanji (1995)</h2>
              <p>PG 1995 ‧ Fantasy/Thriller ‧ 1h 44m</p>
              <p>Adventure ‧ Fantasy ‧ Family</p>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={toy_story}
              alt="Toy Story (1995)"
            />
            <div className="text-block">
              <h2 className="text-block">Toy Story (1995)</h2>
              <p>G 1995 ‧ Fantasy/Adventure ‧ 1h 21m</p>
              <p>Animation ‧ Comedy ‧ Family</p>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={golden_eye}
              alt="GoldenEye (1995)"
            />
            <div className="text-block">
              <h2 className="text-block">GoldenEye (1995)</h2>
              <p>PG-13 1995 ‧ Thriller/Action ‧ 2h 10m</p>
              <p>Action ‧ Adventure ‧ Thriller</p>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={space_jam}
              alt="Space Jam (1996)"
            />
            <div className="text-block">
              <h2 className="text-block">Space Jam (1996)</h2>
              <p>PG 1996 ‧ Fantasy/Sci-fi ‧ 1h 40m</p>
              <p>Animation ‧ Adventure ‧ Comedy ‧ Family</p>
            </div>
          </Carousel.Item>
        </Carousel>
      );
    }
  }

const mapStateToProps = (state) => {
    return {auth: state.firebase.auth}
};

export default connect(mapStateToProps)(ControlledCarousel); 
