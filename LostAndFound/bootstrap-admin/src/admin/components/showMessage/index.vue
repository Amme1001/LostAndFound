<template>
  <b-container fluid class="container">
    <div>
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col md="6" offset-md="3">
            <b-card-img :src="baseImageUrl + item.image"></b-card-img>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="10" offset-md="1">
            <b-list-group>
              <b-list-group-item v-show="item.name? true:false">
                名称：
                <span>&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name}}</span>
              </b-list-group-item>
              <b-list-group-item v-show="item.author? true:false">
                作者：
                <span>&nbsp;&nbsp;&nbsp;&nbsp;{{ item.author}}</span>
              </b-list-group-item>
              <b-list-group-item v-show="item.size? true:false">
                内存：
                <span>&nbsp;&nbsp;&nbsp;&nbsp;{{ item.size}}</span>
              </b-list-group-item>
              <b-list-group-item v-show="item.color? true:false">
                颜色：
                <span>&nbsp;&nbsp;&nbsp;&nbsp;{{ item.color}}</span>
              </b-list-group-item>
              <b-list-group-item v-show="item.include? true:false">
                包括：
                <span>&nbsp;&nbsp;&nbsp;&nbsp;{{ item.include}}</span>
              </b-list-group-item>
              <b-list-group-item>
                描述：
                <span>&nbsp;&nbsp;&nbsp;&nbsp;{{ item.descript}}</span>
              </b-list-group-item>
              <b-row>
                <b-col md="6">
                  <b-list-group-item>日期：&nbsp;&nbsp;&nbsp;&nbsp;{{item.date}}</b-list-group-item>
                </b-col>
                <b-col md="6">
                  <b-list-group-item>
                    发布人：&nbsp;&nbsp;&nbsp;&nbsp;
                    <a @click="setName" href="#">{{item.publicer}}</a>
                  </b-list-group-item>
                </b-col>
              </b-row>
            </b-list-group>
            <b-row>
              <b-form-textarea placeholder="发表评论" rows="3" v-model="comment" class="mt-2 mr-4 ml-4"></b-form-textarea>
            </b-row>
            <b-row style="display: inline-block;height:70px">
              <b-col class="mt-2 mb-2 ml-3">
                <div style="display: inline-block">
                  <b-button variant="outline-primary" @click="submitComment" class="mt-2">发表</b-button>
                </div>
                <b-alert
                  class="ml-3 alert"
                  :show="dismissCountDown"
                  variant="warning"
                  @dismiss-count-down="countDownChanged"
                >
                  <p>请登录</p>
                </b-alert>
              </b-col>
            </b-row>

            <div>
              <div class="comments">评论列表</div>
              <b-list-group v-for="itemComment in commentsList" :key="itemComment.id">
                <b-list-group-item>
                  <comment-list
                    :itemComment="itemComment"
                    :publicer="item.publicer"
                    :replyCommentsList="replyList"
                    @divVisable="divVisable"
                  ></comment-list>
                </b-list-group-item>
              </b-list-group>
            </div>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <div v-show="inputVisable" class="visibale">
      <div class="content" @click="turnTo"></div>
      <div class="footer" style="background-color: #c6c0af;padding:3px">
        <b-input-group>
          <b-form-input class="ml-3 mr-3" v-model="replyContent"></b-form-input>
          <b-input-group-append>
            <b-button variant="info" class="mr-3" @click="reply">发送</b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
    </div>
  </b-container>
</template>

<script>
import store from "@/store";
import { addComment, getComment } from "@/api/comment";
import commentList from "../commentList/index";

export default {
  data() {
    return {
      baseImageUrl: store.getters.baseImageUrl,
      item: {
        name: "",
        author: "",
        size: "",
        color: "",
        include: "",
        date: "",
        descript: "",
        image: "",
        publicer: ""
      },
      comment: "",
      commentItem: {
        publicer: "",
        time: "",
        mid: "",
        message: "",
        type: "",
        ptype: "",
        pid: ""
      },
      mid: "",
      commentsList: [],
      replyList: [],
      inputVisable: false,
      replyContent: "",
      backId: "",
      dismissSecs: 2,
      dismissCountDown: 0,
      clickItem: {},
      type: '',
      ptype: '',
    };
  },
  mounted() {
    console.log("niubi");
    console.log(localStorage.getItem("type"));
    console.log(JSON.parse(localStorage.getItem("clickItem")));
    this.clickItem = JSON.parse(localStorage.getItem("clickItem"));
    this.type = localStorage.getItem("type");
    this.ptype = localStorage.getItem("ptype");
    this.item.name = this.clickItem.name;
    this.item.author = this.clickItem.author;
    this.item.size = this.clickItem.size;
    this.item.color = this.clickItem.color;
    this.item.date = this.clickItem.date;
    this.item.descript = this.clickItem.descript;
    this.item.image = this.clickItem.image;
    this.item.publicer = this.clickItem.publicer;
    this.commentItem.type = this.type;
    this.commentItem.ptype = this.ptype;
    this.commentItem.pid = this.clickItem.id;
    this.commentItem.publicer = store.getters.username;
    this.GetComment();
  },
  methods: {
    //发布评论
    publishComment: function(mid, replyContent) {
      Date.prototype.Format = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "H+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };
      new Promise((resolve, reject) => {
        this.commentItem.time = new Date().Format("yyyy-MM-dd HH:mm:ss");
        this.commentItem.mid = mid ? mid : null;
        this.commentItem.message = replyContent || this.comment;
        addComment(
          this.commentItem.publicer,
          this.commentItem.time,
          this.commentItem.mid,
          this.commentItem.message,
          this.commentItem.type,
          this.commentItem.ptype,
          this.commentItem.pid
        )
          .then(response => {
            console.log("response.data");
            console.log(response.data);
            this.GetComment();
            this.comment = "";
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    submitComment: function(event) {
      event.preventDefault();
      if (this.commentItem.publicer) {
        this.publishComment();
      } else {
        console.log("bukenengde");
        this.showAlert();
      }
    },
    //获取评论
    GetComment: function() {
      new Promise((resolve, reject) => {
        getComment(
          this.commentItem.type,
          this.commentItem.ptype,
          this.commentItem.pid
        )
          .then(response => {
            if (response.data.list) {
              this.commentsList = response.data.list;
              for (let i = 0; i < this.commentsList.length; i++) {
                let time = this.commentsList[i].time;
                this.commentsList[i].time =
                  time.substr(0, 10) + " " + time.substr(11, 8);
              }
              this.replyList = response.data.midlist;
              for (let i = 0; i < this.replyList.length; i++) {
                let time = this.replyList[i].time;
                this.replyList[i].time =
                  time.substr(0, 10) + " " + time.substr(11, 8);
              }
            }
            console.log(22222222222);
            console.log(this.response);
            console.log(this.replyList);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    divVisable: function(value) {
      this.inputVisable = true;
      console.log(value);
      this.backId = value;
    },
    turnTo: function() {
      this.inputVisable = false;
    },
    reply: function() {
      this.publishComment(this.backId, this.replyContent);
      this.backId = null;
      this.replyContent = null;
      this.inputVisable = false;
    },
    setName: function() {
      localStorage.setItem("username", this.item.publicer);
      this.$router.push("/personMessage");
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  },
  components: {
    commentList
  }
};
</script>

<style scoped>
.comments {
  background-color: cyan;
  height: 30px;
  line-height: 30px;
  padding-left: 8px;
  width: 80px;
}
.container {
  padding-left: 0px;
  padding-right: 0px;
}
.visibale {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
}
.content {
  height: 90%;
  width: 100%;
}
.footer {
  height: 44px;
  width: 100%;
}
.alert {
  display: inline-block;
  height: 40px;
  line-height: 38px;
  padding: 0px;
  width: 150px;
  text-align: center;
}
</style>