import { pubsub } from './pubsub.js';
export class Store {
  #state; #mutations; #actions; 
  state = {};


  constructor({ state, mutations, actions }) {
    this.#state = state;
    this.#mutations = mutations;
    this.#actions = actions;

    Object.keys(state).forEach(key => {
      Object.defineProperty(this.state, key, {
        get: () => this.#state[key],
        set: (newValue) => {
          this.#state[key] = newValue;
        }
      })
    })
  }

  commit(action, payload) {
     this.#mutations[action](this.#state, payload);
  }

}

