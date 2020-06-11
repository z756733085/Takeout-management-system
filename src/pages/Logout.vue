<template>
  <h1>正在退出中...</h1>
</template>
<script>
export default {
  mounted() {
    setTimeout(() => {
      /* this.$message({
        message: "退出登录成功！",
        type: "success"
      }); */
      localStorage.clear();
      this.$router.push("/");
    }, 3000);
  }
};
</script>