import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paddle from './Paddle';
import Score from './Score';
import Ball from './Ball';
import store from '../redux/store';
import { moveBall, movePaddle } from '../redux/reducer';

class Game extends Component {

  componentDidMount () {
    this.props.loop();
    this.keys = {};

    window.addEventListener('keydown', evt => {
      const key = evt.key;
      this.keys[key] = true;
      if (this.keys['a']) setTimeout(this.props.movePaddle(1, 'down'))
      if (this.keys['q']) setTimeout(this.props.movePaddle(1, 'up'))
      if (this.keys['l']) setTimeout(this.props.movePaddle(2, 'down'))
      if (this.keys['p']) setTimeout(this.props.movePaddle(2, 'up'))
    });

    window.addEventListener('keyup', evt => {
      const key = evt.key;
      this.keys[key] = false;
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
    const leftPaddle = store.getState().players[1].position;
    const rightPaddle = store.getState().players[2].position;
    const ballX = store.getState().ball.x;
    dispatch(moveBall(
      window.innerWidth,
      window.innerHeight,
      leftPaddle,
      rightPaddle,
      ballX
    ));
    requestAnimationFrame(step);
  };

  return {
    loop: () => requestAnimationFrame(step),
    movePaddle: (player, direction) => dispatch(movePaddle(player, direction, window.innerHeight))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
