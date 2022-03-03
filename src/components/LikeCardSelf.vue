<template>
  <div>
    <div class="self-like" v-for="likeTweet in likeTweets" :key="likeTweet.id">
      <div class="tweetCard-wrapper">
        <div class="card-left avatar" @click="linkedUser(likeTweet.Tweet.UserId)">
          <img class="avatar" :src="likeTweet.Tweet.User.avatar | emptyImage" />
        </div>
        <div
          class="card-right"
          @click="linkedReply($event, likeTweet.Tweet.id)"
        >
          <div class="card-head">
            <h5 class="card-name" @click="linkedUser(likeTweet.Tweet.UserId)">
              {{ likeTweet.Tweet.User.name }}
            </h5>
            <h5 class="card-account">
              {{ likeTweet.Tweet.User.account | accountTag }}
            </h5>
            <span>．</span>
            <h5 class="card-time">
              {{ likeTweet.Tweet.createdAt | fromNow }}
            </h5>
          </div>
          <p>
            {{ likeTweet.Tweet.description }}
          </p>

          <p></p>
          <div class="card-foot">
            <img
              class="reply"
              @click="
                showReplyModal(
                  likeTweet.Tweet.id,
                  likeTweet.Tweet.User.name,
                  likeTweet.Tweet.UserId,
                  likeTweet.Tweet.User.account,
                  likeTweet.Tweet.User.avatar,
                  likeTweet.Tweet.description,
                  likeTweet.Tweet.createdAt
                )
              "
            />
            <h6>{{ likeTweet.replyCount }}</h6>
            <img
              v-if="likeTweet.isLiked"
              @click="deleteLikes(likeTweet.Tweet.id)"
              class="heart-active"
            />
            <img v-else @click="addLikes(likeTweet.Tweet.id)" class="heart" />
            <h6>{{ likeTweet.likeCount }}</h6>
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
      likeTweets: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async fetchLikeTweets(userId) {
      try {
        const response = await usersAPI.getUserLikes({
          userId: this.$route.name === "like" ? this.currentUser.id : userId,
        });
        this.likeTweets = response.data;
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
        this.likeTweets = this.likeTweets.map((tweet) => {
          if (tweet.Tweet.id === tweetId) {
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
        this.likeTweets = this.likeTweets.map((tweet) => {
          if (tweet.Tweet.id === tweetId) {
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
      console.log(userId)
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
    this.fetchLikeTweets(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchLikeTweets(to.params.id);
    next();
  },
};
</script>