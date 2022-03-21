<template>
  <div class="container">
    <h2 class="text-center mt-5">TO-DO APP</h2>
    <div class="d-flex justify-content-center">
      <span class="usernameSpan">User: {{this.$store.state.username}}</span>
    </div>
    <!-- Search -->
    <div class="d-flex justify-content-between">
        <select class="form-select" aria-label="Default select example" v-on:blur="reset" @change="searchName" v-model.trim="selectedOption">
            <option selected>Search by author</option>
            <option :value="task.author.toLowerCase()" v-for="(task, index) in filter" v-bind:key="index">{{task.author}}</option>
        </select>

        <div class="input-group input-group-sm mb-3">
            <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Search" @focus="searchText" @change="searchText" v-model.trim="searchOption">
        </div>
    </div>

    <!-- Task table -->
      <table class="table table-bordered mt-5">
    <thead>
      <tr>
        <th scope="col">Task</th>
        <th scope="col">Status</th>
        <th scope="col" class="text-center">#</th>
        <th scope="col" class="text-center">#</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(task, index) in filterName" v-bind:key="index" :task="task">
        <th id="nameContainer">
          <span :class="{'finished': task.status === 'finished'}">
            <span class="byAuthor">By {{task.author}}</span>
            <span class="taskName">{{task.name}}</span>
            
            </span>
            </th>
        <td style="width: 120px">
          <span @click="changeStatus(index)" class="pointer"
          :class="{'text-danger' : task.status === 'to-do',
          'text-warning' : task.status === 'in-progress',
          'text-success' : task.status === 'finished'
          }"
          >
            {{firstCharUpper(task.status)}}
            </span>
            </td>
        <td>
          <div class="text-center" @click="editTask(index)">
            <span class="fa fa-pen"></span>
          </div>
        </td>
        <td>
          <div class="text-center" @click="deleteTask(index)">
            <span class="fa fa-trash"></span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

<table class="table">
  <tbody>
    <tr>
      <td>
            <table style="width: 100px" class="table table-bordered">
              <tbody>
                <tr>
                </tr>
              </tbody>
            </table>
      </td>
      <td>
        <table class="table">
          <tbody>
            <tr>
              <td class="text-center">{{remaining}} tasks archived!</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>



  </div>
</template>

<script>
export default {
  name: 'ArchivePage',
  data: () => ({
        selectedOption: '',
        searchOption: '',
        nameSearch: 'true',
        textSearch: 'false',
    }),
  props: {
    msg: String
  },
  methods: {
    deleteTask(index) {
      this.$store.state.tasks.splice(index, 1);
    },
    reset() {
        this.nameSearch = false;
        this.textSearch = false;
    },
    editTask(index) {
      this.$store.state.task = this.$store.state.tasks[index].name;
      this.$store.state.editedTask = index;
    },
    changeStatus(index){
      let newIndex = this.$store.state.availableStatuses.indexOf(this.$store.state.tasks[index].status);
      if(++newIndex > 2) newIndex = 0;
      this.$store.state.tasks[index].status = this.$store.state.availableStatuses[newIndex];
    },
    firstCharUpper(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    debug() {
      alert(this.$store.state.task)
    },
     searchName() {
        this.nameSearch = true;
        this.textSearch = false;
    },
    searchText() {
        this.nameSearch = false;
        this.textSearch = true;
    },
  },
  computed: {
      remaining() {
          return this.$store.state.tasks.filter(task => task.archived).length;
      },
      filterName: function () {
          return this.$store.state.tasks.filter((todoItem) => {
            if (this.nameSearch) {
              return todoItem.author.toLowerCase().trim().match(this.selectedOption.toLowerCase()) && todoItem.archived;
            } else if (this.textSearch) {
              return todoItem.name.toLowerCase().trim().match(this.searchOption.toLowerCase()) && todoItem.archived || todoItem.author.toLowerCase().trim().match(this.searchOption.toLowerCase()) && todoItem.archived;
            } else if (!this.textSearch && !this.nameSearch) {
                return todoItem.archived;
            }
        });
  },
    filter()  {
        return [...new Map(this.$store.state.tasks.map(task => [task.author, task])).values()];
    },
  }
};
</script>

<style scoped>

.pointer {
  cursor: pointer;
}

.finished {
  text-decoration: line-through;
}

select {
    width: 40%;
    height: 40px;
}

input {
    margin-left: 50%;
    height: 40px;
}
</style>