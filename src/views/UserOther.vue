<template>
  <div>
    <UserCard
      :currentUserData="currentUserData"
      :whichPage="whichPage"
    />
    <div class="switchTabs">
      <div
        class="tweetTab"
        :class="[{ activeTabs: tabNow === 1 }]"
        @click="$router.push({ name: 'otherTweet',params: { id: currentUserData.id }}),tabNow = 1"
      >
        推文
      </div>
      <div
        class="replyTab"
        :class="[{ activeTabs:tabNow === 2 }]"
        @click="$router.push({ name: 'otherReply',params: { id: currentUserData.id }}),tabNow = 2"
      >
        推文與回覆
      </div>
      <div
        class="likeTab"
        :class="[{ activeTabs: tabNow === 3 }]"
        @click="$router.push({ name: 'otherLike',params: { id: currentUserData.id }}),tabNow = 3"
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

export default {
  components: {
    UserCard,
  },
  data() {
    return {
      whichPage: false, //true代表個人false代表他人
      tabNow: 1, //1推文 2回復 3喜歡
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
        isFollowed:false
      },
    };
  },
  
  methods: {
    async fetchUser(userId) {
      try {
        const response = await usersAPI.getUser({
          userId: userId?userId:this.$route.params.id,
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
          tweetCount:response.data.tweetCount,
          isFollowed:response.data.isFollowed
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
  beforeRouteUpdate(to, from, next) {
    this.fetchUser(to.params.id);
    next();
  },
  
    
    
  
};
</script>