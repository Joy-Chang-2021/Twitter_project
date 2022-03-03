<template>
  <div class="userCard-wrapper">
    <div class="title-wrapper">
      <button @click="$router.back()">
        <img alt="" class="arrow" />
      </button>
      <div class="name-wrapper">
        {{ userData.name }}
        <div class="tweetCount">{{ userData.tweetCount }}推文</div>
      </div>
    </div>
    <div class="user-wrapper">
      <img :src="userData.cover | emptyImage" alt="" class="cover" />
      <img :src="userData.avatar | emptyImage" alt="" class="avatar-big" />
      <button class="btn btn-edit" v-if="whichPage" @click="showEditModal()">
        編輯個人資料
      </button>
      <div class="otherButton" v-else>
        <img src="" alt="" class="message" />
        <img
          src=""
          alt=""
          class="notice"
          v-if="isNotice"
          @click="isNotice = false"
        />
        <img
          src=""
          alt=""
          class="notice-active"
          v-else
          @click="isNotice = true"
        />
        <button
          class="btn btnDeleteFollow"
          v-if="userData.isFollowed"
          @click="deleteFollow(userData.id)"
          :disabled="isProcessing"
        >
          正在追隨
        </button>
        <button
          class="btn btnAddFollow"
          v-else
          @click="addFollow(userData.id)"
          :disabled="isProcessing"
        >
          追隨
        </button>
      </div>
      <div class="information-wrapper">
        <div class="name">{{ userData.name }}</div>
        <div class="account">{{ userData.account | accountTag }}</div>
        <div class="introduce">{{ userData.introduction }}</div>
        <div class="follow">
          <router-link
            :to="{ name: 'followings', params: { id: userData.id }}"
            class="strong"
          >
            {{ userData.followingCount | numberFormatTC }}個
          </router-link>
          追隨中
          <router-link
            :to="{ name: 'followers', params: { id: userData.id }}"
            class="strong2"
            >{{ userData.follwerCount | numberFormatTC }}位
            </router-link>
          追隨者
        </div>
      </div>
    </div>
    <!-- Modal -->
    <UserCardEdit />
    <!-- Modal -->
  </div>
</template>
<script>
import UserCardEdit from "../components/UserCardEdit.vue";
import { accountTagFilter } from "./../utils/mixins";
import { numberFormatTCFilter } from "./../utils/mixins";
import { emptyImageFilter } from "../utils/mixins";
import usersAPI from "./../apis/users";
import { Toast } from "../utils/helpers";

export default {
  mixins: [accountTagFilter, numberFormatTCFilter, emptyImageFilter],
  components: {
    UserCardEdit,
  },
  props: {
    currentUserData: {
      type: Object,
      default: () => ({
        id: 0,
        account: "",
        name: "",
        email: "",
        avatar: "",
        cover: "",
        introduction: "",
        followingCount: 0,
        follwerCount: 0,
        isFollowed: "",
        tweetCount:0
      }),
    },
    whichPage: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      userData: {
        id: 0,
        account: "",
        name: "",
        email: "",
        avatar: "",
        cover: "",
        introduction: "",
        followingCount: 0,
        follwerCount: 0,
        isFollowed: "",
        tweetCount: 0
      },
      isNotice: true,
      isProcessing: false,
    };
  },
  watch: {
    currentUserData(newValue) {
      this.userData = {
        ...this.userData,
        ...newValue,
      };
    },
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.userData.id = this.currentUserData.id;
      this.userData.account = this.currentUserData.account;
      this.userData.name = this.currentUserData.name;
      this.userData.email = this.currentUserData.email;
      this.userData.avatar = this.currentUserData.avatar;
      this.userData.cover = this.currentUserData.cover;
      this.userData.introduction = this.currentUserData.introduction;
      this.userData.followingCount = this.currentUserData.followingCount;
      this.userData.follwerCount = this.currentUserData.follwerCount;
      this.userData.isFollowed = this.currentUserData.isFollowed;
      this.userData.tweetCount = this.currentUserData.tweetCount;
    },
    showEditModal() {
      // 打開 modal
      this.$modal.show("userCardEdit");
    },
    hideEditModal() {
      // (預設)關閉 modal
      this.$modal.hide("userCardEdit");
    },
    async addFollow(userId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.addFollow({ id: userId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.isProcessing = false;
        this.userData = {
          ...this.userData,
          isFollowed: true,
        };
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法追隨使用者，請稍後再試",
        });
        console.log("error", error);
      }
    },
    async deleteFollow(followingId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.deleteFollow({ followingId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.isProcessing = false;
        this.userData = {
          ...this.userData,
          isFollowed: false,
        };
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法取消追隨使用者，請稍後再試",
        });
        console.log("error", error);
      }
    },
  },
};
</script>