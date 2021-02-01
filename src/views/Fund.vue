<template>
  <div class="page">
    <div class="time block">
    <el-date-picker
      v-model="dateValue"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
    <div class="search">
      <el-button class="bt_search" type="success" size="small" @click="clickSearch"
        >查找</el-button
      >
    </div>

  </div>
    <div class="add">
      <el-button class="bt_add" type="primary" size="small" @click="clickAdd"
        >添加</el-button
      >
    </div>

    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="日期" width="250">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="收支类型" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.type }}</span>
          </template>
        </el-table-column>

        <el-table-column label="收支描述" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.desc }}</span>
          </template>
        </el-table-column>

        <el-table-column label="收入" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px; color: green">{{
              scope.row.income
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="支出" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px; color: red">{{
              scope.row.expand
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="资金变化" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px; color: rgb(0, 153, 255)">{{
              scope.row.cash
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="备注" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.remark }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pa block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.current"
          :page-sizes="pagination.sizes"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </div>
    </template>

    <Dialog :dialog="dialog" :form="form" @update="getTableData"></Dialog>
  </div>
</template>


<script>
import Dialog from "../components/Dialog";
export default {
  components: {
    Dialog,
  },
  created() {
    this.getTableData();
  },
  data() {
    return {
       pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dateValue: '',
      pagination:{
        total:0,
        sizes:[
          5, 10, 15, 20
        ],
        size:5,
        current:1
      },
      tableData: [],
      allTableData:[],
      searchTableData:[],
      form: {
        type: "",
        desc: "",
        income: "",
        expand: "",
        cash: "",
        remark: "",
      },
      dialog: {
        type: "add",
        dialogFormVisible: false,
      },
    };
  },
  methods: {
    handleEdit(index, row) {
      this.form = {
        type: row.type,
        desc: row.desc,
        income: row.income,
        expand: row.expand,
        cash: row.cash,
        remark: row.remark,
        id: row._id,
      };
      this.dialog = {
        title: "修改资金信息",
        type: "edit",
        dialogFormVisible: true,
      };
    },
    handleDelete(index, row) {
      let id = row._id;
      this.$axios
        .delete("http://127.0.0.1:5000/api/profile/delete/" + id)
        .then((res) => {
          console.log(res.data);
          this.getTableData();
        });
    },
    getTableData() {
      this.$axios.get("http://127.0.0.1:5000/api/profile/").then((res) => {
        this.allTableData=res.data
        this.searchTableData=this.allTableData
        this.pagination.total=this.searchTableData.length;
        this.setPaginations();
      });
    },
    setPaginations(){
        let start=this.pagination.size*(this.pagination.current-1);
        let end=this.pagination.size*this.pagination.current
        this.tableData=this.searchTableData.filter((item,index)=>{
        return index>=start&&index<end;
        })
    },
     handleSizeChange(val) {
        this.pagination.size=val;
        this.setPaginations();
      },
        handleCurrentChange(val) {
        this.pagination.current=val;
        this.setPaginations();
      },
    clickAdd() {
      this.dialog = {
        title: "添加资金信息",
        type: "add",
        dialogFormVisible: true,
      };
      this.form = {
        type: "",
        desc: "",
        income: "",
        expand: "",
        cash: "",
        remark: "",
      };
    },
    clickSearch(){
      let start=new Date(this.dateValue[0]).getTime();
      let end=new Date(this.dateValue[1]).getTime();
      this.searchTableData=this.allTableData.filter(item=>{
        let time=new Date(item.date).getTime();
        return time>start && time<end;
      })
      this.pagination.total=this.searchTableData.length;
    }
  },
};
</script>

<style lang="less">
.page {
  width: calc(100vw - 190px);
  .add {
    width: 100%;
    .bt_add {
      float: right;
      margin-right: 50px;
      margin-top: 10px;
    }
  }
  .time{
    float: left;
    display: flex;
    flex-direction: row;
    align-items: center;
    .search{
      margin-left: 10px;
    }
    margin-left: 10px;
    margin-top: 5px;
  }
  .pa{
    float: right;
    margin-right: 50px;
    margin-top: 10px;
  }
}
</style>
