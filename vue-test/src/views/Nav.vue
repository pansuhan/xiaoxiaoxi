<template>
  <div>
    <template v-for="item in items">
        <el-menu class="el-menu-vertical-demo">
            <el-menu-item index="item.url" v-if="!item.child">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
            <el-submenu index="item.url" v-if="item.child">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">{{item.name}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-for="subItem in item.child" index="subItem.url" :key="subItem.url">{{subItem.name}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </template>

  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
        items:[
            {
                name:'首页',
                url:'/index'
        },
        {
                name:'数据统计',
                url:'/statis'
        },
        {
                name:'信息管理',
                url:'/wms',
                child:[
                    {
                        name:'信息展示1',
                        url:'/list1'
                    },
                    {
                        name:'信息展示2',
                        url:'/list2'
                    }
                ]
        },
        ]
    };
  },
  methods: {},
  watch: {},
  computed: {},
  mounted() {}
};
</script>
<style scoped>
</style>