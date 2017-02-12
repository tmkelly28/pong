import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ball extends Component {

  render () {

    const style = {
      left: this.props.x,
      top: this.props.y,
    };

    return <div className="game-piece ball" style={style}></div>
  }
}

const mapStateToProps = (state) => {
  return {
    x: state.ball.x,
    y: state.ball.y
  };
}

export default connect(mapStateToProps)(Ball);
