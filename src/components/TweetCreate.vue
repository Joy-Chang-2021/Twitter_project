<template>
  <modal name="tweetCreate"       
    classes="tweetCreat-modal"
    :width="600" :height="300"
    :clickToClose="false">
    <div class="tweetCreate-wrapper">
      <div class="tweetCreate-head">
        <img class="cross-orange" @click="hideNewCreateModal()">
      </div>
      <div class="tweetCreate-body">
        <div class="tweetCreate-left">
          <img class="avatar" :src="currentUser.avatar | emptyImage">
        </div>
        <div class="tweetCreate-right">
          <textarea 
            v-model="description"
            placeholder="有什麼新鮮事？"
            focus
          ></textarea>
          <p>{{ wordLimit }}</p>
          <button 
            class="btn active"
            @click="submitTweet()"
            :disabled="isProcessing"
          >
            推文
          </button>
        </div>
      </div>
    </div>
  </modal> 
</template>

<script>
import tweetsAPI from "../apis/tweets"
import { mapState } from "vuex"
import { Toast } from "../utils/helpers"
import { emptyImageFilter } from "../utils/mixins";

export default {
  name: 'tweetCreate',
  mixins: [emptyImageFilter],
  data() {
    return {
      description: "",
      wordLimit: "",
      isProcessing: false
    }
  },
  methods: {
    hideNewCreateModal() {
      // 關閉 modal、清空輸入框
      this.$modal.hide('tweetCreate')
      this.description = ""
      this.wordLimit = ""
    },
    async submitTweet() {
      try {
        if (this.description.length < 1) {
          return this.wordLimit = "內容不可空白"
        } else if (this.description.length > 140) {
          return this.wordLimit = "字數不可超過140字"
        }
        this.wordLimit = ""
        this.isProcessing = true
        const response = await tweetsAPI.addNewTweet({
          description: this.description
        })
        if (response.statusText !== "OK") throw new Error()
        this.isProcessing = false
        this.hideNewCreateModal()
        this.$store.commit("passTweetCreate", response.data)
        if (this.$route.name !== "main") this.$router.push("/users/main")
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法新增推文，請稍後再試"
        })
      }
    }
  },
  computed: {
    ...mapState(["currentUser"]),
  },
}
</script>