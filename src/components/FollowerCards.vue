<template>
  <div class="followship-wrapper">
    <ul class="followship-tabs">
      <li class="followship-tab">
        <router-link :to="{ name: 'followers', params: { id: paramsId }}">
          追隨者
        </router-link>
      </li>
      <li class="followship-tab">
        <router-link :to="{ name: 'followings', params: { id: paramsId }}">
          正在追隨
        </router-link>
      </li>
    </ul>
    <img v-if="isLoading" class="spinner">
    <div v-else class="userFollowCards" 
      v-for="followCard in followCards" :key="followCard.id">
      <div class="userFollowCards-left avatar">
        <img class="avatar" :src="followCard.avatar | emptyImage">
      </div>
      <div class="userFollowCards-right">
        <button
          @click="deleteFollow(followCard.followingId)"
          v-if="followCard.isFollowed"
          class="btn active"
          :disabled="isProcessing"
        >正在跟隨</button>
        <button 
          @click="addFollow(followCard.followingId)"
          v-else
          class="btn"
          :disabled="isProcessing"
        >跟隨</button>
        <h5 class="name">{{ followCard.name }}</h5>
        <h5 class="account">{{ followCard.account | accountTag }}</h5>
        <p>{{ followCard.introduction }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "../apis/users";
import { mapState } from "vuex";
import { Toast } from "../utils/helpers";
import { accountTagFilter, emptyImageFilter } from "../utils/mixins";

export default {
  mixins: [accountTagFilter, emptyImageFilter],
  computed: {
    ...mapState(["currentUser"]),
  },
  data() {
    return {
      paramsId: 0,
      followCards: [],
      isLoading: false,
      isProcessing: false
    }
  },
  methods: {
    async fetchFollowCard(userId) {
      try {
        this.isLoading = true
        const { statusText, data } = await usersAPI.getFollowers({ userId })
        this.isLoading = false
        if (statusText !== "OK") throw new Error()
        this.followCards = [ ...data ]

      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: "error",
          title: error.message
        })
      }
    },
    async addFollow(id) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addFollow({ id })
        this.isProcessing = false
        if (data.status !== "success") throw new Error()
        Toast.fire({
          icon: "success",
          title: data.message
        })
        this.followCards = this.followCards.map(card => {
          if (card.followerId !== id) return card
          else return {
            ...card,
            isFollowed: true
          }
        })
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法進行追蹤，請稍後再試"
        })
      }
    },
    async deleteFollow(followingId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.deleteFollow({ followingId })
        if (data.status !== "success") throw new Error()
        this.isProcessing = false
        Toast.fire({
          icon: "success",
          title: data.message
        })
        this.followCards = this.followCards.map(card => {
          if (card.followerId !== followingId) return card
          else return {
            ...card,
            isFollowed: false
          }
        })
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法進行追蹤，請稍後再試"
        })
      }
    }
  },
  created() {
    const { id } = this.$route.params
    this.paramsId = Number(id)
    this.fetchFollowCard(this.paramsId)
  },
  beforeRouteUpdate() {
    const { id } = this.$route.params
    this.paramsId = Number(id)
    this.fetchFollowCard(this.paramsId)
  }
}
</script>