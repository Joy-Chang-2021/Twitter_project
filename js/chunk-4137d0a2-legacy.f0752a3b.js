(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4137d0a2"],{"08ad":function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"followship-wrapper"},[t("ul",{staticClass:"followship-tabs"},[t("li",{staticClass:"followship-tab"},[t("router-link",{attrs:{to:{name:"followers",params:{id:e.paramsId}}}},[e._v(" 追隨者 ")])],1),t("li",{staticClass:"followship-tab"},[t("router-link",{attrs:{to:{name:"followings",params:{id:e.paramsId}}}},[e._v(" 正在追隨 ")])],1)]),e.isLoading?t("img",{staticClass:"spinner"}):e._l(e.followCards,(function(r){return t("div",{key:r.id,staticClass:"userFollowCards"},[t("div",{staticClass:"userFollowCards-left avatar"},[t("img",{staticClass:"avatar",attrs:{src:e._f("emptyImage")(r.avatar)}})]),t("div",{staticClass:"userFollowCards-right"},[r.isFollowed?t("button",{directives:[{name:"show",rawName:"v-show",value:e.currentUser.id!==r.followerId,expression:"currentUser.id !== followCard.followerId"}],staticClass:"btn active",attrs:{disabled:e.isProcessing},on:{click:function(t){return e.deleteFollow(r.followerId)}}},[e._v("正在跟隨")]):t("button",{directives:[{name:"show",rawName:"v-show",value:e.currentUser.id!==r.followerId,expression:"currentUser.id !== followCard.followerId"}],staticClass:"btn",attrs:{disabled:e.isProcessing},on:{click:function(t){return e.addFollow(r.followerId)}}},[e._v("跟隨")]),t("h5",{staticClass:"name"},[e._v(e._s(r.name))]),t("h5",{staticClass:"account"},[e._v(e._s(e._f("accountTag")(r.account)))]),t("p",[e._v(e._s(r.introduction))])])])}))],2)},s=[],o=t("2909"),n=t("1da1"),i=t("5530"),c=(t("96cf"),t("d9e2"),t("d81d"),t("a9e3"),t("4cce")),l=t("2f62"),u=t("2fa3"),d=t("2708"),f={mixins:[d["a"],d["b"]],computed:Object(i["a"])({},Object(l["b"])(["currentUser"])),data:function(){return{paramsId:0,followCards:[],isLoading:!1,isProcessing:!1}},methods:{fetchFollowCard:function(e){var r=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,s,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r.isLoading=!0,t.next=4,c["a"].getFollowers({userId:e});case 4:if(a=t.sent,s=a.statusText,n=a.data,r.isLoading=!1,"OK"===s){t.next=10;break}throw new Error;case 10:r.followCards=Object(o["a"])(n),t.next=17;break;case 13:t.prev=13,t.t0=t["catch"](0),r.isLoading=!1,u["a"].fire({icon:"error",title:t.t0.message});case 17:case"end":return t.stop()}}),t,null,[[0,13]])})))()},addFollow:function(e){var r=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r.isProcessing=!0,t.next=4,c["a"].addFollow({id:e});case 4:if(a=t.sent,s=a.data,r.isProcessing=!1,"success"===s.status){t.next=9;break}throw new Error;case 9:u["a"].fire({icon:"success",title:s.message}),r.followCards=r.followCards.map((function(r){return r.followerId!==e?r:Object(i["a"])(Object(i["a"])({},r),{},{isFollowed:!0})})),t.next=17;break;case 13:t.prev=13,t.t0=t["catch"](0),r.isProcessing=!1,u["a"].fire({icon:"error",title:"無法進行追蹤，請稍後再試"});case 17:case"end":return t.stop()}}),t,null,[[0,13]])})))()},deleteFollow:function(e){var r=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r.isProcessing=!0,t.next=4,c["a"].deleteFollow({followingId:e});case 4:if(a=t.sent,s=a.data,"success"===s.status){t.next=8;break}throw new Error;case 8:r.isProcessing=!1,u["a"].fire({icon:"success",title:s.message}),r.followCards=r.followCards.map((function(r){return r.followerId!==e?r:Object(i["a"])(Object(i["a"])({},r),{},{isFollowed:!1})})),t.next=17;break;case 13:t.prev=13,t.t0=t["catch"](0),r.isProcessing=!1,u["a"].fire({icon:"error",title:"無法進行追蹤，請稍後再試"});case 17:case"end":return t.stop()}}),t,null,[[0,13]])})))()}},created:function(){var e=this.$route.params.id;this.paramsId=Number(e),this.fetchFollowCard(this.paramsId)},beforeRouteUpdate:function(){var e=this.$route.params.id;this.paramsId=Number(e),this.fetchFollowCard(this.paramsId)}},w=f,p=t("2877"),h=Object(p["a"])(w,a,s,!1,null,null,null);r["default"]=h.exports},"4cce":function(e,r,t){"use strict";t("b0c0");var a=t("2fa3"),s=function(){return localStorage.getItem("token")};r["a"]={getUser:function(e){var r=e.userId;return a["b"].get("api/users/".concat(r),{headers:{Authorization:"Bearer ".concat(s())}})},getUserTweets:function(e){var r=e.userId;return a["b"].get("api/users/".concat(r,"/tweets"),{headers:{Authorization:"Bearer ".concat(s())}})},getUserReplies:function(e){var r=e.userId;return a["b"].get("api/users/".concat(r,"/replied_tweets"),{headers:{Authorization:"Bearer ".concat(s())}})},getUserLikes:function(e){var r=e.userId;return a["b"].get("api/users/".concat(r,"/likes"),{headers:{Authorization:"Bearer ".concat(s())}})},getFollowers:function(e){var r=e.userId;return a["b"].get("api/users/".concat(r,"/followers"),{headers:{Authorization:"Bearer ".concat(s())}})},getFollowings:function(e){var r=e.userId;return a["b"].get("api/users/".concat(r,"/followings"),{headers:{Authorization:"Bearer ".concat(s())}})},editInformation:function(e){var r=e.id,t=e.formData;return a["b"].put("api/users/".concat(r),t,{headers:{Authorization:"Bearer ".concat(s())}})},signEdit:function(e){var r=e.userId,t=e.account,o=e.name,n=e.email,i=e.password,c=e.checkPassword;return a["b"].put("api/users/".concat(r,"/edit"),{account:t,name:o,email:n,password:i,checkPassword:c},{headers:{Authorization:"Bearer ".concat(s())}})},addFollow:function(e){var r=e.id;return a["b"].post("/api/followships",{id:r},{headers:{Authorization:"Bearer ".concat(s())}})},deleteFollow:function(e){var r=e.followingId;return a["b"].delete("api/followships/".concat(r),{headers:{Authorization:"Bearer ".concat(s())}})},getTopUser:function(){return a["b"].get("api/users/top",{headers:{Authorization:"Bearer ".concat(s())}})}}}}]);
//# sourceMappingURL=chunk-4137d0a2-legacy.f0752a3b.js.map