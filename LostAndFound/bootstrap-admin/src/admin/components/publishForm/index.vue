<template>
  <b-container fluid class="container">
    <b-row class="mt-6">
      <b-col md="6" offset-md="3">
        <b-form @submit="submit">
          <b-form-group
            :label="message"
            label-align="center"
            label-size="lg"
            label-class="font-weight-bold"
          >
            <b-form-group label-cols-sm="3" label="type:" label-for="type" label-align-md="right">
              <b-form-radio-group
                v-model="publishItem.type"
                style="padding-top:7px"
                label-align-md="right"
              >
                <b-row>
                  <b-col offset="2">
                    <b-form-radio value="found">招领</b-form-radio>
                  </b-col>
                  <b-col>
                    <b-form-radio value="lost">失物</b-form-radio>
                  </b-col>
                </b-row>
              </b-form-radio-group>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="name:"
              label-for="name"
              label-align-md="right"
              v-if="message==='Wallet'?false:true"
            >
              <b-form-input v-model="publishItem.name"></b-form-input>
            </b-form-group>

            <b-form-group
              v-if="message==='Book'?true:false"
              label-cols-sm="3"
              label="author:"
              label-for="author"
              label-align-md="right"
            >
              <b-form-input v-model="publishItem.author"></b-form-input>
            </b-form-group>

            <b-form-group
              v-if="message==='Udisk'?true:false"
              label-cols-sm="3"
              label="size:"
              label-for="size"
              label-align-md="right"
            >
              <b-form-input v-model="publishItem.size"></b-form-input>
            </b-form-group>

            <b-form-group
              v-if="message==='Wallet'?true:false"
              label-cols-sm="3"
              label="color:"
              label-for="color"
              label-align-md="right"
            >
              <b-form-input v-model="publishItem.color"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="date:" label-for="date" label-align-md="right">
              <b-form-input v-model="publishItem.date" type="date"></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="include:"
              label-for="include"
              label-align-md="right"
              v-if="message==='Wallet'?true:false"
            >
              <b-form-input v-model="publishItem.include"></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="descript:"
              label-for="descript"
              label-align-md="right"
            >
              <b-form-input v-model="publishItem.descript"></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="image:"
              label-for="descript"
              label-align-md="right"
            >
              <b-form-file
                v-model="file"
                :state="Boolean(file)"
                placeholder="Choose a file..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
            </b-form-group>
            <b-alert
              :show="dismissCountDown"
              variant="warning"
              @dismiss-count-down="countDownChanged"
              class="text-center"
            >{{ alertMessage }}</b-alert>
            <b-row>
              <b-col offset="4">
                <b-button class="mt-10" type="submit" variant="primary">Submit</b-button>
              </b-col>
            </b-row>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import store from "@/store";

export default {
  props: {
    message: String
  },
  data() {
    return {
      file: File,
      fileName: "",
      publishItem: {},
      dismissSecs: 2,
      dismissCountDown: 0,
      alertMessage: ""
    };
  },
  methods: {
    submit: function(event) {
      event.preventDefault();
      if (store.getters.username) {
        if (this.message === "Book") {
          let formData = new FormData();
          formData.append("file", this.file, this.fileName);
          formData.append("name", this.publishItem.name);
          formData.append("author", this.publishItem.author);
          formData.append("descript", this.publishItem.descript);
          formData.append("date", this.publishItem.date);
          formData.append("state", this.publishItem.state);
          formData.append("publicer", store.getters.username);
          axios
            .post("/book/" + this.publishItem.type + "/add", formData, {
              header: "multipart/form-data"
            })
            .then(res => {
              console.log(res);
              console.log("添加成功");
              this.showAlert();
              this.alertMessage = "添加成功";
              this.publishItem = {};
            })
            .catch(() => {
              console.log("添加失败");
            });
        } else if (this.message === "Other") {
          let formData = new FormData();
          formData.append("file", this.file, this.fileName);
          formData.append("name", this.publishItem.name);
          formData.append("descript", this.publishItem.descript);
          formData.append("date", this.publishItem.date);
          formData.append("state", this.publishItem.state);
          formData.append("publicer", store.getters.username);
          axios
            .post("/other/" + this.publishItem.type + "/add", formData, {
              header: "multipart/form-data"
            })
            .then(res => {
              console.log(res);
              console.log("添加成功");
              this.showAlert();
              this.alertMessage = "添加成功";
              this.publishItem = {};
            })
            .catch(() => {
              console.log("添加失败");
            });
        } else if (this.message === "Udisk") {
          let formData = new FormData();
          formData.append("file", this.file, this.fileName);
          formData.append("name", this.publishItem.name);
          formData.append("size", this.publishItem.size);
          formData.append("descript", this.publishItem.descript);
          formData.append("date", this.publishItem.date);
          formData.append("state", this.publishItem.state);
          formData.append("publicer", store.getters.username);
          axios
            .post("/udisk/" + this.publishItem.type + "/add", formData, {
              header: "multipart/form-data"
            })
            .then(res => {
              console.log(res);
              console.log("添加成功");
              this.showAlert();
              this.alertMessage = "添加成功";
              this.publishItem = {};
            })
            .catch(() => {
              console.log("添加失败");
            });
        } else if (this.message === "Wallet") {
          let formData = new FormData();
          formData.append("file", this.file, this.fileName);
          formData.append("color", this.publishItem.color);
          formData.append("include", this.publishItem.include);
          formData.append("descript", this.publishItem.descript);
          formData.append("date", this.publishItem.date);
          formData.append("state", this.publishItem.state);
          formData.append("publicer", store.getters.username);
          axios
            .post("/wallet/" + this.publishItem.type + "/add", formData, {
              header: "multipart/form-data"
            })
            .then(res => {
              console.log(res);
              console.log("添加成功");
              this.showAlert();
              this.alertMessage = "添加成功";
              this.publishItem = {};
            })
            .catch(() => {
              console.log("添加失败");
            });
        } else {
          console.log("无效");
        }
      } else {
        console.log("请登录");
        this.showAlert();
        this.alertMessage = "请登录";
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  },
  watch: {
    file(val) {
      console.dir(val);
      this.fileName = val.name.split(".")[0];
      if (
        val.name.substr(-4, 4) === ".jpg" ||
        val.name.substr(-4, 4) === ".png" ||
        val.name.substr(-4, 4) === "jpeg"
      ) {
        // 文件不能大于300M,获取文件的size的单位是b, 1M = 1024kb; 1kb = 1024b; 1M = (1024 * 1024)b; 1G = (1024 * 1024 * 1024)b;
        if (val.size > 1 * Math.pow(1024, 3)) {
          console.log("文件过大", val.size / Math.pow(1024, 3));
        } else {
          console.log("文件合格");
          let reader = new FileReader();
          reader.readAsDataURL(val);
          reader.onload = function(e) {
            console.log(e.target.result);
          };
        }
      } else {
        console.log("请选择图片");
      }
    }
  }
};
</script>

<style>
.container {
  padding-left: 0px;
  padding-right: 0px;
}
.radioClass {
  line-height: 38px;
}
</style>