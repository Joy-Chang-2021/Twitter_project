<template>
  <div class="tweetCard-wrapper">
    <div class="card-left avatar">
      <img class="avatar" :src="tweetUser.avatar | emptyImage">
    </div>
    <div class="card-right">
      <div class="card-head">
        <h5 class="card-name">
          {{ tweetUser.name }}
        </h5>
        <h5 class="card-account">
          {{ tweetUser.account | accountTag }}
        </h5>
        <span>．</span>
        <h5 class="card-time">
          {{ createdAt | fromNow }}
        </h5>
        <div class="card-cancel">
          <img @click="deleteCard(id)" class="cross-grey">
        </div>
      </div>
      <div class="card-description">
        {{ description | wordLimit }}
      </div>
    </div>
  </div>
</template>

<script>
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'
import { fromNowFilter, accountTagFilter, emptyImageFilter } from '../utils/mixins'
export default {
  mixins: [fromNowFilter, accountTagFilter, emptyImageFilter],
  props: {
    tweetCard: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      id: 0,
      tweetUser: {},
      description: '',
      createdAt: '',
      isProcessing: false
    }
  },
  methods: {
    fetchTweetCard() {
      const { User, description, id, createdAt } = this.tweetCard
      this.id = id
      this.tweetUser = User
      this.description = description
      this.createdAt = createdAt
    },
    async deleteCard(tweetId) {
      try {
        this.isProcessing = true
        const { data, statusText } = await adminAPI.deleteTweet({ tweetId })
        this.isProcessing = false
        if (statusText !== "OK") throw new Error(data)
        Toast.fire({
          icon: 'success',
          title: data.message
        })
        this.$emit('after-delete', tweetId)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法刪除貼文，請稍後再試'
        })
      }
    }
  },
  created() {
    this.fetchTweetCard()
  },
  filters: {
    wordLimit(text) {
      return text.length > 50 ? 
        text.substring(0, 49) + '...' : text
    }
  }
}
</script>