export class Store {
  #state; #mutations; #actions; 
  state = {};
  #subscribers = []; // 구독자 목록을 관리할 배열

  constructor({ state, mutations, actions }) {
    this.#state = state;
    this.#mutations = mutations;
    this.#actions = actions;

    Object.keys(state).forEach(key => {
      Object.defineProperty(this.state, key, {
        get: () => this.#state[key],
      })
    })
  }


  commit(action, payload) {
     this.#mutations[action](this.#state, payload);
  }
 
}
