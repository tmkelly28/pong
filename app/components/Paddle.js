import React, { Component } from 'react';
import { connect } from 'react-redux';

class Paddle extends Component {

  render () {

    const { position } = this.props;
    const style = { top: this.props.top };

    return <div className={`game-piece paddle ${position}`} style={style}></div>
  }
}

const mapStateToProps = (state, ownProps) => {
  const player = ownProps.player;

  return {
    position: ownProps.position, // TODO: clean up this nomenclature
    top: state.players[player].position
  };
};

export default connect(mapStateToProps)(Paddle);
