<template>
  <div id="course-add"
       :element-loading-text="loading.loadingText"
       v-loading.fullscreen.lock="loading.isLoading">
    <el-form ref="courseForm" :model="course" :rules="rules">
      <el-form-item prop="courseName" label-width="100px" label="课程名称">
        <el-input  style="width: 200px" prefix-icon="el-icon-collection" show-word-limit v-model="course.courseName" placeholder="请输入课程名称"/>
      </el-form-item>
      <el-form-item label-width="100px" label="课程类别">
        <el-select v-model="categoryData.categoryValue"
                   placeholder="请选择课程类别"
                   @change="showChange"
                   filterable>
          <el-option v-for="category in categoryData.categories"
                     :label="category.categoryName"
                     :value="category.categoryId"
                     :key="category.categoryId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="100px" label="课程标签">
        <el-tag :key="label"
                closable
                :disable-transitions="false"
                @close="labelClose(label)"
                v-for="label in labelData.labels">
          {{label}}
        </el-tag>
        <el-input class="input-new-tag"
               v-if="labelData.addLabelAble"
               v-model="labelData.newLabel"
               ref="newLabelInput"
               size="small"
               @keyup.enter.native="handleLabelInputConfirm"
               @blur="handleLabelInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showLabelInput">+ 添加标签</el-button>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label-width="100px" prop="courseDesc" label="课程描述">
            <el-input style="width: 500px" type="textarea" prefix-icon="el-icon-document" v-model="course.courseDesc" placeholder="请输入关于课程的描述"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="100px" label="课程Logo">
            <el-upload ref="logoUpload"
                       action="#"
                       list-type="picture-card"
                       :multiple="false"
                       :auto-upload="false"
                       accept=".png, .jpg"
                       :on-remove="logoDelete"
                       :on-change="changeUploadLogo">
              <i slot="default" class="el-icon-plus"/>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="找不到图片">
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="logoPreview(file)">
                    <i class="el-icon-zoom-in"/>
                  </span>
                  <span v-if="!logoFile.disabled" class="el-upload-list__item-delete" @click="logoDelete(file)">
                    <i class="el-icon-delete"/>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="logoFile.dialogVisible">
              <img width="100%" :src="logoFile.url" alt="找不到图片">
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="bg-1"></div>
      <el-row>
        <el-col :span="6">
          <el-form-item label-width="100px" label="课程价格">
            <el-input-number :min="0" :max="9999" :precision="1" :step="0.1" v-model="course.coursePrice"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="100px" label="课程学时数">
            <el-input-number :min="1" :max="999"  v-model="course.courseHour"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="100px" label="课程状态">
            <el-switch active-color="#13ce66"
                       active-text="开放"
                       active-value="0"
                       inactive-text="关闭"
                       inactive-value="1"
                       v-model="course.courseStatus"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="bg-1"></div>
    <div class="section-option">
      <course-add-dialog @createNewSection="createSection"/>
      <span style="font-size: 30px">章节设置</span>
      <el-button style="margin-left: 50px; margin-bottom: 20px" type="primary" size="small" @click="showDialog">添加章节</el-button>
      <el-collapse v-model="sectionTree.section" @change="handleChange">
        <el-collapse-item v-for="(section, index) in sectionTree" :key="index">
          <template slot="title">
            <span style="font-size: 25px; color: dodgerblue">{{"第" + (index + 1) + "章-" + section.sectionName}}</span>
          </template>
          <div class="section-desc">
            <span style="font-size: 20px; color: #666">章节描述:</span>
            <p style="font-size: 16px">{{section.sectionDesc}}</p>
          </div>
          <div class="bg-2"></div>
          <div>
            <span style="font-size: 20px; color: #666">视频列表:</span>
            <div v-for="file in section.fileList">
              <a style="font-size: 16px" class="el-upload-list__item-name">
                <i class="el-icon-document"/>{{file.name}}
              </a>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-button @click="addCourse" class="submit-btn" type="primary">提交</el-button>
  </div>
</template>

<script>
import CourseAddDialog from "@/components/content/dialog/course/CourseAddDialog";
import MessageUtils from "@/utils/MessageUtils";

export default {
  name: "CourseAdd",
  components: {CourseAddDialog},
  data() {
    return {
      course: {
        courseName: '',
        courseDesc: '',
        courseLogo: '',
        sectionCount: 0,
        courseHour: 0,
        coursePrice: 0,
        courseStatus: 0,
      },
      rules: {
        courseName: [
          {
            required: true,
            message: "请输入课程名称",
            trigger: 'blur'
          },
          {
            pattern: "[\u4e00-\u9fa5A-Za-z0-9]{4,16}",
            message: "请输入4-16个字符不包括特殊符号",
            trigger: 'blur'
          }
        ],
        courseDesc: [
          {
            required: true,
            message: "请输入课程描述",
            trigger: 'blur'
          },
        ]
      },
      logoFile: {
        url: "",
        raw: {},
        file: {},
        dialogVisible: false,
        disabled: false
      },
      sectionTree: [],
      sectionNo: 1,
      categoryData: {
        categories: [],
        categoryValue: ""
      },
      labelData: {
        labels: [],
        addLabelAble: false,
        newLabel: ""
      },
      loading: {
        isLoading: false,
        loadingText: ""
      }
    }
  },
  methods: {
    logoPreview(file) {
      this.logoFile.url = file.url
      this.logoFile.file = file
      this.logoFile.raw = file.raw
      this.logoFile.dialogVisible = true
    },
    logoDelete(file) {
      this.logoFile.url = ''
      this.logoFile.file = {}
      this.logoFile.raw = {}
      this.$refs.logoUpload.clearFiles()
    },
    changeUploadLogo(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      const isJPEG = file.raw.type === "image/jpeg"
      const isJPG = file.raw.type === "image/jpg"
      const isPNG = file.raw.type === "image/png"
      const isLt2M = file.size / 1024 / 1024 < 5

      if (!isJPG && !isPNG && !isJPEG) {
        this.$message.error("请上传 PNG 或 JPG 格式图片！")
        this.$refs.logoUpload.clearFiles()
      }
      if (!isLt2M) {
        this.$message.error("上传大小不能超过 5MB")
        this.$refs.logoUpload.clearFiles()
      }
      this.logoFile.file = file
      this.logoFile.raw = file.raw
      return isLt2M && isPNG && isJPG
    },
    handleChange(val) {
      console.log(this.sectionTree)
    },
    showDialog() {
      this.$bus.$emit("activeCourseAddDialog", true, this.sectionNo)
    },
    createSection(newSection) {
      this.sectionTree.push(newSection)
      this.sectionNo = newSection.nextSectionNo
    },
    showChange() {
      //console.log(this.categoryData.categoryValue)
    },
    addCourse() {
      this.$refs.courseForm.validate((valid) => {
        if (valid) {
          if (this.sectionTree.length === 0) {
            MessageUtils.showError("请至少添加一个章节！")
            return false
          }
          /**
           * 课程创建
           */
          this.showLoading(true, "正在创建课程...")
          this.course.sectionCount = this.sectionTree.length
          this.$api.course.save(this.course, this.logoFile.file.raw, this.categoryData.categoryValue, this.labelData.labels)
          .then(courseRes => {
            let courseId = courseRes.data
            /**
             * 章节创建
             */
            for (let i = 0; i < this.sectionTree.length; i++) {
              this.showLoading(true, "正在创建" + this.sectionTree[i].sectionName + "章节...")
              this.sectionTree[i].courseId = courseId
              this.$api.section.save(this.sectionTree[i])
              .then(sectionRes => {
                if (sectionRes.status === 400) {
                  this.showLoading(false, "")
                  this.$msg.showError(sectionRes.message)
                } else {
                  let sectionId = sectionRes.data
                  /**
                   * 资源上传
                   */
                  for (const file of this.sectionTree[i].fileList) {
                    this.showLoading(true, "正在上传" + file.name + "文件...")
                    this.$api.section.uploadSectionResource(courseId, sectionId, file.raw)
                    .then(fileRes => {
                      if (fileRes.status === 400) {
                        this.showLoading(false, "")
                        this.$msg.showError(fileRes.message)
                      } else {
                        this.showLoading(false, "正在努力处理中...")
                        console.log(fileRes.message)
                      }
                    })
                  }
                }
              })
            }
            this.showLoading(false, "")
            this.$router.push("/course-manage")
            this.$bus.$emit("courseManageMenuChange", "all")
          })
          return true
        }
        MessageUtils.showError("请填写正确的信息！")
        return false
      })
    },
    labelClose(label) {
      this.labelData.labels.splice(this.labelData.labels.indexOf(label), 1);
    },
    showLabelInput() {
      if (this.labelData.labels.length < 3) {
        this.labelData.addLabelAble = true
        this.$nextTick(_ => {
          this.$refs.newLabelInput.$refs.input.focus()
        })
      } else {
        this.$msg.showError("课程标签最多添加三个！")
      }
    },
    handleLabelInputConfirm() {
      let inputValue = this.labelData.newLabel
      if (inputValue) {
        this.labelData.labels.push(inputValue)
      }
      this.labelData.addLabelAble = false
      this.labelData.newLabel = ""
    },
    getAllCategory() {
      this.$api.category.getAllCategory()
      .then(res => {
        this.categoryData.categories = res.data
      })
    },
    showLoading(isLoading, loadingText) {
      this.loading.isLoading = isLoading
      this.loading.loadingText = loadingText
    }
  },
  created() {
    this.getAllCategory()
  }
}
</script>

<style scoped>

.bg-1 {
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: 10px;
  height: 10px;
  background-color: #f8f8f8;
}

.bg-2 {
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  height: 2px;
  background-color: #999;
  width: 80%;
}

.section-desc {
  margin-top: 10px;
}

.submit-btn {
  margin-top: 20px;
  margin-left: 47%;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
