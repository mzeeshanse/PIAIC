import * as actions from './actionTypes'

export function bugAdded(description) {
    return {
        type: actions.BUG_ADDED,
        payload: {
            description: description
        }
    };
}

export function bugRemoved(id) {
    return {
        type: "bugRemoved",
        payload : {
          id: id
        }
      };
}

export function increment() {
    return {
        type: actions.INCREMENT, 
    };
}

export function decrement() {
    return {
        type: actions.DECREMENT,
    };
}