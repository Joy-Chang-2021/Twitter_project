<template>
  <div class="middle-container">
    <UserCard :currentUserData="currentUserData" :whichPage="whichPage" />
    <div class="switchTabs">
      <div
        class="tweetTab"
        :class="[{ activeTabs: this.$route.name === selfTweet }]"
        @click="$router.push({ name: 'selfTweet' }), (tabNow = 1)"
      >
        推文
      </div>
      <div
        class="replyTab"
        :class="[{ activeTabs: this.$route.name === reply }]"
        @click="$router.push({ name: 'reply' }), (tabNow = 2)"
      >
        推文與回覆
      </div>
      <div
        class="likeTab"
        :class="[{ activeTabs: this.$route.name === like }]"
        @click="$router.push({ name: 'like' }), (tabNow = 3)"
      >
        喜歡的內容
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import UserCard from "./../components/UserCard";
import usersAPI from "./../apis/users";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";
export default {
  components: {
    UserCard,
  },
  data() {
    return {
      whichPage: true, //true代表個人false代表他人
      tabNow: 1, //1推文 2回復 3喜歡
      selfTweet: "selfTweet", //判斷用
      reply: "reply", //判斷用
      like: "like", //判斷用
      currentUserData: {
        id: 0,
        account: "",
        name: "",
        email: "",
        avatar: "",
        cover: "",
        introduction: "",
        followingCount: 0,
        follwerCount: 0,
        tweetCount: 0,
      },
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async fetchUser() {
      try {
        const response = await usersAPI.getUser({
          userId: this.currentUser.id,
        });

        this.currentUserData = {
          id: response.data.id,
          account: response.data.account,
          name: response.data.name,
          email: response.data.email,
          avatar: response.data.avatar,
          cover: response.data.cover,
          introduction: response.data.introduction,
          followingCount: response.data.followingCount,
          follwerCount: response.data.follwerCount,
          tweetCount: response.data.tweetCount,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
  },
  created() {
    this.fetchUser();
  },

  watch: {
    currentUser(newValue) {
      // 監控 UserCardEdit 是否修改 vuex 資料
      // 將新資料覆蓋進 data 中渲染畫面
      this.currentUserData = {
        ...this.currentUserData,
        ...newValue,
      };
    },
  },
};
</script>