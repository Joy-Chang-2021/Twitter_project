<template>
  <div class="popular-wrapper">
    <div class="title">Popular</div>
    <img v-if="isLoading" class="spinner">
    <div v-else class="popularCard" v-for="user in popularUser" :key="user.id">
      <div class="avatar-wrapper">
        <img
          :src="user.avatar | emptyImage"
          alt=""
          @click="linkedUser(user.id)"
        />
      </div>
      <div class="name-wrapper" @click="linkedUser(user.id)">
        {{ user.name }}
        <div class="account-wrapper">{{ user.account | accountTag }}</div>
      </div>
      <button
        class="addFollow btn"
        @click.stop.prevent="addFollow(user.id)"
        v-if="!user.isFollowed"
        :disabled="isProcessing"
      >
        跟隨
      </button>
      <button
        class="deleteFollow btn"
        @click.stop.prevent="deleteFollow(user.id)"
        v-else
        :disabled="isProcessing"
      >
        正在跟隨
      </button>
    </div>
  </div>
</template>
<script>
import usersAPI from "./../apis/users";
import { mapState } from "vuex";
import { Toast } from "../utils/helpers";
import { accountTagFilter, emptyImageFilter } from "./../utils/mixins";

export default {
  mixins: [accountTagFilter, emptyImageFilter],
  data() {
    return {
      popularUser: [],
      isProcessing: false,
      isLoading: false
    };
  },
  created() {
    this.fetchPopular();
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async fetchPopular() {
      try {
        this.isLoading = true;
        const response = await usersAPI.getTopUser();
        this.isLoading = false;
        this.popularUser = response.data;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得熱門使用者資料，請稍後再試",
        });
      }
    },
    linkedUser(userId) {
      this.$router.push({ name: "otherTweet", params: { id: userId } });
    },
    async addFollow(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.addFollow({ id: userId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.isProcessing = false;
        this.popularUser = this.popularUser.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowed: true,
            };
          }
          return user;
        });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法追隨使用者，請稍後再試",
        });
        console.log("error", error);
      }
    },
    async deleteFollow(followingId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.deleteFollow({ followingId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.isProcessing = false;
        this.popularUser = this.popularUser.map((user) => {
          if (user.id === followingId) {
            return {
              ...user,
              isFollowed: false,
            };
          }
          return user;
        });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法取消追隨使用者，請稍後再試",
        });
        console.log("error", error);
      }
    },
  },
};
</script>