(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-051ca500"],{2957:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"userCard-wrapper"},[a("div",{staticClass:"title-wrapper"},[a("button",{on:{click:function(e){return t.$router.back()}}},[a("img",{staticClass:"arrow",attrs:{alt:""}})]),a("div",{staticClass:"name-wrapper"},[t._v(" "+t._s(t.userData.name)+" "),a("div",{staticClass:"tweetCount"},[t._v(t._s(t.userData.tweetCount)+"推文")])])]),a("div",{directives:[{name:"show",rawName:"v-show",value:this.$route.name!==t.asd&&this.$route.name!==t.zxc,expression:"this.$route.name!==asd&&this.$route.name!==zxc"}],staticClass:"user-wrapper"},[a("img",{staticClass:"cover",attrs:{src:t._f("emptyImage")(t.userData.cover),alt:""}}),a("img",{staticClass:"avatar-big",attrs:{src:t._f("emptyImage")(t.userData.avatar),alt:""}}),t.whichPage?a("button",{staticClass:"btn btn-edit",on:{click:function(e){return t.showEditModal()}}},[t._v(" 編輯個人資料 ")]):a("div",{staticClass:"otherButton"},[a("img",{staticClass:"message",attrs:{src:"",alt:""}}),t.isNotice?a("img",{staticClass:"notice",attrs:{src:"",alt:""},on:{click:function(e){t.isNotice=!1}}}):a("img",{staticClass:"notice-active",attrs:{src:"",alt:""},on:{click:function(e){t.isNotice=!0}}}),t.userData.isFollowed?a("button",{staticClass:"btn btnDeleteFollow",attrs:{disabled:t.isProcessing},on:{click:function(e){return t.deleteFollow(t.userData.id)}}},[t._v(" 正在追隨 ")]):a("button",{staticClass:"btn btnAddFollow",attrs:{disabled:t.isProcessing},on:{click:function(e){return t.addFollow(t.userData.id)}}},[t._v(" 追隨 ")])]),a("div",{staticClass:"information-wrapper"},[a("div",{staticClass:"name"},[t._v(t._s(t.userData.name))]),a("div",{staticClass:"account"},[t._v(t._s(t._f("accountTag")(t.userData.account)))]),a("div",{staticClass:"introduce"},[t._v(t._s(t.userData.introduction))]),a("div",{staticClass:"follow"},[a("router-link",{staticClass:"strong",attrs:{to:{name:"followings",params:{id:t.userData.id}}}},[t._v(" "+t._s(t._f("numberFormatTC")(t.userData.followingCount))+"個 ")]),t._v(" 追隨中 "),a("router-link",{staticClass:"strong2",attrs:{to:{name:"followers",params:{id:t.userData.id}}}},[t._v(t._s(t._f("numberFormatTC")(t.userData.follwerCount))+"位 ")]),t._v(" 追隨者 ")],1)])]),a("UserCardEdit")],1)},s=[],i=(a("d9e2"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("modal",{attrs:{name:"userCardEdit",classes:"userCardEdit-modal",width:600,height:657,clickToClose:!1}},[a("div",{staticClass:"userCardEdit-wrapper"},[a("div",{staticClass:"userCardEdit-head"},[a("img",{staticClass:"cross-orange",attrs:{alt:""},on:{click:function(e){return t.hideEditModal()}}}),a("h3",[t._v("編輯個人資料")]),a("button",{staticClass:"btn active",attrs:{type:"submit",form:"userCardForm",disabled:t.isProcessing}},[t._v("儲存")])]),a("div",{staticClass:"userCardEdit-body"},[a("form",{staticClass:"form-wrapper",attrs:{action:"",id:"userCardForm"},on:{submit:function(e){return e.preventDefault(),e.stopPropagation(),t.handleSubmit(e)}}},[a("div",{staticClass:"form-image-wrapper"},[a("div",{staticClass:"form-image-cover"},[a("img",{directives:[{name:"show",rawName:"v-show",value:t.cover,expression:"cover"}],staticClass:"cover",attrs:{src:t.cover}}),a("label",{staticClass:"camera",attrs:{for:"cover"}}),a("input",{attrs:{type:"file",id:"cover",name:"cover",accept:"image/*"},on:{change:function(e){return t.handleFileChange(e,"cover")}}}),a("img",{staticClass:"cross-white cancel",on:{click:function(e){return t.clearCover()}}})]),a("div",{staticClass:"form-image-avatar"},[a("img",{directives:[{name:"show",rawName:"v-show",value:t.avatar,expression:"avatar"}],staticClass:"avatar",attrs:{src:t.avatar}}),a("label",{staticClass:"camera",attrs:{for:"avatar"}}),a("input",{attrs:{type:"file",id:"avatar",name:"avatar",accept:"image/*"},on:{change:function(e){return t.handleFileChange(e,"avatar")}}})])]),a("div",{staticClass:"form-input-wrapper"},[a("label",{class:["label",{isInvalid:t.name.isInvalid}],attrs:{for:"name"}},[t._v(" 名稱 "),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.name.text,expression:"name.text",modifiers:{trim:!0}}],attrs:{name:"name",type:"text",id:"name"},domProps:{value:t.name.text},on:{input:function(e){e.target.composing||t.$set(t.name,"text",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),a("div",{staticClass:"wordLimit-wrapper"},[a("h5",[t._v(t._s(t.worLimitMessage(t.name,50)))]),a("h5",[t._v(t._s(t.wordLimitCount(t.name,50)))])]),a("label",{class:["textarea","label",{isInvalid:t.introduction.isInvalid}],attrs:{for:"introduction"}},[t._v("自我介紹 "),a("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:t.introduction.text,expression:"introduction.text",modifiers:{trim:!0}}],attrs:{name:"introduction",id:"introduction"},domProps:{value:t.introduction.text},on:{input:function(e){e.target.composing||t.$set(t.introduction,"text",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),a("div",{staticClass:"wordLimit-wrapper"},[a("h5",[t._v(t._s(t.worLimitMessage(t.introduction,160)))]),a("h5",[t._v(t._s(t.wordLimitCount(t.introduction,160)))])])])])])])])}),o=[],n=a("2f62"),c=a("4cce"),l=a("2fa3"),u={data(){return{name:{text:"",isInvalid:!1},introduction:{text:"",isInvalid:!1},cover:"",avatar:"",isProcessing:!1}},computed:{...Object(n["b"])(["currentUser"]),worLimitMessage(){return(t,e)=>t.text.length>e?(t.isInvalid=!0,"字數超過上限！"):(t.isInvalid=!1,"")},wordLimitCount(){return(t,e)=>t.text.length<1?"":t.text.length+"/"+e}},methods:{handleFileChange(t,e){const{files:a}=t.target;if(0===a.length){if("cover"===e)return this.cover="";if("avatar"===e)return this.avatar=""}const r=window.URL.createObjectURL(a[0]);"cover"===e?this.cover=r:"avatar"===e&&(this.avatar=r)},clearCover(){this.cover=""},async handleSubmit(t){try{const e=this.currentUser.id;if(this.name.isInvalid||this.introduction.isInvalid)return l["a"].fire({icon:"warning",title:"字數超出上限！"});if(this.name.text.length<1)return l["a"].fire({icon:"warning",title:"請輸入使用名稱"});const a=t.target,r=new FormData(a);this.isProcessing=!0;const{statusText:s,data:i}=await c["a"].editInformation({id:e,formData:r});if("OK"!==s||"success"!==i.status)throw new Error;this.isProcessing=!1,this.$store.commit("setCurrentUser",i.user),this.$modal.hide("userCardEdit")}catch(e){this.isProcessing=!1,l["a"].fire({icon:"error",title:"無法編輯資料，請稍後再試"})}},hideEditModal(){this.$modal.hide("userCardEdit"),this.name.text=this.currentUser.name,this.cover=this.currentUser.cover,this.avatar=this.currentUser.avatar}},created(){this.name.text=this.currentUser.name,this.cover=this.currentUser.cover,this.avatar=this.currentUser.avatar}},d=u,h=a("2877"),m=Object(h["a"])(d,i,o,!1,null,null,null),v=m.exports,w=a("2708"),f={mixins:[w["a"],w["e"],w["b"]],components:{UserCardEdit:v},props:{currentUserData:{type:Object,default:()=>({id:0,account:"",name:"",email:"",avatar:"",cover:"",introduction:"",followingCount:0,follwerCount:0,isFollowed:"",tweetCount:0})},whichPage:{type:Boolean,require:!0}},data(){return{userData:{id:0,account:"",name:"",email:"",avatar:"",cover:"",introduction:"",followingCount:0,follwerCount:0,isFollowed:"",tweetCount:0},isNotice:!0,isProcessing:!1,asd:"followers",zxc:"followings"}},watch:{currentUserData(t){this.userData={...this.userData,...t}}},created(){this.fetchUser()},methods:{fetchUser(){this.userData.id=this.currentUserData.id,this.userData.account=this.currentUserData.account,this.userData.name=this.currentUserData.name,this.userData.email=this.currentUserData.email,this.userData.avatar=this.currentUserData.avatar,this.userData.cover=this.currentUserData.cover,this.userData.introduction=this.currentUserData.introduction,this.userData.followingCount=this.currentUserData.followingCount,this.userData.follwerCount=this.currentUserData.follwerCount,this.userData.isFollowed=this.currentUserData.isFollowed,this.userData.tweetCount=this.currentUserData.tweetCount},showEditModal(){this.$modal.show("userCardEdit")},hideEditModal(){this.$modal.hide("userCardEdit")},async addFollow(t){try{this.isProcessing=!0;const{data:e}=await c["a"].addFollow({id:t});if("success"!==e.status)throw new Error(e.message);this.isProcessing=!1,this.userData={...this.userData,isFollowed:!0,follwerCount:this.userData.follwerCount+1}}catch(e){this.isProcessing=!1,l["a"].fire({icon:"error",title:"無法追隨使用者，請稍後再試"}),console.log("error",e)}},async deleteFollow(t){try{this.isProcessing=!0;const{data:e}=await c["a"].deleteFollow({followingId:t});if("success"!==e.status)throw new Error(e.message);this.isProcessing=!1,this.userData={...this.userData,isFollowed:!1,follwerCount:this.userData.follwerCount-1}}catch(e){this.isProcessing=!1,l["a"].fire({icon:"error",title:"無法取消追隨使用者，請稍後再試"}),console.log("error",e)}}}},g=f,p=Object(h["a"])(g,r,s,!1,null,null,null);e["a"]=p.exports},"2d97":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("UserCard",{attrs:{currentUserData:t.currentUserData,whichPage:t.whichPage}}),a("div",{directives:[{name:"show",rawName:"v-show",value:this.$route.name!==t.asd&&this.$route.name!==t.zxc,expression:"this.$route.name!==asd&&this.$route.name!==zxc"}],staticClass:"switchTabs"},[a("div",{staticClass:"tweetTab",class:[{activeTabs:this.$route.name===t.otherTweet}],on:{click:function(e){t.$router.push({name:"otherTweet",params:{id:t.currentUserData.id}}),t.tabNow=1}}},[t._v(" 推文 ")]),a("div",{staticClass:"replyTab",class:[{activeTabs:this.$route.name===t.otherReply}],on:{click:function(e){t.$router.push({name:"otherReply",params:{id:t.currentUserData.id}}),t.tabNow=2}}},[t._v(" 推文與回覆 ")]),a("div",{staticClass:"likeTab",class:[{activeTabs:this.$route.name===t.otherLike}],on:{click:function(e){t.$router.push({name:"otherLike",params:{id:t.currentUserData.id}}),t.tabNow=3}}},[t._v(" 喜歡的內容 ")])]),a("router-view")],1)},s=[],i=a("2957"),o=a("4cce"),n=a("2fa3"),c={components:{UserCard:i["a"]},data(){return{whichPage:!1,tabNow:1,asd:"followers",zxc:"followings",otherTweet:"otherTweet",otherReply:"otherReply",otherLike:"otherLike",currentUserData:{id:0,account:"",name:"",email:"",avatar:"",cover:"",introduction:"",followingCount:0,follwerCount:0,tweetCount:0,isFollowed:!1}}},methods:{async fetchUser(t){try{const e=await o["a"].getUser({userId:t||this.$route.params.id});this.currentUserData={id:e.data.id,account:e.data.account,name:e.data.name,email:e.data.email,avatar:e.data.avatar,cover:e.data.cover,introduction:e.data.introduction,followingCount:e.data.followingCount,follwerCount:e.data.follwerCount,tweetCount:e.data.tweetCount,isFollowed:e.data.isFollowed}}catch(e){n["a"].fire({icon:"error",title:"無法取得使用者資料，請稍後再試"})}}},created(){this.fetchUser()},watch:{currentUser(t){this.currentUserData={...this.currentUserData,...t}}},beforeRouteUpdate(t,e,a){this.fetchUser(t.params.id),a()}},l=c,u=a("2877"),d=Object(u["a"])(l,r,s,!1,null,null,null);e["default"]=d.exports},"4cce":function(t,e,a){"use strict";var r=a("2fa3");const s=()=>localStorage.getItem("token");e["a"]={getUser({userId:t}){return r["b"].get("api/users/"+t,{headers:{Authorization:"Bearer "+s()}})},getUserTweets({userId:t}){return r["b"].get(`api/users/${t}/tweets`,{headers:{Authorization:"Bearer "+s()}})},getUserReplies({userId:t}){return r["b"].get(`api/users/${t}/replied_tweets`,{headers:{Authorization:"Bearer "+s()}})},getUserLikes({userId:t}){return r["b"].get(`api/users/${t}/likes`,{headers:{Authorization:"Bearer "+s()}})},getFollowers({userId:t}){return r["b"].get(`api/users/${t}/followers`,{headers:{Authorization:"Bearer "+s()}})},getFollowings({userId:t}){return r["b"].get(`api/users/${t}/followings`,{headers:{Authorization:"Bearer "+s()}})},editInformation({id:t,formData:e}){return r["b"].put("api/users/"+t,e,{headers:{Authorization:"Bearer "+s()}})},signEdit({userId:t,account:e,name:a,email:i,password:o,checkPassword:n}){return r["b"].put(`api/users/${t}/edit`,{account:e,name:a,email:i,password:o,checkPassword:n},{headers:{Authorization:"Bearer "+s()}})},addFollow({id:t}){return r["b"].post("/api/followships",{id:t},{headers:{Authorization:"Bearer "+s()}})},deleteFollow({followingId:t}){return r["b"].delete("api/followships/"+t,{headers:{Authorization:"Bearer "+s()}})},getTopUser(){return r["b"].get("api/users/top",{headers:{Authorization:"Bearer "+s()}})}}}}]);
//# sourceMappingURL=chunk-051ca500.5f707c5b.js.map