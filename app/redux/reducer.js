import { combineReducers } from 'redux';

const MOVE_PADDLE = 'MOVE';
const MOVE_BALL   = 'MOVE_BALL';
const SCORE       = 'SCORE';
const START_GAME  = 'START_GAME';
const END_GAME    = 'END_GAME';

export const movePaddle = (player, direction, maxY) => ({
  type: MOVE_PADDLE,
  player,     // 'playerOne', 'playerTwo'
  direction,   // 'up', 'down'
  maxY
});

export const moveBall = (maxX, maxY) => ({
  type: MOVE_BALL,
  maxX,
  maxY
});

export const score = player => ({
  type: SCORE,
  player     // 'playerOne', 'playerTwo'
});

const initialBall = { x: 100, y: 100, dx: 4, dy: 4 };
const initialPlayer = { position: 100, score: 0 };
const initialPlayers = { 1: initialPlayer, 2: initialPlayer };

const initialState = {
  players: initialPlayers,
  ball: initialBall,
  gameStatus: 'start' // 'start', 'in-progress', 'ended'
};

function ballReducer (state = { x: 0, y: 0, dx: 4, dy: 4 }, action) {

  switch (action.type) {

    case MOVE_BALL:
      let { x, y, dx, dy } = state;
      const { maxX, maxY } = action;
      if (x < 0 || x > maxX - 20) dx *= -1;
      if (y < 20 || y > maxY - 40) dy *= -1;
      return { dx, dy, x: x + dx, y: y + dy };

    default:
      return state;
  }
}

function playerReducer (state = { position: 0, score: 0 }, action) {

  switch (action.type) {

    case MOVE_PADDLE:
      let dy = 10;

      if (action.direction === 'up') {
        if (state.position < 30)
          dy = 0;

        return Object.assign({}, state, {
          position: state.position - dy
        });
      }

      else if (action.direction === 'down') {
        if (state.position > action.maxY - 120)
          dy = 0;

        return Object.assign({}, state, {
          position: state.position + dy
        });
      }

    default:
      return state;

  }
}

export default function reducer (state = initialState, action) {

  switch (action.type) {

    case START_GAME:
      return Object.assign({}, state, {
        gameStatus: 'in-progress'
      });

    case END_GAME:
      return Object.assign({}, state, {
        gameStatus: 'ended'
      });

    case MOVE_PADDLE:
    case SCORE:
      const playerNumber = action.player;
      const player = state.players[playerNumber];
      const players = Object.assign({}, state.players, {
        [playerNumber]: playerReducer(player, action)
      });
      return Object.assign({}, state, { players });

    case MOVE_BALL:
      return Object.assign({}, state, {
        ball: ballReducer(state.ball, action)
      });

    default:
      return state;
  }
}

