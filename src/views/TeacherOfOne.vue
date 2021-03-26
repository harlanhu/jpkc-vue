<template>
  <div id="teacher">
    <div class="info">
    </div>
    <page-control :page-info="pageInfo"/>
  </div>
</template>

<script>
import PageControl from "@/components/common/PageControl";
export default {
  name: "TeacherOfOne",
  components: {PageControl},
  data() {
    return {
      teacher: {},
      courseList: [],
      pageInfo: {
        current: 1,
        size: 25,
        total: 0,
        pages: 0
      },
      school: {}
    }
  },
  methods: {
    getTeacher(teacherId) {
      this.$api.teacher.getOneById(teacherId)
      .then(res => {
        this.teacher = res.data
      })
    },
    getCourse(teacherId, current, size) {
      this.$api.course.getByTeacherId(teacherId, current, size)
      .then(res => {
        this.courseList = res.data.list
        this.pageInfo.size = res.data.size
        this.pageInfo.total = res.data.total
        this.pageInfo.pages = res.data.pages
      })
    },
    getSchool(teacherId) {
      this.$api.school.getByTeacherId(teacherId)
      .then(res => {
        this.school = res.data
      })
    }
  },
  created() {
    let teacherId = this.$route.params.teacherId
    this.getTeacher(teacherId)
    this.getCourse(teacherId, 1, 25)
    this.getSchool(teacherId)
  }
}
</script>

<style scoped>

</style>
