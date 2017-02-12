import React, { Component } from 'react';
import { connect } from 'react-redux';

class Score extends Component {

  render () {

    const { player, score } = this.props;
    return <div className={`game-piece score score-player-${player}`}>{ score }</div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    player: ownProps.player,
    score: state.players[ownProps.player].score
  };
};

export default connect(mapStateToProps)(Score);
