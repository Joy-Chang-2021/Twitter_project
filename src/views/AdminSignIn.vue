<template>
  <div class="signin-wrapper">
    <!-- todo: 從共用scss變數中引用icon -->
    <img class="logo-big" alt="">
    <h2>後台登入</h2>
    <div class="form-wrapper">
      <form id="signInForm" @submit.prevent.stop="handleFormSubmit">
          <!-- 輸入框 -->
          <label for=""
            :class="['label', { isInvalid: account.isInvalid }]"
          >
            帳號
            <input v-model.trim="account.text" name="account" type="text">
          </label>
          <div class="wordLimit-wrapper">
            <h5>{{ worLimitMessage(account) }}</h5>
            <h5>{{ wordLimitCount(account) }}</h5>
          </div>
          <!-- 輸入框 -->
          <label for="" :class="['label', { isInvalid: password.isInvalid }]">
            密碼
            <input
              v-model.trim="password.text"
              name="password"
              type="password"
              autocomplete="off"
            />
          </label>
          <div class="wordLimit-wrapper">
            <h5>{{ worLimitMessage(password) }}</h5>
            <h5>{{ wordLimitCount(password) }}</h5>
          </div>
          <button
           form="signInForm"
           type="submit"
           class="btn active"
           :disabled="isProcessing"
        >
            登入
          </button>
      </form>
    </div>

    <div class="link-wrapper">
      <router-link to="/signin" class="link">
        前台登入
      </router-link>
    </div>
  </div>
</template>

<script>
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";

export default {
   data() {
    return {
      // input 一個輸入框為一組
      account: {
        text: "",
        isInvalid: false,
      },
      password: {
        text: "",
        isInvalid: false,
      },
      isProcessing: false,
    };
  },
  computed: {
    worLimitMessage() {
      return (input) => {
        if (input.text.length > 50) {
          input.isInvalid = true;
          return "字數超過上限！";
        } else {
          input.isInvalid = false;
          return "";
        }
      };
    },
    wordLimitCount() {
      // 計算帶入input的字數
      return (input) => {
        if (input.text.length < 1) return "";
        else return input.text.length + "/50";
      };
    },
  },
 methods: {
    async handleFormSubmit() {
      try {
        const account = this.account.text;
        const password = this.password.text;
        if (!account || !password)
          return Toast.fire({
            icon: "error",
            title: "帳號密碼不可空白",
          });
        else if (account.length > 50 || password.length > 50)
          return Toast.fire({
            icon: "error",
            title: "字數超過上限",
          });
        // 當前端檢查過關：
        this.isProcessing = true;
        const { data, statusText } = await adminAPI.adminSignIn({
          account,
          password
        });
        // 當串接失敗
        console.log(data)
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(data.message);
        }
        // 當串接成功：
        this.isProcessing = false;
        // todo: 待確認 data 階層是否修改
        localStorage.setItem('token', data.token)
        this.$store.commit('setCurrentUser', data.user)
        this.$router.push('/admin/tweets')

      } catch (error) {
        this.isProcessing = false;
        this.password.text = "";
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    },
  },
};
</script>