<template>
  <div>
    <button class="ui left labeled icon button" @click="$router.back()">
      <i class="left arrow icon"></i>
      Вернуться к списку пользователей
    </button>

    <h1>{{ user.name }}</h1>

    <div class="ui celled list">
      <div class="item" v-for="todo in todos" :key="todo.id">
        <div
          class="content"
          :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }"
        >
          {{ todo.title }}
        </div>
      </div>

      <div class="ui placeholder" v-if="loading">
        <div class="full line"></div>
        <div class="medium line"></div>
        <div class="short line"></div>
        <div class="long line"></div>
        <div class="very short line"></div>
        <div class="very long line"></div>
        <div class="full line"></div>
        <div class="medium line"></div>
        <div class="short line"></div>
        <div class="long line"></div>
        <div class="very short line"></div>
        <div class="very long line"></div>
        <div class="full line"></div>
        <div class="medium line"></div>
        <div class="short line"></div>
        <div class="long line"></div>
        <div class="very short line"></div>
        <div class="very long line"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import User from "@/interfaces/User";
import Todo from "@/interfaces/Todo";
import Vue from "vue";
import { PropType } from "vue/types/umd";
import { ACTION_TYPES } from "@/store/ActionTypes";

export default Vue.extend({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },
  data() {
    return {
      todos: [] as Todo[],
      loading: false
    };
  },
  methods: {
    updateTodos(userId: number) {
      this.getTodos(userId).then(response => {
        this.todos = response;
      });
    },
    getTodos(userId: number) {
      this.loading = true;

      return this.$store
        .dispatch(ACTION_TYPES.GET_TODOS_BY_USER_ID, userId)
        .finally(() => (this.loading = false));
    }
  },
  created() {
    this.updateTodos(this.user.id);
  }
});
</script>
