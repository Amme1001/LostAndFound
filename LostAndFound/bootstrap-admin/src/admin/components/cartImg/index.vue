<template>
  <b-container fluid class="container">
    <div @click="cli">
      <b-media>
        <b-img
          slot="aside"
          :src="baseImageUrl + message.image"
          width="110"
          height="150"
        ></b-img>
          <h5 class="mt-2">{{ message.name }}</h5>
          <p class="text-muted">{{message.descript }}</p>
          <div class="bottom mb-3">
            <small class="pull-left">{{ message.date }}</small>&nbsp;&nbsp;&nbsp;&nbsp;
            <small class="pull-right">{{ message.publicer }}</small>
          </div>
      </b-media>
    </div>
  </b-container>
</template>

<script>
import store from "@/store";

export default {
  props: {
    message: {},
    type: String,
    ptype: String
  },
  data() {
    return {
      baseImageUrl: store.getters.baseImageUrl,
      item: this.message,
      typeName: ["found", "lost"],
      ptypeName: ["Book", "Other", "Udisk", "Wallet"]
    };
  },
  mounted() {},
  methods: {
    cli: function() {
      console.log("ffffff")
      console.log(this.message)
       localStorage.setItem('type',this.typeName.indexOf(this.type))
      localStorage.setItem('ptype',this.ptypeName.indexOf(this.ptype))
      localStorage.setItem('clickItem',JSON.stringify(this.message))
      this.$router.push({
        name: "showMessage",
      });
    console.log(localStorage.getItem('clickItem'))
    }
  }
};
</script>

<style scoped>
.time {
  position: absolute;
  margin-left: 20px;
}
.container {
  padding-left: 0px;
  padding-right: 0px;
}
.bottom {
  position: absolute;
  bottom: 0;
}
.media-body {
  height:150px;
  position: static;
}
</style>