<template>
  <div>
      <el-row>
          <span>下拉框</span>
      </el-row>
      <!-- 上传文件 -->
      <el-row>
        <el-col :span="12" class="BtnTextAlignL">
            <el-upload
                ref="upload"
                action="#"
                :multiple="true"
                :on-change="onChange"
                :show-file-list="false"
                :auto-upload="false"
                >
                <el-button slot="trigger" size="small" type="primary">选择文件夹</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始上传</el-button>
                <div slot="tip" class="el-upload__tip">上传的文件夹和文件名称不能包含中文或特殊字符</div>
            </el-upload>
        </el-col>

        <el-col :span="12" class="BtnTextAlignR">
            <el-button>重置</el-button>
        </el-col>
      </el-row>
      <!-- 文件列表 -->
      <el-row>
           <el-table :data="fileNameList" max-height="400px">
                <el-table-column label="文件名称" prop="fileName"></el-table-column>
            </el-table>
      </el-row>
  </div>
</template>

<script>
export default {
  data() {
      return {
          fileNameList: []
      }
  },
  methods: {
      onChange(fileList) {
          console.log(fileList)
           
      },
      submitUpload() {

      }
  }
};
</script>