<template>
    <el-dialog title="上传状态" :visible.sync="showDialog" @close="cancel">
        <el-row type="flex" align="middle">
            <el-col :span="22">
                <el-progress :text-inside="true" :stroke-width="24" :percentage="(success/total) * 100" status="success">1122</el-progress>
            </el-col>
            <el-col :span="2">
                {{success}}/{{total}}
            </el-col>   
        </el-row>
        
        <el-table :data="failedList">
            <el-table-column property="index" label="行号" width="150" v-if="type == 'excel'"></el-table-column>
            <el-table-column property="name" label="文件名称" width="150" v-if="type == 'json'"></el-table-column>
            <el-table-column property="status" label="状态" width="200"></el-table-column>
            <el-table-column property="message" label="原因"></el-table-column>
        </el-table>

        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary">确 定</el-button>
        </div>
    </el-dialog>  
</template>

<script>
export default {
    props: {
        failedList: Array,
        importType: String,
        totalCount: Number,
        successCount: Number,
        uploadVisible: Boolean

    },
    data() {
        return {
            type: this.importType,
            list: this.failedList,
            total: this.totalCount,
            success: this.successCount,
            showDialog: this.uploadVisible
        }
    },
    watch: {
        failedList() {
            this.list = this.failedList;
        },
        totalCount() {
            this.total = this.totalCount;
        },
        successCount() {
            this.success = this.successCount;
        },
        uploadVisible() {
            this.showDialog = this.uploadVisible;
        }
    },
    methods: {
        cancel() {
            this.$emit("changeVisible", false);
        }
    }
}
</script>