<script>
import CheckBoxGroup from "./CheckBoxGroup";
import Pagination from "./Pagination";

export default {
  name: "TableView",
  components: {
    CheckBoxGroup,
    Pagination,
  },
  props: {
    data: {
      type: [Array, Object],
      required: true,
    },
    showPage: {
      type: Boolean,
      default: true,
    },
    columns: { type: Array, default: () => [] },
    title: { type: String, required: true },
  },
  data() {
    return {
      key: 1,
      currentPage: 1, // 當前頁
      pageSize: 10, // 每頁顯示的條數
      multipleSelection: [], // 已選中的行
      isUpdateSelection: true, // 是否更新已選中
      pageSizes: [10, 25, 50, 100],
      tableRowWarning: "",
      tableRowSuccess: "",
      checkboxVal: [],
      formThead: [],
    };
  },
  computed: {
    formatData() {
      // 分頁後data
      const startNum = (this.currentPage - 1) * this.pageSize;
      const endNum = startNum + this.pageSize;

      return this.data.slice(startNum, endNum);
    },
    current: {
      get() {
        return this.currentPage;
      },
      set() {
        if (this.currentPage < 1) {
          this.currentPage = 1;
        } if (Math.ceil(this.total / this.pageSize) < this.currentPage) {
          this.currentPage = Math.ceil(this.total / this.pageSize);
        }
      },

    },
    columnsData() {
      return this.columns.filter((item) => {
        if (item.name !== "全選") {
          return item;
        }
        return false;
      });
    },
    total() {
      return this.data.length;
    },
  },
  watch: {
    checkboxVal(valArr) {
      this.formThead = this.columns.filter((i) => valArr.indexOf(i.name) >= 0);
      this.key = this.key + 1;
      localStorage.setItem(
        `tableHead_${this.title}`,
        JSON.stringify(this.checkboxVal),
      );
    },
  },
  created() {
    this.tableHead();
  },
  methods: {
    getImg(file) {
      const icon = {
        doc: this.$store.state.FileUpload.word,
        docx: this.$store.state.FileUpload.word,
        xls: this.$store.state.FileUpload.excel,
        xlsx: this.$store.state.FileUpload.excel,
        pdf: this.$store.state.FileUpload.pdf,
      };
      console.log(file);
      if (icon[file.type] === undefined) {
        return `${process.env.VUE_APP_API}/file/download/${file.guid}`;
      }
      return icon[file.type];
    },
    tableHead() {
      if (localStorage.getItem(`tableHead_${this.title}`)) {
        this.checkboxVal = JSON.parse(
          localStorage.getItem(`tableHead_${this.title}`),
        );
      } else {
        [...this.columns].forEach((item, index) => {
          console.log(item.name);
          this.checkboxVal.push(item.name);
          if (item.name === this.checkboxVal[index]) {
            this.formThead.push(item);
          }
        });
      }
    },
    changeFun(val) {
      this.$parent.isDisableBtn = val.length;
      if (this.isUpdateSelection) {
        this.multipleSelection = val;
      } else {
        console.log(this.isUpdateSelection);
        this.isUpdateSelection = true;
      }
    },
    handleSizeChange(pagesize) {
      // 每頁條數改變時觸發
      this.isUpdateSelection = false; // 不更新選中行
      this.pageSize = pagesize;
      this.updateSeletion();
    },
    handleCurrentChange(cur) {
      // 當前頁改變時觸發
      this.isUpdateSelection = false; // 不更新選中行
      this.currentPage = cur;
      this.updateSeletion();
    },
    updateSeletion() {
      const vm = this;
      this.$nextTick(() => {
        vm.data.forEach((item) => {
          if (this.multipleSelection.indexOf(item) >= 0) {
            vm.isUpdateSelection = false; // 不更新選中行
            vm.$refs.multipleTable.toggleRowSelection(item, true); // 選中所在行
          }
        });
        vm.isUpdateSelection = true; // 更新選中行
      });
    },
    handleBtnClick(method, row) {
      this.$emit("handleBtnClick", { method, row });
      // this.$parent.printData();//直接調用父組件的方法
    },
  },
};
</script>
<template src="./template.html" />
<style src="./style.css"></style>
