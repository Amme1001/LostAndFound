<template>
  <div class="app-container">
    <el-select v-model="value6" size="small" placeholder="请选择" @change="getValue">
      <el-option
        v-for="item in cities"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
      </el-option>
    </el-select>
    <el-button @click="addProperty" size="mini" style="margin-left:20px">添加</el-button>
    <book ref="book" v-if="this.currentComponents.book" message="found"></book>
    <other ref="other" v-if="this.currentComponents.other" message="found"></other>
    <udisk ref="udisk" v-if="this.currentComponents.udisk" message="found"></udisk>
    <wallet ref="wallet" v-if="this.currentComponents.wallet" message="found"></wallet>
  </div>
</template>

<script>
// import { getFindBook } from '@/api/getlist'
import book from '../components/book/index'
import other from '../components/other/index'
import udisk from '../components/udisk/index'
import wallet from '../components/wallet/index'


export default {
  data() {
    return {
      cities: [{
        value: 'book',
        label: '书籍'
      }, {
        value: 'udisk',
        label: 'U盘'
      }, {
        value: 'wallet',
        label: '钱包'
      }, {
        value: 'other',
        label: '其他'
      }],
      value6: 'book',
      list: '',
      currentComponents: {
        book: true,
        udisk: false,
        wallet: false,
        other: false,
        value: 'book'
      },
      parentMessage: ''
    }
  },
  components: {
    book,
    other,
    udisk,
    wallet
  },
  created() {
  },
  methods: {
    getValue: function(value) {
      this.currentComponents = {
        book: false,
        udisk: false,
        wallet: false,
        other: false,
      }
      this.currentComponents[value] = true
      this.currentComponents.value = value
    },
    addProperty: function() {
      this.$refs[this.currentComponents.value].showAddComponent()
    }
  }
}
</script>

