(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f0872f38"],{"4cce":function(e,t,s){"use strict";var r=s("2fa3");const a=()=>localStorage.getItem("token");t["a"]={getUser({userId:e}){return r["b"].get("api/users/"+e,{headers:{Authorization:"Bearer "+a()}})},getUserTweets({userId:e}){return r["b"].get(`api/users/${e}/tweets`,{headers:{Authorization:"Bearer "+a()}})},getUserReplies({userId:e}){return r["b"].get(`api/users/${e}/replied_tweets`,{headers:{Authorization:"Bearer "+a()}})},getUserLikes({userId:e}){return r["b"].get(`api/users/${e}/likes`,{headers:{Authorization:"Bearer "+a()}})},getFollowers({userId:e}){return r["b"].get(`api/users/${e}/followers`,{headers:{Authorization:"Bearer "+a()}})},getFollowings({userId:e}){return r["b"].get(`api/users/${e}/followings`,{headers:{Authorization:"Bearer "+a()}})},editInformation({id:e,formData:t}){return r["b"].put("api/users/"+e,t,{headers:{Authorization:"Bearer "+a()}})},signEdit({userId:e,account:t,name:s,email:i,password:o,checkPassword:n}){return r["b"].put(`api/users/${e}/edit`,{account:t,name:s,email:i,password:o,checkPassword:n},{headers:{Authorization:"Bearer "+a()}})},addFollow({id:e}){return r["b"].post("/api/followships",{id:e},{headers:{Authorization:"Bearer "+a()}})},deleteFollow({followingId:e}){return r["b"].delete("api/followships/"+e,{headers:{Authorization:"Bearer "+a()}})},getTopUser(){return r["b"].get("api/users/top",{headers:{Authorization:"Bearer "+a()}})}}},aa0a:function(e,t,s){"use strict";s("cdc1")},cdc1:function(e,t,s){},f3e9:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[e.isLoading?s("img",{staticClass:"spinner"}):e._e(),e._l(e.tweets,(function(t){return s("div",{key:t.id,staticClass:"self-tweet"},[s("div",{staticClass:"tweetCard-wrapper"},[s("div",{staticClass:"card-left avatar",on:{click:function(s){return e.linkedUser(t.User.id)}}},[s("img",{staticClass:"avatar",attrs:{src:e._f("emptyImage")(t.User.avatar)}})]),s("div",{staticClass:"card-right",on:{click:function(s){return e.linkedReply(s,t.id)}}},[s("div",{staticClass:"card-head"},[s("h5",{staticClass:"card-name",on:{click:function(s){return e.linkedUser(t.User.id)}}},[e._v(" "+e._s(t.User.name)+" ")]),s("h5",{staticClass:"card-account"},[e._v(" "+e._s(e._f("accountTag")(t.User.account))+" ")]),s("span",[e._v("．")]),s("h5",{staticClass:"card-time"},[e._v(" "+e._s(e._f("fromNow")(t.createdAt))+" ")])]),s("p",[e._v(" "+e._s(t.description)+" ")]),s("p"),s("div",{staticClass:"card-foot"},[s("img",{staticClass:"reply",on:{click:function(s){return e.showReplyModal(t.id,t.User.name,t.UserId,t.User.account,t.User.avatar,t.description,t.createdAt)}}}),s("h6",[e._v(e._s(t.replyCount))]),t.isLiked?s("img",{staticClass:"heart-active",on:{click:function(s){return e.deleteLikes(t.id)}}}):s("img",{staticClass:"heart",on:{click:function(s){return e.addLikes(t.id)}}}),s("h6",[e._v(e._s(t.likeCount))])])])])])}))],2)},a=[],i=(s("d9e2"),s("6783")),o=s("2fa3"),n=s("2708"),c=s("2f62"),d=s("4cce"),u={mixins:[n["c"],n["a"],n["b"]],data(){return{isProcessing:!1,tweets:[],isLoading:!1}},computed:{...Object(c["b"])(["currentUser"])},methods:{async fetchUserTweets(e){try{this.isLoading=!0;const t=await d["a"].getUserTweets({userId:"selfTweet"===this.$route.name?this.currentUser.id:e});this.isLoading=!1,this.tweets=t.data}catch(t){this.isLoading=!1,o["a"].fire({icon:"error",title:"無法取得最愛貼文資料，請稍後再試"})}},async addLikes(e){try{this.isProcessing=!0;const{statusText:t,data:s}=await i["a"].addLike({tweetId:e});if("OK"!==t||"success"!==s.status)throw new Error(t);this.isProcessing=!1,this.tweets=this.tweets.map(t=>t.id===e?{...t,isLiked:!0,likeCount:t.likeCount+1}:t)}catch(t){this.isProcessing=!1,o["a"].fire({icon:"error",title:"無法加入最愛，請稍後再試"})}},async deleteLikes(e){try{this.isProcessing=!0;const{statusText:t,data:s}=await i["a"].deleteLike({tweetId:e});if("OK"!==t||"success"!==s.status)throw new Error(t);this.isProcessing=!1,this.tweets=this.tweets.map(t=>t.id===e?{...t,isLiked:!1,likeCount:t.likeCount-1}:t)}catch(t){this.isProcessing=!1,o["a"].fire({icon:"error",title:"無法取消最愛，請稍後再試"})}},linkedUser(e){e===this.currentUser.id?this.$router.push({name:"selfTweet"}):this.$router.push({name:"otherTweet",params:{id:e}})},linkedReply(e,t){e.target.matches(".reply")||e.target.matches(".heart")||e.target.matches(".heart-active")||e.target.matches(".avatar")||e.target.matches(".card-name")||this.$router.push({name:"tweet",params:{id:t}})},showReplyModal(e,t,s,r,a,i,o){this.$modal.show("replyCreate");const n={id:e,name:t,userId:s,account:r,avatar:a,description:i,createdAt:o};this.$store.commit("setTweetReplyTarget",n)}},created(){this.fetchUserTweets(this.$route.params.id)},beforeRouteUpdate(e,t,s){this.fetchUserTweets(e.params.id),s()}},l=u,h=(s("aa0a"),s("2877")),p=Object(h["a"])(l,r,a,!1,null,"63ef8238",null);t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-f0872f38.a48367d1.js.map