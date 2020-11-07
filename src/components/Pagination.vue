<template>
  <div class="buttons">
    <button
      class="ui labeled icon button"
      @click="changePage(1)"
      :disabled="currentPage === 1"
    >
      Первая
    </button>
    <button
      class="ui button"
      @click="changePage(currentPage - 1)"
      :disabled="currentPage - 1 < 1"
    >
      <i class="left chevron icon"></i>
      Предыдущая
    </button>
    <h4>{{ currentPage }}</h4>
    <button
      class="ui button"
      :disabled="currentPage === maxPage"
      @click="changePage(currentPage + 1)"
    >
      Следующая
      <i class="right chevron icon"></i>
    </button>
    <button
      class="ui right labeled icon button"
      :disabled="currentPage === maxPage"
      @click="changePage(maxPage)"
    >
      Последняя
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Pagination",
  props: {
    currentPage: {
      type: Number
    },
    maxPage: {
      type: Number
    }
  },
  methods: {
    changePage(page: number) {
      this.$emit("changePage", page);
    }
  }
});
</script>

<style scoped>
.buttons h4 {
  display: inline;
  padding: 0 10px;
}
</style>
