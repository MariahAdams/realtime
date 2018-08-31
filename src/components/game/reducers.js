export const GAME_LOAD = 'GAME_LOAD';

export function game(state = null, { type, payload }) {
  return type === GAME_LOAD ? payload : state;
}