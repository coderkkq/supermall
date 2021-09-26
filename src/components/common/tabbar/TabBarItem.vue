<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activesStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: 'String',
      default: 'red'
    }
  },
  data() {
    return {
      /*isActive: true*/
    }
  },
  computed: {
   isActive() {
     return this.$route.path.indexOf(this.path) !== -1
  },
    activesStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    width: 24px;
    margin-top: 3px;
     /* vertical-align: middle;   去掉 图片自带的 3像素 */
    vertical-align: middle;
    margin-bottom: 2px;
  }

</style>
