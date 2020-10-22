<template>
  <div>
    <h2>舊家</h2>
    <button>新聞</button>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  methods: {
    go() {
      this.$router.replace("/home/news")
    }
  }
}
</script>

<style>

</style>