<template>
  <div>
    <el-row>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-row>
    <el-row>
      <el-button type="primary" plain @click="popDialogForm">主要按钮</el-button>
    </el-row>

    <el-row>
      <el-upload
        action="/"
        :on-change="onChange"
        :auto-upload="false"
        :show-file-list="false"
        accept=".xls, .xlsx, .csv"
      >
        <el-button size="small" type="primary" class="upload-bom">
          选择文件
        </el-button>
        <!--              <div slot="tip" v-if='fileData'>{{ fileData.name }}</div>-->
      </el-upload>
    </el-row>
    <el-row>
      <el-table :data="outputs" style="margin-top: 20px">
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
      </el-table>
    </el-row>


    <el-row>
      <el-button type="primary" plain @click="popUpload">弹出上传</el-button>
    </el-row>

    <dialog-form
      :dialogFormVisible="dialogFormVisible"
      @changeShow="showDialog"
      @submit="addOrModify"
    ></dialog-form>
    <upload-progress
        :failedList="failedList"
        :importType="importType" 
        :totalCount="totalCount"
        :successCount="successCount"
        :uploadVisible="uploadVisible"
        @changeVisible="changeVisible"
    >
    </upload-progress>
  </div>
</template>

<script>
import DialogForm from "../components/DialogForm";
import UploadProgress from "../components/UploadProgress";
import XLSX from "xlsx";
export default {
  components: { DialogForm, UploadProgress },
  data() {
    return {
        uploadVisible: false,
        totalCount: 10,
        successCount: 10,
        importType: "excel",
        failedList: [
            {index: 1, status: "失败", message: "test"}
        ],
      dialogFormVisible: false,
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      outputs: [], // 保存读取出来的数据
      fileData: "", // 保存选择的文件
    };
  },
  mounted() {},
  methods: {
      popUpload() {
          this.uploadVisible = true;
      },
      changeVisible(data) {
          this.uploadVisible = data;
      },
    popDialogForm() {
      this.dialogFormVisible = true;
    },
    showDialog(data) {
      this.dialogFormVisible = data;
    },
    addOrModify(form) {
      console.log(form);
      this.dialogFormVisible = false;
    }, // 文件选择回调
    onChange(file) {
      this.fileData = file; // 保存当前选择文件
      this.readExcel(); // 调用读取数据的方法
    },
    // 读取数据
    readExcel() {
      let that = this;
      const files = that.fileData;
      console.log(files);
      console.log(files.size);
      if (!files) {
        //如果没有文件
        return false;
      } else if (!/\.(xls|xlsx|csv)$/.test(files.name.toLowerCase())) {
        this.$message.error("上传格式不正确，请上传xls或者xlsx格式");
        return false;
      }
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          // console.log(data)
          const workbook = XLSX.read(data, {
            type: "binary", codepage: 936
          });
          console.log(workbook.SheetNames);
          const wsname = workbook.SheetNames[0]; //取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
          console.log(ws);
          that.outputs = []; //清空接收数据
          for (var i = 0; i < ws.length; i++) {
            var sheetData = {
              // 键名为绑定 el 表格的关键字，值则是 ws[i][对应表头名]
              name: ws[i]["姓名"],
              age: ws[i]["年龄"],
            };
            that.outputs.push(sheetData);
          }
          this.$refs.upload.value = "";
        } catch (e) {
          return false;
        }
      };
      // 如果为原生 input 则应是 files[0]
      fileReader.readAsBinaryString(files.raw);
    },
  },
};
</script>