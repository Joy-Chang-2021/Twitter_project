<template>
  <div>
    <div class="main-wrapper">
      <h3 class="main-title">首頁</h3>
      <div class="main-create" @click="showNewCreateModal()">
        <img class="avatar" :src="currentUser.avatar | emptyImage" />
        <p>有什麼新鮮事？</p>
        
        <button class="btn active">推文</button>
      </div>
      <MainTweetCard/>
    </div>
  </div>
</template>

<script>
import MainTweetCard from "../components/MainTweetCard.vue";
import { mapState } from "vuex";
import { emptyImageFilter } from "../utils/mixins";

export default {
  name: "Main",
  mixins: [emptyImageFilter],
  components: {
    MainTweetCard,
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapState(["currentUser", "tweetCreate"]),
  },
  methods: {
    showNewCreateModal() {
      this.$modal.show("tweetCreate");
    },
  },
};
</script>