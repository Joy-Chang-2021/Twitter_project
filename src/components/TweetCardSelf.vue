<template>
  <div>
    <div class="self-tweet" v-for="tweet in tweets" :key="tweet.id">
      <div class="tweetCard-wrapper">
        <div class="card-left avatar" @click="linkedUser(tweet.UserId)">
          <img class="avatar" :src="tweet.User.avatar | emptyImage" />
        </div>
        <div class="card-right" @click="linkedReply($event, tweet.id)">
          <div class="card-head">
            <h5 class="card-name" @click="linkedUser(tweet.UserId)">
              {{ tweet.User.name }}
            </h5>
            <h5 class="card-account">
              {{ tweet.User.account | accountTag }}
            </h5>
            <span>．</span>
            <h5 class="card-time">
              {{ tweet.createdAt | fromNow }}
            </h5>
          </div>
          <p>
            {{ tweet.description }}
          </p>

          <p></p>
          <div class="card-foot">
            <img
              class="reply"
              @click="
                showReplyModal(
                  tweet.id,
                  tweet.User.name,
                  tweet.UserId,
                  tweet.User.account,
                  tweet.User.avatar,
                  tweet.description,
                  tweet.createdAt
                )
              "
            />
            <h6>{{ tweet.replyCount }}</h6>
            <img
              v-if="tweet.isLiked"
              @click="deleteLikes(tweet.id)"
              class="heart-active"
            />
            <img v-else @click="addLikes(tweet.id)" class="heart" />
            <h6>{{ tweet.likeCount }}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tweetsAPI from "../apis/tweets";
import { Toast } from "../utils/helpers";
import {
  fromNowFilter,
  accountTagFilter,
  emptyImageFilter,
} from "../utils/mixins";
import { mapState } from "vuex";
import usersAPI from "../apis/users";

export default {
  mixins: [fromNowFilter, accountTagFilter, emptyImageFilter],

  data() {
    return {
      isProcessing: false,
      tweets: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async fetchUserTweets(userId) {
      
      try {
        const response = await usersAPI.getUserTweets({
          userId: this.$route.name === "selfTweet" ? this.currentUser.id : userId,
        });
        this.tweets = response.data;
        
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得最愛貼文資料，請稍後再試",
        });
      }
    },
    async addLikes(tweetId) {
      try {
        this.isProcessing = true;
        const { statusText, data } = await tweetsAPI.addLike({
          tweetId: tweetId,
        });
        if (statusText !== "OK" || data.status !== "success")
          throw new Error(statusText);
        this.isProcessing = false;
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            return {
              ...tweet,
              isLiked: true,
              likeCount: tweet.likeCount + 1,
            };
          }
          return tweet;
        });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法加入最愛，請稍後再試",
        });
      }
    },
    async deleteLikes(tweetId) {
      try {
        this.isProcessing = true;
        const { statusText, data } = await tweetsAPI.deleteLike({
          tweetId: tweetId,
        });
        if (statusText !== "OK" || data.status !== "success")
          throw new Error(statusText);
        this.isProcessing = false;
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            return {
              ...tweet,
              isLiked: false,
              likeCount: tweet.likeCount - 1,
            };
          }
          return tweet;
        });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法取消最愛，請稍後再試",
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
    linkedReply($event, tweetId) {
      // 點擊卡片可進入瀏覽回覆頁面、若點擊到愛心則不跳轉畫面
      if (
        $event.target.matches(".reply") ||
        $event.target.matches(".heart") ||
        $event.target.matches(".heart-active") ||
        $event.target.matches(".avatar") ||
        $event.target.matches(".card-name")
      )
        return;

      this.$router.push({ name: "tweet", params: { id: tweetId } });
    },
    showReplyModal(id, name, userId, account, avatar, description, createdAt) {
      this.$modal.show("replyCreate");
      const replyTargetData = {
        id,
        name,
        userId,
        account,
        avatar,
        description,
        createdAt,
      };
      this.$store.commit("setTweetReplyTarget", replyTargetData);
    },
    
  },
  created() {
    this.fetchUserTweets(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchUserTweets(to.params.id);
    next();
  },
  
};
</script>