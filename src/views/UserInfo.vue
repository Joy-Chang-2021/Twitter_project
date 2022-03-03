<template>
  <div>
    <h2>其他 component</h2>
    <h3>追蹤</h3>
    <div class="followship-wrapper">
      <ul class="followship-tabs">
        <li class="followship-tab">
          <router-link :to="{ name: 'followers', params: { id: paramsId }}">
          <!-- <router-link :to="`/users/${paramsId}/followers`"> -->
            追隨者
          </router-link>
        </li>
        <li class="followship-tab">
          <router-link :to="{ name: 'followings', params: { id: paramsId }}">
          <!-- <router-link :to="`/users/${paramsId}/followings`"> -->
            正在追隨
          </router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      paramsId: 0
    }
  },
  created() {
    const { id } = this.$route.params
    this.paramsId = Number(id)
  },
  // 不要使用 beforeRouteUpdate()，會讓 router-link 失效
};
</script>
