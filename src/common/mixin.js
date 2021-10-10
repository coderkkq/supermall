// 混入（防止代码重复）
import BackTop from "components/content/backTop/BackTop";

export const backTopMixin ={
  components: {
    BackTop
  },
  data() {
  return {
    isShowBackTop: false   //判断回滚按钮的显示
  }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    }
  }
}
