<template>
  <modal
    name="replyCreate"
    classes="replyCreate-model"
    :adaptive="true"
    :width="600"
    :minHeight="450"
    :clickToClose="false"
  >
    <div class="replyCreate-wrapper">
      <div class="replyCreate-head">
        <img class="cross-orange" @click="hideReplyModal()" />
      </div>
      <div class="replyCreate-body">
        <div class="target-image">
          <img class="avatar" :src="tweetReplyTarget.avatar | emptyImage" />
          <span></span>
        </div>
        <div class="target-tweet">
          <div class="target-tweet-head">
            <h5 class="target-tweet-head-name">{{ tweetReplyTarget.name }}</h5>
            <h5>{{ tweetReplyTarget.account | accountTag }}</h5>
            <span>．</span>
            <h5>{{ tweetReplyTarget.createdAt | fromNow }}</h5>
          </div>
          <p>{{ tweetReplyTarget.description }}</p>
          <h5>
            回覆給 <strong>{{ tweetReplyTarget.account | accountTag }}</strong>
          </h5>
        </div>
        <div class="replyer-image">
          <img class="avatar" :src="currentUser.avatar | emptyImage" />
        </div>
        <div class="replyer-tweet">
          <textarea
            v-model="comment"
            placeholder="有什麼新鮮事？"
            focus
          ></textarea>
        </div>
      </div>
      <p>{{ wordLimit }}</p>
      <button
        class="btn active"
        @click="submitReply()"
        :disabled="isProcessing"
      >
        回覆
      </button>
    </div>
  </modal>
</template>

<script>
import tweetsAPI from "../apis/tweets";
import { mapState } from "vuex";
import {
  fromNowFilter,
  accountTagFilter,
  emptyImageFilter,
} from "../utils/mixins";
import { Toast } from "../utils/helpers";

export default {
  mixins: [fromNowFilter, accountTagFilter, emptyImageFilter],
  computed: {
    ...mapState(["currentUser", "tweetReplyTarget"]),
  },
  data() {
    return {
      replyTarget: {},
      paramsId: 0,
      comment: "",
      wordLimit: "",
      isProcessing: false,
    };
  },
  methods: {
    async submitReply() {
      try {
        if (this.comment.length < 1) {
          return (this.wordLimit = "內容不可空白");
        } else if (this.comment.length > 140) {
          return (this.wordLimit = "字數不可超過140字");
        }
        this.wordLimit = "";
        this.isProcessing = true;
        const { statusText, data } = await tweetsAPI.addNewReply({
          tweetId: this.tweetReplyTarget.id,
          comment: this.comment
        })
        if (statusText !== "OK" || data.status !== "success") throw new Error()
        this.isProcessing = false
        this.$store.commit("passReplyCreate", data.reply)
        this.hideReplyModal()
        if (this.$route.name === "main") this.$router.push(`/users/tweet/${data.reply.TweetId}`)
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    },
    hideReplyModal() {
      this.$modal.hide("replyCreate");
      this.comment = "";
      this.wordLimit = "";
    },
  },
  created() {
    const { id } = this.$route.params;
    this.paramsId = Number(id);
  },
};
</script>