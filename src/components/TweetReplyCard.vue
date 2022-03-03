<template>
  <div class="tweetReplyCard-wrapper">
    <div class="card-left avatar" @click="linkedUser(userId)">
      <img class="avatar" :src="avatar | emptyImage" />
    </div>
    <div class="card-right">
      <div class="card-head">
        <h5 class="card-name" @click="linkedUser(userId)">
          {{ userName }}
        </h5>
        <h5 class="card-account">
          {{ userAccount | accountTag }}
        </h5>
        <span>．</span>
        <h5 class="card-time">
          {{ createdAt | fromNow }}
        </h5>
      </div>
      <h5>
        <span>回覆</span>
        <span class="card-replyer" @click="linkedUser(targetUserId)">
          {{ targetAccount | accountTag }}
        </span>
      </h5>
      <p>{{ comment }}</p>
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

export default {
  mixins: [fromNowFilter, accountTagFilter, emptyImageFilter],
  props: {
    // 被回覆者的資料
    replyTarget: {
      type: Object,
      required: true,
    },
    // 每筆回覆貼文的資料
    replyCard: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // 被回覆的對象
      targetAccount: "",
      targetUserId: 0,
      // 此卡片的其他資料
      tweetId: 0,
      userId: 0,
      comment: "",
      createdAt: "",
      userName: "",
      userAccount: "",
      avatar: "",
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    fetchReplyCard() {
      // 被回覆的對象 // TODO: 個人頁面待 API 加入此值
      this.targetAccount = this.replyTarget.account;
      this.targetUserId = this.replyTarget.id;
      // 此卡片的其他資料
      const { id, comment, createdAt, UserId, User } = this.replyCard;
      this.tweetId = id;
      this.userId = UserId;
      this.comment = comment;
      this.createdAt = createdAt;
      this.userName = User.name;
      this.userAccount = User.account;
      this.avatar = User.avatar;
    },
    linkedUser(userId) {
      if (userId === this.currentUser.id) {
        this.$router.push({ name: "self" });
      } else {
        this.$router.push({ name: "other", params: { id: userId } });
      }
    },
  },
  created() {
    this.fetchReplyCard();
  },
  watch: {
    replyCard(newValue) {
      this.replyCard = newValue;
      this.fetchReplyCard();
    },
    replyTarget(newValue) {
      this.replyTarget = newValue;
      this.fetchReplyCard();
    },
  },
};
</script>