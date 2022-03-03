<template>
  <div class="app-double-column">
    <div class="left-container">
      <AdminNavBar />
    </div>
    <div class="middle-container">
      <div class="main-wrapper">
        <h3 class="main-title">推文清單</h3>
      </div>
      <img v-if="isLoading" class="spinner">
      <div
        v-else
        class="main-tweets"
        v-for="tweetCard in tweetCards"
        :key="tweetCard.id"
      >
        <AdminFeedList 
          :tweet-card="tweetCard"
          @after-delete="afterDelete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavBar from '../components/AdminNavBar.vue';
import AdminFeedList from '../components/AdminFeedList.vue';
import tweetsAPI from "../apis/tweets";
import { Toast } from '../utils/helpers';

export default {
  components: {
    AdminNavBar,
    AdminFeedList,
  },
    data() {
    return {
      tweetCards: [],
      isLoading: false,
      isProcessing: false
    };
  },
  methods: {
    async fetchTweetCards() {
      try {
        this.isLoading = true
        const { data, statusText } = await tweetsAPI.getAllTweets()
        this.isLoading = false
        if (statusText !== "OK") throw new Error(statusText)
        this.tweetCards = [ ...data ]
      } catch (error) {
        this.isLoading = true
        Toast.fire({
          icon: 'error',
          title: '無法取得主頁資料，請稍後再試'
        })
      }
    },
    afterDelete(tweetId) {
      this.tweetCards = this.tweetCards.filter(card => card.id !== tweetId)
    }
  },
  created() {
    this.fetchTweetCards();
  },
};
</script>