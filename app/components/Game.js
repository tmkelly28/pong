import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paddle from './Paddle';
import Score from './Score';
import Ball from './Ball';
import { moveBall, movePaddle } from '../redux/reducer';

class Game extends Component {

  componentDidMount () {
    requestAnimationFrame(this.props.loop)
    window.addEventListener('keydown', evt => {
      const key = evt.key;
      if (key === 'a') this.props.movePaddle(1, 'down');
      else if (key === 'q') this.props.movePaddle(1, 'up');
      else if (key === 'l') this.props.movePaddle(2, 'down');
      else if (key === 'p') this.props.movePaddle(2, 'up');
    });
  }

  render () {
    return (
      <div className="container">
        <div className="game-piece top bar"></div>
        <Paddle player={1} position="left" />
        <Score player={1} />
        <div className="game-piece middle divider"></div>
        <Score player={2} />
        <Paddle player={2} position="right" />
        <div className="game-piece bottom bar"></div>
        <Ball />
      </div>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = (dispatch) => {

  const step = () => {
    dispatch(moveBall(window.innerWidth, window.innerHeight))
    requestAnimationFrame(step);
  };

  return {
    loop: () => requestAnimationFrame(step),
    movePaddle: (player, direction) => dispatch(movePaddle(player, direction, window.innerHeight))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
