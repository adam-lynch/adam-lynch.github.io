import Vuex from 'vuex'
import state from './state'

const createStore = () => {
  return new Vuex.Store({
    state
  })
}

export default createStore
