<template>
  <b-container fluid class="container">
    <b-list-group>
      <b-list-group-item v-for="item in list" :key="item.id">
        <cart-img :message="item" :type="type" :ptype="porpertyType" @click="cli(item)"></cart-img>
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
import cartImg from "../cartImg/index";
import {
  getFoundBook,
  getFoundOther,
  getFoundUdisk,
  getFoundWallet,
  getLostBook,
  getLostOther,
  getLostUdisk,
  getLostWallet
} from "@/api/getList";
export default {
  props: {
    porpertyType: String,
    type: String
  },
  data() {
    return {
      actived: "other",
      list: [],
      stateList: ["进行中", "完成", "失败"]
    };
  },
  mounted() {
    console.log(this.type + "massage");
    this["Get"+ this.type + "Book"]();
    console.log(this.type + "massage");
  },
  methods: {
    GetfoundBook: function() {
      new Promise((resolve, reject) => {
        getFoundBook()
          .then(response => {
            console.log(response.data.list);
            this.list = response.data.list;
            for (var i = 0; i < this.list.length; i++) {
              this.list[i].stateName = this.stateList[this.list[i].state];
              this.list[i].date = this.list[i].date.substr(0, 10);
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    GetfoundOther: function() {
      new Promise((resolve, reject) => {
        getFoundOther()
          .then(response => {
            console.log(response.data.list);
            this.list = response.data.list;
            for (var i = 0; i < this.list.length; i++) {
              this.list[i].stateName = this.stateList[this.list[i].state];
              this.list[i].date = this.list[i].date.substr(0, 10);
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    GetfoundUdisk: function() {
      new Promise((resolve, reject) => {
        getFoundUdisk()
          .then(response => {
            console.log(response.data.list);
            this.list = response.data.list;
            for (var i = 0; i < this.list.length; i++) {
              this.list[i].stateName = this.stateList[this.list[i].state];
              this.list[i].date = this.list[i].date.substr(0, 10);
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    GetfoundWallet: function() {
      new Promise((resolve, reject) => {
        getFoundWallet()
          .then(response => {
            console.log(response.data.list);
            this.list = response.data.list;
            for (var i = 0; i < this.list.length; i++) {
              this.list[i].stateName = this.stateList[this.list[i].state];
              this.list[i].date = this.list[i].date.substr(0, 10);
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    GetlostBook: function() {
      new Promise((resolve, reject) => {
        getLostBook()
          .then(response => {
            console.log(response.data.list);
            this.list = response.data.list;
            for (var i = 0; i < this.list.length; i++) {
              this.list[i].stateName = this.stateList[this.list[i].state];
              this.list[i].date = this.list[i].date.substr(0, 10);
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    GetlostOther: function() {
      new Promise((resolve, reject) => {
        getLostOther()
          .then(response => {
            console.log(response.data.list);
            this.list = response.data.list;
            for (var i = 0; i < this.list.length; i++) {
              this.list[i].stateName = this.stateList[this.list[i].state];
              this.list[i].date = this.list[i].date.substr(0, 10);
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    GetlostUdisk: function() {
      new Promise((resolve, reject) => {
        getLostUdisk()
          .then(response => {
            console.log(response.data.list);
            this.list = response.data.list;
            for (var i = 0; i < this.list.length; i++) {
              this.list[i].stateName = this.stateList[this.list[i].state];
              this.list[i].date = this.list[i].date.substr(0, 10);
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    GetlostWallet: function() {
      new Promise((resolve, reject) => {
        getLostWallet()
          .then(response => {
            console.log(response.data.list);
            this.list = response.data.list;
            for (var i = 0; i < this.list.length; i++) {
              this.list[i].stateName = this.stateList[this.list[i].state];
              this.list[i].date = this.list[i].date.substr(0, 10);
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  components: {
    cartImg: cartImg
  },
  watch: {
    porpertyType: function(val) {
      this["Get"+ this.type + val]();
    }
  }
};
</script>

<style>
.container {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
