(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-07143eee"],{"4cce":function(e,r,t){"use strict";var s=t("2fa3");const a=()=>localStorage.getItem("token");r["a"]={getUser({userId:e}){return s["b"].get("api/users/"+e,{headers:{Authorization:"Bearer "+a()}})},getUserTweets({userId:e}){return s["b"].get(`api/users/${e}/tweets`,{headers:{Authorization:"Bearer "+a()}})},getUserReplies({userId:e}){return s["b"].get(`api/users/${e}/replied_tweets`,{headers:{Authorization:"Bearer "+a()}})},getUserLikes({userId:e}){return s["b"].get(`api/users/${e}/likes`,{headers:{Authorization:"Bearer "+a()}})},getFollowers({userId:e}){return s["b"].get(`api/users/${e}/followers`,{headers:{Authorization:"Bearer "+a()}})},getFollowings({userId:e}){return s["b"].get(`api/users/${e}/followings`,{headers:{Authorization:"Bearer "+a()}})},editInformation({id:e,formData:r}){return s["b"].put("api/users/"+e,r,{headers:{Authorization:"Bearer "+a()}})},signEdit({userId:e,account:r,name:t,email:i,password:n,checkPassword:o}){return s["b"].put(`api/users/${e}/edit`,{account:r,name:t,email:i,password:n,checkPassword:o},{headers:{Authorization:"Bearer "+a()}})},addFollow({id:e}){return s["b"].post("/api/followships",{id:e},{headers:{Authorization:"Bearer "+a()}})},deleteFollow({followingId:e}){return s["b"].delete("api/followships/"+e,{headers:{Authorization:"Bearer "+a()}})},getTopUser(){return s["b"].get("api/users/top",{headers:{Authorization:"Bearer "+a()}})}}},b047:function(e,r,t){"use strict";t.r(r);var s=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[e.isLoading?t("img",{staticClass:"spinner"}):e._e(),e._l(e.replys,(function(r){return t("div",{key:r.id,staticClass:"self-reply"},[t("div",{staticClass:"tweetReplyCard-wrapper"},[t("div",{staticClass:"card-left avatar",on:{click:function(t){return e.linkedUser(r.User.id)}}},[t("img",{staticClass:"avatar",attrs:{src:e._f("emptyImage")(r.User.avatar)}})]),t("div",{staticClass:"card-right"},[t("div",{staticClass:"card-head"},[t("h5",{staticClass:"card-name",on:{click:function(t){return e.linkedUser(r.User.id)}}},[e._v(" "+e._s(r.User.name)+" ")]),t("h5",{staticClass:"card-account"},[e._v(" "+e._s(e._f("accountTag")(r.User.account))+" ")]),t("span",[e._v("．")]),t("h5",{staticClass:"card-time"},[e._v(" "+e._s(e._f("fromNow")(r.createdAt))+" ")])]),t("h5",[t("span",[e._v("回覆")]),t("span",{staticClass:"card-replyer",on:{click:function(t){return e.linkedUser(r.Tweet.User.id)}}},[e._v(" "+e._s(e._f("accountTag")(r.Tweet.User.account))+" ")])]),t("p",[e._v(e._s(r.comment))])])])])}))],2)},a=[],i=t("2708"),n=t("2f62"),o=t("4cce"),c=t("2fa3"),u={mixins:[i["c"],i["a"],i["b"]],data(){return{replys:[],isLoading:!1}},computed:{...Object(n["b"])(["currentUser"])},methods:{async fetchUserReplies(e){try{this.isLoading=!0;const r=await o["a"].getUserReplies({userId:"reply"===this.$route.name?this.currentUser.id:e});this.isLoading=!1,this.replys=r.data}catch(r){this.isLoading=!1,c["a"].fire({icon:"error",title:"無法取得所有回文資料，請稍後再試"})}},linkedUser(e){e===this.currentUser.id?this.$router.push({name:"selfTweet"}):this.$router.push({name:"otherTweet",params:{id:e}})}},created(){this.fetchUserReplies(this.$route.params.id)},beforeRouteUpdate(e,r,t){this.fetchUserReplies(e.params.id),t()}},d=u,l=t("2877"),h=Object(l["a"])(d,s,a,!1,null,null,null);r["default"]=h.exports}}]);
//# sourceMappingURL=chunk-07143eee.8189d7cb.js.map