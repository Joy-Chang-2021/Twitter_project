<template>
  <section class="center-view">
    <div class="admin-login">
      <Toast :ToastMessage="ToastMessage" />
      <div class="logo"></div>
      <h2>後台登入</h2>
      <account-login-form
        @after-form-submit="afterFormSubmit"
        :isProcessing="isProcessing"
        :clearPasswordInput="clearPasswordInput"
      />
      <div class="login__actions">
        <router-link class="link" to="/login">前台登入</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import AccountLoginForm from "../components/AccountLoginForm.vue";
import { Toast } from "../utils/helpers";
// // import adminAPI from "../api/admin";

export default {
  components: {
    AccountLoginForm,
    Toast,
  },
  data() {
    return {
      // 母層須 props 此物件給 Toast 做為控制參數
      ToastMessage: {
        message: "",
        dataStatus: "",
      },
      // 預設後端回傳錯誤訊息
      backendReturnStatus: false,
      // 防止使用者重複點擊
      isProcessing: false,
      clearPasswordInput: false,
    };
  },

};
</script>