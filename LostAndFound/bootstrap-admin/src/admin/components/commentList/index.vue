
<template>
  <b-container fluid class="container">
    <div>
      <b-media>
        <b-media-aside slot="aside">
          <img src="@/assets/comment.png" class="round_icon">
        </b-media-aside>
        <div class="mt-0">
          <h6>{{ itemComment.publicer }}</h6>
          <small>{{ itemComment.time }}</small>
        </div>
      </b-media>
      <p class="mb-0">&nbsp;&nbsp;{{ itemComment.message }}</p>
      <b-button
        v-if="bottonVisable1 && bottonVisable2"
        size="sm"
        style="float: right;"
        @click="reply"
      >回复</b-button>
      <div class="ml-5 mt-2" v-if="itemVisable">
        <b-media>
          <b-media-aside slot="aside">
            <img src="@/assets/reply.png" class="round_icon">
          </b-media-aside>
          <div class="mt-0">
            <h6>{{ replyComment.publicer }}</h6>
            <small>{{ replyComment.time }}</small>
          </div>
        </b-media>
        <p class="mb-0">&nbsp;&nbsp;{{ replyComment.message }}</p>
      </div>
    </div>
  </b-container>
</template>

<script>
import store from "@/store";

export default {
  props: {
    itemComment: {},
    replyCommentsList: Array,
    publicer: String
  },
  data() {
    return {
      username: store.getters.username,
      bottonVisable1: true,
      bottonVisable2: true,
      itemVisable: false,
      replyComment: {}
    };
  },
  mounted() {
    if (this.username !== this.publicer) {
      this.bottonVisable2 = false;
    }
    this.render1();
  },
  watch: {
    replyCommentsList() {
      this.render1();
    }
  },
  methods: {
    reply: function() {
      this.$emit("divVisable", this.itemComment.id);
    },
    render1: function() {
      for (let i = 0; i < this.replyCommentsList.length; i++) {
        const element = this.replyCommentsList[i];
        if (element.mid === this.itemComment.id) {
          this.replyComment = element;
          this.bottonVisable1 = false;
          console.log(this.bottonVisable);
          this.itemVisable = true;
        }
      }
    }
  }
};
</script>

<style>
.right {
  float: right;
}
.container {
  padding-left: 0px;
  padding-right: 0px;
}
.round_icon {
  width: 51px;
  height: 51px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>