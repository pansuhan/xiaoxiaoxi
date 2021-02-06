<template>
  <div class="home">
   <el-container>
  <el-aside width="200px">
    <Nav></Nav>
  </el-aside>
  <el-container>
    <el-header>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>

import Nav from './Nav.vue'

export default {
  name: 'Home',
  components: {
    Nav
  }
}
</script>
