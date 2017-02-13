import { combineReducers } from 'redux';

const MOVE_PADDLE = 'MOVE';
const MOVE_BALL   = 'MOVE_BALL';
const START_GAME  = 'START_GAME';
const END_GAME    = 'END_GAME';

export const movePaddle = (player, direction, maxY) => ({
  type: MOVE_PADDLE,
  player,     // 'playerOne', 'playerTwo'
  direction,   // 'up', 'down'
  maxY
});

export const moveBall = (maxX, maxY, leftPaddle, rightPaddle, ballX) => ({
  type: MOVE_BALL,
  maxX,
  maxY,
  leftPaddle,
  rightPaddle,
  ballX
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
      const { maxX, maxY, leftPaddle, rightPaddle } = action;

      // hit by left paddle
      if (x < 20 && y > leftPaddle && y < leftPaddle + 100)
        dx *= -1;

      // hit by right paddle
      else if (x > maxX - 40 && y > rightPaddle && y < rightPaddle + 100)
        dx *= -1;

      // hit left or right wall
      else if (x < 0 || x > maxX - 20)
        dx *= -1;

      // hit top or bottom wall
      if (y < 20 || y > maxY - 40)
        dy *= -1;

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

    case MOVE_BALL:
      if (action.ballX === 0 && action.player === 2)
        return Object.assign({}, state, {
          score: state.score + 1
        });
      else if (action.ballX >= action.maxX - 20 && action.player === 1)
        return Object.assign({}, state, {
          score: state.score + 1
        });

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
      const playerNumber = action.player;
      const player = state.players[playerNumber];
      const players = Object.assign({}, state.players, {
        [playerNumber]: playerReducer(player, action)
      });
      return Object.assign({}, state, { players });

    case MOVE_BALL:
      return Object.assign({}, state, {
        ball: ballReducer(state.ball, action),
        players: {
          1: playerReducer(state.players[1], Object.assign({}, action, { player: 1 })),
          2: playerReducer(state.players[2], Object.assign({}, action, { player: 2 }))
        }
      });

    default:
      return state;
  }
}

