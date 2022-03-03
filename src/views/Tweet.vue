<template>
  <div>
    <img v-if="isLoading" class="spinner">
    <div v-else>
      <div class="tweet-wrapper">
        <div class="tweet-title">
          <img @click="$router.back()" class="arrow" />
          <h3>推文</h3>
        </div>
        <div class="tweet-main">
          <div class="card-head">
            <div class="card-head-left avatar" @click="linkedUser(user.id)">
              <img
                class="avatar"
                :src="user.avatar | emptyImage"
              />
            </div>
            <div class="card-head-right">
              <h5 @click="linkedUser(user.id)">{{ user.name }}</h5>
              <h5>{{ user.account | accountTag }}</h5>
            </div>
          </div>
          <div class="tweet-body">
            <p>{{ repliedTweet.description }}</p>
            <h5>{{ repliedTweet.createdAt | timeFormat }}</h5>
          </div>
          <div class="tweet-footer">
            <div class="tweet-footer-info">
              <h4><strong>{{ replyCards.length }}</strong> 回覆</h4>
              <h4><strong>{{ repliedTweet.likeCount }}</strong> 喜歡次數</h4>
            </div>
            <div class="tweet-footer-buttons">
              <img class="reply-big" @click="showReplyModal()" />
              <img
                v-if="repliedTweet.isLiked"
                @click="deleteLike()"
                class="heart-big-active"
              />
              <img v-else @click="addLike()" class="heart-big" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="tweet-replies"
        v-for="replyCard in replyCards"
        :key="replyCard.id"
      >
        <TweetReplyCard :reply-target="user" :reply-card="replyCard" />
      </div>
    </div>
  </div>
</template>

<script>
import TweetReplyCard from "../components/TweetReplyCard.vue";
import tweetsAPI from "../apis/tweets"
import { mapState } from "vuex"
import { accountTagFilter, timeFormatFilter, emptyImageFilter } from "../utils/mixins";
import { Toast } from "../utils/helpers"

export default {
  name: "Tweet",
  components: {
    TweetReplyCard,
  },
  mixins: [accountTagFilter, timeFormatFilter, emptyImageFilter],
  computed: {
    ...mapState(["currentUser", "replyCreate"]),
  },
  data() {
    return {
      paramsId: 0,
      user: {},
      repliedTweet: {},
      replyCards: [],
      isLoading: false,
      isProcessing: false,
    };
  },
  methods: {
    async fetchRepliedTweet(paramsId) {
      // 主貼文資料：
      try {
        this.isLoading = true
        const { data, statusText } = await tweetsAPI.getRepliedTweet({ tweetId: paramsId })
        if (statusText !== "OK") throw new Error(statusText)
        this.isLoading = false
        this.user = data.User
        this.repliedTweet = { ...data }
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: "error",
          title: "無法取得推文內容，請稍後再試"
        })
      }
    },
    async fetchTweetReplyCards(paramsId) {
      // 所有回覆卡片的陣列
      try {
        this.isLoading = true
        const { data, statusText } = await tweetsAPI.getAllReplies({ tweetId: paramsId })
        if (statusText !== "OK") throw new Error(statusText)
        this.isLoading = false
        this.replyCards = [ ...data ]
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: "error",
          title: "無法取得回覆推文，請稍後再試"
        })
      }
    },
    afterSubmitReplyCreate(data) {
      this.replyCards.unshift({
        comment: data.comment,
        id: data.id, 
        createdAt: data.createdAt,
        User: {
          avatar: this.currentUser.avatar,
          account: this.currentUser.account,
          name: this.currentUser.name
        }
      })
    },
    async addLike() {
      try {
        this.isProcessing = true
        const { statusText, data } = await tweetsAPI.addLike({
          tweetId: this.paramsId
        })
        if (statusText !== "OK" || data.status !== "success") throw new Error(statusText)
        this.isProcessing = false
        this.repliedTweet.isLiked = true;
        this.repliedTweet.likeCount ++
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法加入最愛，請稍後再試"
        })
      }
    },
    async deleteLike() {
      try {
        this.isProcessing = true
        const { statusText, data } = await tweetsAPI.deleteLike({ 
          tweetId: this.paramsId
        })
        if (statusText !== "OK" || data.status !== "success") throw new Error(statusText)
        this.isProcessing = false
        this.repliedTweet.isLiked = false;
        this.repliedTweet.likeCount --
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法取消最愛，請稍後再試"
        })
      }
    },
    linkedUser(userId) {
       if (userId === this.currentUser.id) {
        this.$router.push({ name: "self" });
      } else {
        this.$router.push({ name: "other", params: { id: userId } });
      }
    },
    showReplyModal() {
      this.$modal.show("replyCreate");
      const { id, User, description, createdAt } = this.repliedTweet
      const replyTargetData = {
        id,
        name: User.name,
        userId: User.id,
        account: User.account,
        avatar: User.avatar,
        description,
        createdAt,
      }
      this.$store.commit("setTweetReplyTarget", replyTargetData)
    },
  },
  created() {
    const { id } = this.$route.params
    this.paramsId = Number(id)
    this.fetchRepliedTweet(this.paramsId)
    this.fetchTweetReplyCards(this.paramsId);
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.paramsId = Number(id)
    this.fetchRepliedTweet(this.paramsId)
    this.fetchTweetReplyCards(this.paramsId)
    next()
  },
  watch: {
    replyCreate (newValue) {
      this.afterSubmitReplyCreate(newValue)
    }
  }
};
</script>