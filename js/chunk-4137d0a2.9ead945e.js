(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4137d0a2"],{"08ad":function(s,e,r){"use strict";r.r(e);var t=function(){var s=this,e=s.$createElement,r=s._self._c||e;return r("div",{staticClass:"followship-wrapper"},[r("ul",{staticClass:"followship-tabs"},[r("li",{staticClass:"followship-tab"},[r("router-link",{attrs:{to:{name:"followers",params:{id:s.paramsId}}}},[s._v(" 追隨者 ")])],1),r("li",{staticClass:"followship-tab"},[r("router-link",{attrs:{to:{name:"followings",params:{id:s.paramsId}}}},[s._v(" 正在追隨 ")])],1)]),s.isLoading?r("img",{staticClass:"spinner"}):s._l(s.followCards,(function(e){return r("div",{key:e.id,staticClass:"userFollowCards"},[r("div",{staticClass:"userFollowCards-left avatar"},[r("img",{staticClass:"avatar",attrs:{src:s._f("emptyImage")(e.avatar)}})]),r("div",{staticClass:"userFollowCards-right"},[e.isFollowed?r("button",{directives:[{name:"show",rawName:"v-show",value:s.currentUser.id!==e.followerId,expression:"currentUser.id !== followCard.followerId"}],staticClass:"btn active",attrs:{disabled:s.isProcessing},on:{click:function(r){return s.deleteFollow(e.followerId)}}},[s._v("正在跟隨")]):r("button",{directives:[{name:"show",rawName:"v-show",value:s.currentUser.id!==e.followerId,expression:"currentUser.id !== followCard.followerId"}],staticClass:"btn",attrs:{disabled:s.isProcessing},on:{click:function(r){return s.addFollow(e.followerId)}}},[s._v("跟隨")]),r("h5",{staticClass:"name"},[s._v(s._s(e.name))]),r("h5",{staticClass:"account"},[s._v(s._s(s._f("accountTag")(e.account)))]),r("p",[s._v(s._s(e.introduction))])])])}))],2)},a=[],o=(r("d9e2"),r("4cce")),i=r("2f62"),l=r("2fa3"),n=r("2708"),d={mixins:[n["a"],n["b"]],computed:{...Object(i["b"])(["currentUser"])},data(){return{paramsId:0,followCards:[],isLoading:!1,isProcessing:!1}},methods:{async fetchFollowCard(s){try{this.isLoading=!0;const{statusText:e,data:r}=await o["a"].getFollowers({userId:s});if(this.isLoading=!1,"OK"!==e)throw new Error;this.followCards=[...r]}catch(e){this.isLoading=!1,l["a"].fire({icon:"error",title:e.message})}},async addFollow(s){try{this.isProcessing=!0;const{data:e}=await o["a"].addFollow({id:s});if(this.isProcessing=!1,"success"!==e.status)throw new Error;l["a"].fire({icon:"success",title:e.message}),this.followCards=this.followCards.map(e=>e.followerId!==s?e:{...e,isFollowed:!0})}catch(e){this.isProcessing=!1,l["a"].fire({icon:"error",title:"無法進行追蹤，請稍後再試"})}},async deleteFollow(s){try{this.isProcessing=!0;const{data:e}=await o["a"].deleteFollow({followingId:s});if("success"!==e.status)throw new Error;this.isProcessing=!1,l["a"].fire({icon:"success",title:e.message}),this.followCards=this.followCards.map(e=>e.followerId!==s?e:{...e,isFollowed:!1})}catch(e){this.isProcessing=!1,l["a"].fire({icon:"error",title:"無法進行追蹤，請稍後再試"})}}},created(){const{id:s}=this.$route.params;this.paramsId=Number(s),this.fetchFollowCard(this.paramsId)},beforeRouteUpdate(){const{id:s}=this.$route.params;this.paramsId=Number(s),this.fetchFollowCard(this.paramsId)}},c=d,u=r("2877"),w=Object(u["a"])(c,t,a,!1,null,null,null);e["default"]=w.exports},"4cce":function(s,e,r){"use strict";var t=r("2fa3");const a=()=>localStorage.getItem("token");e["a"]={getUser({userId:s}){return t["b"].get("api/users/"+s,{headers:{Authorization:"Bearer "+a()}})},getUserTweets({userId:s}){return t["b"].get(`api/users/${s}/tweets`,{headers:{Authorization:"Bearer "+a()}})},getUserReplies({userId:s}){return t["b"].get(`api/users/${s}/replied_tweets`,{headers:{Authorization:"Bearer "+a()}})},getUserLikes({userId:s}){return t["b"].get(`api/users/${s}/likes`,{headers:{Authorization:"Bearer "+a()}})},getFollowers({userId:s}){return t["b"].get(`api/users/${s}/followers`,{headers:{Authorization:"Bearer "+a()}})},getFollowings({userId:s}){return t["b"].get(`api/users/${s}/followings`,{headers:{Authorization:"Bearer "+a()}})},editInformation({id:s,formData:e}){return t["b"].put("api/users/"+s,e,{headers:{Authorization:"Bearer "+a()}})},signEdit({userId:s,account:e,name:r,email:o,password:i,checkPassword:l}){return t["b"].put(`api/users/${s}/edit`,{account:e,name:r,email:o,password:i,checkPassword:l},{headers:{Authorization:"Bearer "+a()}})},addFollow({id:s}){return t["b"].post("/api/followships",{id:s},{headers:{Authorization:"Bearer "+a()}})},deleteFollow({followingId:s}){return t["b"].delete("api/followships/"+s,{headers:{Authorization:"Bearer "+a()}})},getTopUser(){return t["b"].get("api/users/top",{headers:{Authorization:"Bearer "+a()}})}}}}]);
//# sourceMappingURL=chunk-4137d0a2.9ead945e.js.map