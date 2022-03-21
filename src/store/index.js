/* import Vue from "vue";
import Vuex from "vuex";

Vue.useAttrs(Vuex);

export default new Vuex.Store({}); */

import { createStore } from 'vuex'

//Creating a new store
const store = createStore({
    state: {
        task: '',
        editedTask: null,
        authenticated: false,
        username: 'admin',
        filter: 'all',
        availableStatuses: ['to-do', 'in-progress', 'finished'],
        tasks:[
            {
            name: 'Steal bananas from the tree.',
            status: 'to-do',
            author: 'admin',
            archived: false
            },
            {
            name: 'Eat 2 pizzas in one hour',
            status: 'in-progress',
            author: 'admin',
            archived: false
            }
        ]
    },
    getters:{

    },
    mutations: {
        setAuthentication(state, status) {
            state.authenticated = status;
        }
    },
    actions:{

    }
  })

  export default store;