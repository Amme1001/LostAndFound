<template>
  <b-container fluid>
    <div>
      <b-nav justified tabs>
        <b-nav-item :active="actived==='Book'?true:false" @click="clisk('Book')">书籍</b-nav-item>
        <b-nav-item :active="actived==='Wallet'?true:false" @click="clisk('Wallet')">钱包</b-nav-item>
        <b-nav-item :active="actived==='Udisk'?true:false" @click="clisk('Udisk')">U盘</b-nav-item>
        <b-nav-item :active="actived==='Other'?true:false" @click="clisk('Other')">其他</b-nav-item>
      </b-nav>
      <publish-form :message="actived"></publish-form>
    </div>
  </b-container>
</template>

<script>
import publishForm from "@/admin/components/publishForm/index"
export default {
  data() {
    return {
      actived: 'Book'
    }
  },
  methods: {
    clisk: function(s) {
      console.log(s);
      this.actived = s;
    }
  },
  components: {
    publishForm
  }
}
</script>

<style>
</style>