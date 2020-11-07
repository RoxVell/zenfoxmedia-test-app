<template>
  <div>
    <table class="table-users ui celled table selectable fixed">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        <router-link
          v-for="user in users"
          :key="user.id"
          tag="tr"
          :to="{ name: `User`, params: { user } }"
        >
          <td data-label="Name">{{ user.name }}</td>
          <td data-label="Email">{{ user.email }}</td>
          <td data-label="Phone">{{ user.phone }}</td>
        </router-link>
      </tbody>
    </table>
    <Pagination
      :currentPage="currentPage"
      :maxPage="maxPage"
      @changePage="changePage($event)"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Pagination from "@/components/Pagination.vue";
import User from "@/interfaces/User";
import { ACTION_TYPES } from "@/store/ActionTypes";
import { GetUsersPayload } from "@/store";

export default Vue.extend({
  components: {
    Pagination
  },
  data() {
    return {
      users: [] as User[],
      currentPage: 1,
      maxPage: 0
    };
  },
  methods: {
    updateUsers(page = 1, limit = 5) {
      this.$store
        .dispatch(ACTION_TYPES.GET_USERS, { page, limit })
        .then(({ totalUserCount, users }: GetUsersPayload) => {
          this.users = users;
          this.maxPage = Math.ceil(totalUserCount / limit);
        });
    },
    changePage(page: number) {
      this.currentPage = page;
      this.updateUsers(this.currentPage);
      this.$router.replace({ query: { page: String(this.currentPage) } });
    }
  },
  created() {
    if (Number(this.$router.currentRoute.query.page)) {
      this.currentPage = Number(this.$router.currentRoute.query.page);
    }

    this.updateUsers(this.currentPage);
  }
});
</script>

<style scoped>
table.table-users tr {
  cursor: pointer;
}
</style>
