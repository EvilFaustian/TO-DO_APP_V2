<template>
  <div class="container">
    <h2 class="text-center mt-5">TO-DO APP</h2>

    <!-- Input -->
    <div class="d-flex">
      <input
        v-model="this.$store.state.task"
        type="text"
        class="form-control"
        placeholder="Enter new TODO task"
        @keyup.enter="submitTask"
      />
      <button @click="submitTask" class="btn btn-warning" rounded-0>
        Create
      </button>
    </div>
    <div class="d-flex justify-content-center">
      <span class="usernameSpan">User: {{ this.$store.state.username }}</span>
    </div>

    <!-- Task table -->
    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Status</th>
          <th scope="col" class="text-center">#</th>
          <th scope="col" class="text-center">#</th>
          <th scope="col" class="text-center">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in todosFiltered" v-bind:key="index">
          <th id="nameContainer">
            <span :class="{ finished: task.status === 'finished' }">
              <span class="byAuthor">By {{ task.author }}</span>
              <span class="taskName">{{ task.name }}</span>
            </span>
          </th>
          <td style="width: 120px">
            <span
              @click="changeStatus(index)"
              class="pointer"
              :class="{
                'text-danger': task.status === 'to-do',
                'text-warning': task.status === 'in-progress',
                'text-success': task.status === 'finished',
              }"
            >
              {{ firstCharUpper(task.status) }}
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
          <td>
            <div class="text-center" @click="archiveTask(index)">
              <span class="fa fa-save"></span>
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
                  <td>
                    <span
                      :class="{ active: this.$store.state.filter == 'all' }"
                      @click="this.$store.state.filter = 'all'"
                      >All</span
                    >
                  </td>
                  <td>
                    <span
                      :class="{ active: this.$store.state.filter == 'all' }"
                      @click="this.$store.state.filter = 'active'"
                      >Active</span
                    >
                  </td>
                  <td>
                    <span
                      :class="{ active: this.$store.state.filter == 'all' }"
                      @click="this.$store.state.filter = 'completed'"
                      >Completed</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <table class="table">
              <tbody>
                <tr>
                  <td class="text-center">{{ remaining }} task left!</td>
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
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    submitTask() {
      if (this.$store.state.task.length === 0) return;

      if (this.$store.state.editedTask === null) {
        this.$store.state.tasks.push({
          name: this.$store.state.task,
          status: "to-do",
          author: this.$store.state.username,
          archived: false,
        });
      } else {
        this.$store.state.tasks[this.$store.state.editedTask].name =
          this.$store.state.task;
        this.$store.state.editedTask = null;
      }
      this.$store.state.task = "";
    },
    deleteTask(index) {
      this.$store.state.tasks.splice(index, 1);
    },
    editTask(index) {
      this.$store.state.task = this.$store.state.tasks[index].name;
      this.$store.state.editedTask = index;
    },
    archiveTask(index) {
      this.$store.state.tasks[index].archived = true;
    },
    changeStatus(index) {
      let newIndex = this.$store.state.availableStatuses.indexOf(
        this.$store.state.tasks[index].status
      );
      if (++newIndex > 2) newIndex = 0;
      this.$store.state.tasks[index].status =
        this.$store.state.availableStatuses[newIndex];
    },
    firstCharUpper(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    debug() {
      alert(this.$store.state.task);
    },
  },
  computed: {
    todosFiltered() {
      if (this.$store.state.filter == "all") {
        return this.$store.state.tasks.filter((task) => !task.archived);
      } else if (this.$store.state.filter == "active") {
        return this.$store.state.tasks.filter(
          (task) => task.status != "finished" && !task.archived
        );
      } else if (this.$store.state.filter == "completed") {
        return this.$store.state.tasks.filter(
          (task) => task.status === "finished" && !task.archived
        );
      }
      return this.$store.state.tasks.filter((task) => !task.archived);
    },
    remaining() {
      return this.$store.state.tasks.filter(
        (task) => task.status != "finished" && !task.archived
      ).length;
    },
    archiveTodoFilter() {
      return this.$store.state.tasks.filter((task) => !task.archived);
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}

.finished {
  text-decoration: line-through;
}

.usernameSpan {
  margin-bottom: -30px;
  margin-top: 20px;
}

.byAuthor {
  position: relative;
  margin-right: -50px;
  top: -20px;
  font-style: normal;
  font-size: 12px;
  font-weight: 500;
  color: gray;
}

#nameContainer {
  padding: 10px;
  padding-top: 15px;
}
</style>