<template>
  <div>
    <img v-if="isLoading" class="spinner">
    <div class="self-reply" v-for="reply in replys" :key="reply.id">
      <div class="tweetReplyCard-wrapper">
        <div class="card-left avatar" @click="linkedUser(reply.User.id)">
          <img class="avatar" :src="reply.User.avatar | emptyImage" />
        </div>
        <div class="card-right">
          <div class="card-head">
            <h5 class="card-name" @click="linkedUser(reply.User.id)">
              {{ reply.User.name }}
            </h5>
            <h5 class="card-account">
              {{ reply.User.account | accountTag }}
            </h5>
            <span>．</span>
            <h5 class="card-time">
              {{ reply.createdAt | fromNow }}
            </h5>
          </div>
          <h5>
            <span>回覆</span>
            <span class="card-replyer" @click="linkedUser(reply.Tweet.User.id)">
              {{ reply.Tweet.User.account | accountTag }}
            </span>
          </h5>
          <p>{{ reply.comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  fromNowFilter,
  accountTagFilter,
  emptyImageFilter,
} from "../utils/mixins";
import { mapState } from "vuex";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  mixins: [fromNowFilter, accountTagFilter, emptyImageFilter],

  data() {
    return {
      replys: [],
      isLoading:false
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
  async fetchUserReplies(userId) {
      try {
        this.isLoading = true;
        const response = await usersAPI.getUserReplies({
          userId:
            this.$route.name === "reply"
              ? this.currentUser.id
              : userId,
        });
        this.isLoading = false;
        this.replys = response.data;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得所有回文資料，請稍後再試",
        });
      }
    },

    linkedUser(userId) {
      if (userId === this.currentUser.id) {
        this.$router.push({ name: "selfTweet" });
      } else {
        this.$router.push({ name: "otherTweet", params: { id: userId } });
      }
    },
    
  },
  created() {
    this.fetchUserReplies(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchUserReplies(to.params.id);
    next();
  },
};
</script>