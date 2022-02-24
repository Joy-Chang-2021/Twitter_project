<template>
  <form
    @submit.prevent.stop="handleFormSubmit"
    class="account-setting-form"
    action=""
    novalidate
  >
    <div class="form-row">
      <label for="account" class="form-row__label"> 帳號 </label>
      <input
        v-model="accountDetail.account"
        id="account"
        class="form-row__input"
        :class="{ invalid: formValidation.account.error }"
        type="text"
        name="account"
        required
      />
      <div v-if="formValidation.account.error" class="form-row__error-message">
        {{ formValidation.account.message }}
      </div>
    </div>
    <div class="form-row">
      <label for="password" class="form-row__label"> 密碼 </label>
      <input
        v-model="accountDetail.password"
        id="password"
        class="form-row__input"
        :class="{ invalid: formValidation.password.error }"
        type="password"
        name="password"
        required
      />
      <div v-if="formValidation.password.error" class="form-row__error-message">
        {{ formValidation.password.message }}
      </div>
    </div>
    <button type="submit" class="account-setting-form__submit-btn btn" :disabled="isProcessing">
      登入
    </button>
  </form>
</template>

<script>
export default {
  name: "AccountSettingForm",
  props: {
    isProcessing: {
      type: Boolean,
      required: true,
    },
    clearPasswordInput: {
        type: Boolean,
        default: false
      },
  },
  data() {
    return {
      accountDetail: {
        account: "",
        password: "",
        role: "user",
      },
      formValidation: {
        account: {
          error: false,
          message: "",
        },
        password: {
          error: false,
          message: "",
        },
      },
    };
  },
  watch: {
    clearPasswordInput: function () {
      if (this.clearPasswordInput) {
        this.clearInput()
      }
    }
  },
  methods: {
    handleFormSubmit() {
      // reset data of this.formValidation
      const fileName = Object.keys(this.formValidation);
      fileName.forEach((name) => {
        this.formValidation[name].error = false;
        this.formValidation[name].message = "";
      });

      // form validation of account
      if (this.accountDetail.account.trim().length === 0) {
        this.formValidation.account.error = true;
        this.formValidation.account.message = "請填入帳號";
        return;
      }

      // form validation of password
      if (this.accountDetail.password.trim().length === 0) {
        this.formValidation.password.error = true;
        this.formValidation.password.message = "請填入密碼";
        return;
      }
      // formSubmit
      this.$emit("after-form-submit", this.accountDetail);
    },
    clearInput () {
      this.accountDetail.password = ''
    }
  },
};
</script>