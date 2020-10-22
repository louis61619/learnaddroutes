<template>
  <div id="app">
    <router-view></router-view>
    <button @click="turnPage">換首頁</button>
  </div>
</template>

<script>
import { abc, Shop, abcd } from "./common/common";

// import Home from "@/components/Home"

import axios from "axios";

import { reset } from "@/router/index";

export default {
  name: "App",
  data() {
    return {
      question: "",
      answer: "I cannot give you an answer until you ask a question!",
      screenWidth: document.body.clientWidth,
      name: "",
      condition: false,

      shop: {},
    };
  },
  created() {
    axios.get("http://localhost:81/test.json").then((res) => {
      console.log(res.data);
      let r = this.needRoutes(res.data);
      this.$router.addRoutes(r);
    });
  },
  mounted() {},
  watch: {
    name: function () {
      this.$nextTick(() => {
        this.condition = true;
      });
    },
    question: function () {
      this.answer = "Waiting for you to stop typing...";
    },
    screenWidth(val) {
      // console.log(this.screenWidth);

      // 為了避免頻繁觸發resize函式導致頁面卡頓，使用定時器
      if (!this.timer) {
        // 一旦監聽到的screenWidth值改變，就將其重新賦給data裡的screenWidth
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function () {
          // 列印screenWidth變化的值
          console.log(that.screenWidth);
          // window.location.reload()
          that.timer = false; //在調整網頁寬度的這段時間不會跑函數
        }, 400);
      }
    },
  },
  methods: {
    go() {
      if (this.condition === true) {
        console.log("1111111");
      }
    },
    turnPage() {
      console.log("-------");

      function filterRouter(routers) {
        // 遍历后台传来的路由字符串，转换为组件对象
        const accessedRouters = routers.filter((route) => {
          if (route.component) {
            if (route.component === "Home") {
              // Home组件特殊处理
              route.component = Home;
            } else {
              route.component = _import(route.component);
            }
          }
          if (route.children && route.children.length) {
            route.children = filterRouter(route.children);
          }
          return true;
        });
        return accessedRouters;
      }

      function _import(file) {
        return () => import("@/" + file + ".vue");
      }

      axios.get("http://localhost:81/test2.json").then((res) => {
        // console.log(res.data);
        reset();
        let r = filterRouter(res.data);
        // console.log(r);
        this.$router.addRoutes(r);
        this.$router.replace(-1);
      });
      // this.
    },
    needRoutes(data) {
      // 判断是否是数组
      if (!Array.isArray(data)) {
        return new TypeError("arr must be an array.");
      }
      let arr = [];

      for (let obj of data) {
        const component = obj.component;
        // 把后台返回的路由参数，拼接路径
        obj.component = (resolve) => {
          require(["@/" + component + ".vue"], resolve);
        };
        arr.push(obj);
      }
      // 考虑到后台排序 进行排序 compare 是我封装的数组对象排序的方法
      return arr;
    },
    routeFormate(routers) {
      function filterRouter(routers) {
        // 遍历后台传来的路由字符串，转换为组件对象
        const accessedRouters = routers.filter((route) => {
          if (route.component) {
            if (route.component === "Home") {
              // Home组件特殊处理
              route.component = Home;
            } else {
              route.component = _import(route.component);
            }
          }
          if (route.children && route.children.length) {
            route.children = filterRouter(route.children);
          }
          return true;
        });
        return accessedRouters;
      }

      function _import(file) {
        return () => import("@/" + file + ".vue");
      }
    },
  },
  components: {},
  // created() {
  //   // console.log(this.$store)
  //   var lol = setInterval(() => {
  //     this.$store.dispatch("geterror", false)
  //   },1000)

  //   setTimeout(() => {
  //     clearInterval(lol)
  //     this.$store.dispatch("goPeace", true)
  //   }, 10000)
  // }
};
</script>

<style>
</style>
