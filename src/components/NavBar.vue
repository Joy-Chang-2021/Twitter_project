<template>
  <div class="navBar-wrapper">
    <div class="container">
      <div class="logoContainer">
        <router-link to="/users/main">
          <img class="logo" alt="" />
        </router-link>
      </div>
      <div class="content">
        <div class="homeTab">
          <router-link class="navItem" to="/users/main">
            <div class="icon">
              <img class="home" alt="" />
            </div>
            首頁
          </router-link>
        </div>
        <div class="selfTab">
          <router-link class="navItem" to="/users/self/tweet">
            <div class="icon">
              <img class="person" alt="" />
            </div>
            個人資料
          </router-link>
        </div>
        <div class="settingTab">
          <router-link class="navItem" to="/setting">
            <div class="icon">
              <img class="setting" alt="" />
            </div>
            設定
          </router-link>
        </div>
      </div>
      <button
        class="btn"
        @click.prevent.stop="showNewCreateModal()"
      >
        推文
      </button>
      <div class="logoutTab">
        <button class="logoutButton" @click="logout()">
          <div class="icon">
            <img class="logout" alt="" />
          </div>
          登出
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentUser","isAuthenticated"]),
  },
  methods: {
    logout() {
      this.$store.commit('revokeAuthentication')
      this.$router.push('/signin')
    },
    showNewCreateModal() {
      // 打開 modal
      this.$modal.show("tweetCreate");
    },
  }
}
</script>