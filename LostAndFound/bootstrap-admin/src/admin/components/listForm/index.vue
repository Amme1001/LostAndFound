<template>
  <b-container fluid class="container">
    <b-nav justified tabs>
      <b-nav-item :active="actived==='Book'?true:false" @click="clisk('Book')">书籍</b-nav-item>
      <b-nav-item :active="actived==='Wallet'?true:false" @click="clisk('Wallet')">钱包</b-nav-item>
      <b-nav-item :active="actived==='Udisk'?true:false" @click="clisk('Udisk')">U盘</b-nav-item>
      <b-nav-item :active="actived==='Other'?true:false" @click="clisk('Other')">其他</b-nav-item>
    </b-nav>
    <form-img :porpertyType="actived" :type="message"></form-img>
  </b-container>
</template>

<script>
import formImg from "@/admin/components/formImg/index";

export default {
  props: {
    message: String
  },
  data() {
    return {
      actived: "Book"
    };
  },
  mounted() {
    console.log(this.message);
  },
  methods: {
    clisk: function(s) {
      this.actived = s;
    }
  },
  components: {
    formImg
  }
};
</script>

<style>
.container {
  padding-left: 0px;
  padding-right: 0px;
}
</style>