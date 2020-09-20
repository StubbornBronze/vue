<template>
    <div>
        <el-dialog title="收货地址" :visible.sync="showDialog" @close="cancel">
            <el-form :model="form" ref="form" :rules="rules">
                <el-form-item label="活动名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth" prop="region">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        dialogFormVisible: Boolean
    },
    data () {
        return {
            showDialog: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px',
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ]
            }
        }    
    }, watch: {
        dialogFormVisible() {
            this.showDialog = this.dialogFormVisible
        }
    }, methods: {
        cancel() {
            this.$refs['form'].resetFields();
            this.$emit("changeShow", false);
        },
        confirm() {
            this.$refs['form'].validate((valid) => {
            if (valid) {
                this.$emit('submit', this.form)
            } else {
                return false;
            }
            
            });
        }
    }
}

</script>