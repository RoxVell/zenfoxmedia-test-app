import User from '@/interfaces/User';
import Todo from '@/interfaces/Todo';
import Vue from "vue";
import Vuex from "vuex";
import { ACTION_TYPES } from '@/store/ActionTypes';

Vue.use(Vuex);

export type GetUsersPayload = {
  users: User[];
  totalUserCount: number;
}

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    [ACTION_TYPES.GET_USERS](_, { page, limit = 5 }): Promise<GetUsersPayload> {
      return fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`)
        .then((response) => {
          const totalUserCount = Number(response.headers.get("x-total-count"));
          return Promise.all([Promise.resolve(totalUserCount), response.json()]);
        })
        .then(([totalUserCount, users]) => {
          return { totalUserCount, users };
        });
    },
    [ACTION_TYPES.GET_TODOS_BY_USER_ID](_, userId: number): Promise<Todo[]> {
      return fetch(
        `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
      )
        .then(response => response.json());
    }
  },
  modules: {}
});
