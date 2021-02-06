<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用戶名" prop="username">
        <el-input
          placeholder="请输入用戶名"
          v-model="ruleForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密碼" prop="username">
        <el-input
          placeholder="请输入密码"
          v-model="ruleForm.password"
          show-password
          ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      ruleForm: {
        username: "psh",
        password: "123"
      },
      rules: {
          username: [
            { required: true, message: "请输入用戶名", trigger: "blur" }
          ],
          password: [
            { required: true, message: "请输入用戶名", trigger: "blur" }
          ],
          }
    };
  },
  methods: {
    login(){
      let {username, password} = this.ruleForm;
      if(username === "psh" && password === "123") {
        sessionStorage.setItem('username', username);
        this.$router.push("/home");
        // sessionStorage.clear();
      }
      else {
        this.$message.error('对不起，用户名密码不正确');
        this.$router.push("/login");
      }
    }
  },
  watch: {},
  computed: {},
  mounted() {}
};
</script>

<style scoped></style>
