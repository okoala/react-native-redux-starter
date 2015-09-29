import { CALL_GRAPHQL } from '../middleware/api';
import * as Action from '../constants/ActionTypes'

export function createTodo (text) {
  const opts = {
    body: JSON.stringify({
      query: `
        mutation RootMutationType ($text) {
          todo: createTodo(text) {
            _id,
            text,
            createdAt
          }
        }
      `,
      params: { text }
    })
  }

  return dispatch => dispatch({
    [CALL_GRAPHQL]: {
      method: 'POST',
      types: [Action.GRAPHQL_ACTION],
      params: opts
    }
  });
}
