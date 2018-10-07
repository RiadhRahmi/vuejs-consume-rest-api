import Vue from 'vue'
import Vuex from "vuex";
Vue.use(Vuex);

import {todo} from './todo.module';
import {example} from './example.module';



export const store = new Vuex.Store({
  modules: {
    todo,
    example
  }
})
