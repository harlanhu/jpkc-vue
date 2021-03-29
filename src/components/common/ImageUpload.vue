<template>
  <div id="image-upload">
    <div style="float: left">
      <el-upload ref="uploadImage"
                 action="#"
                 list-type="picture-card"
                 :multiple="false"
                 :auto-upload="false"
                 accept=".png, .jpg, .jpge"
                 :on-remove="imageRemove"
                 :on-change="imageChange">
        <i slot="default" class="el-icon-plus"/>
        <div slot="file" slot-scope="{file}">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="找不到图片">
          <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="imagePreview(file)">
            <i class="el-icon-zoom-in"/>
          </span>
          <span v-if="!imageFile.disabled" class="el-upload-list__item-delete" @click="imageDelete(file)">
            <i class="el-icon-delete"/>
          </span>
        </span>
        </div>
      </el-upload>
    </div>
    <el-dialog :visible.sync="imageFile.dialogVisible">
      <img width="100%" :src="imageFile.url" alt="找不到图片">
    </el-dialog>
    <el-button @click="uploadImage" style="float: left; margin-top: 50px; margin-left: 20px" type="text">立即上传</el-button>
  </div>
</template>

<script>
export default {
  name: "ImageUpload",
  props: {
    src: ''
  },
  data() {
    return {
      imageFile: {
        url: '',
        raw: {},
        file: {},
        displayVisible: false,
        disabled: false
      },
    }
  },
  methods: {
    imageRemove(file) {
      this.imageFile.url = ''
      this.imageFile.raw = {}
      this.imageFile.file = {}
      this.$ref.uploadImage.clearFiles()
    },
    imageChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      const isJPEG = file.raw.type === "image/jpeg"
      const isJPG = file.raw.type === "image/jpg"
      const isPNG = file.raw.type === "image/png"
      const isJPGE = file.raw.type === "image/jpge"
      const isLt2M = file.size / 1024 / 1024 < 5

      if (!isJPG && !isPNG && !isJPEG && !isJPEG) {
        this.$message.error("请上传 PNG 或 JPG 格式图片！")
        this.$refs.imageUpload.clearFiles()
      }
      if (!isLt2M) {
        this.$message.error("上传大小不能超过 5MB")
        this.$refs.uploadImage.clearFiles()
      }
      this.imageFile.file = file
      this.imageFile.raw = file.raw
      return isLt2M && isPNG && isJPG && isJPGE
    },
    imagePreview(file) {
      this.imageFile.url = file.url
      this.imageFile.file = file
      this.imageFile.raw = file.raw
      this.imageFile.displayVisible = true
    },
    imageDelete(file) {
      this.imageFile.url = ''
      this.imageFile.file = {}
      this.imageFile.raw = {}
      this.$refs.uploadImage.clearFiles()
    },
    uploadImage() {
      this.$emit("imageUpload", this.imageFile.file.raw)
      this.imageFile.url = ''
      this.imageFile.file = {}
      this.imageFile.raw = {}
      this.$refs.uploadImage.clearFiles()
    }
  },
}
</script>

<style scoped>

</style>
