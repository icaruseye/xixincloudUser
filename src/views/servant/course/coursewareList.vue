<template>
  <div class="courseware_list_container">
    <xxLoading v-if="loading" text="正在加载课件"></xxLoading>
    <div v-else>
      <CoursewareItems
        coursewareName="xxxxxxxxxxxxx"
        @click.native="redirectTo(`/servant/course/courseware/${proxyCourseID}/1`)"
      ></CoursewareItems>
    </div>
  </div>
</template>

<script>
import {
  CoursewareItems
} from './components'
export default {
  components: {
    CoursewareItems
  },
  props: {},
  data () {
    return {
      loading: false,
      shopProxyCourseEnclosureList: []
    }
  },
  watch: {},
  computed: {
    proxyCourseID () {
      return this.$route.params.id
    }
  },
  methods: {
    redirectTo (url) {
      this.$router.push(url)
    },
    async getCourseEnclosureList () {
      this.loading = true
      const result = await this.$http.get(`/CourseEnclosure/List`, {
        page: 1,
        proxyCourseID: this.proxyCourseID,
        type: 1
      })
      this.loading = false
      if (result.data.Code === 100000) {
        this.shopProxyCourseEnclosureList = result.data.Data.shopProxyCourseEnclosureList
      } else {
        this.$vux.toast.text(result.data.Msg)
      }
    }
  },
  created () {
    this.getCourseEnclosureList()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
.courseware_list_container
{
  padding-top: 10px
}
</style>
