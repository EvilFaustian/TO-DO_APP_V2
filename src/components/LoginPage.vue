<template>
<section class="vh-50" style="background-color: #ccc;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12">
        <div class="card shadow-2-strong" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <h3 class="mb-5">Sign in</h3>

            <div class="form-outline mb-4">
              <input type="text" v-model="input.username" id="typeEmailX-2" class="form-control form-control-lg" placeholder="Name" />
            </div>

            <button class="btn btn-primary btn-lg btn-block" @click="login()" type="button">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            input: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            if(this.input.username != "") {
                this.$store.commit("setAuthentication", true);
                this.$store.state.username = this.input.username;
                this.$router.replace({name: "home"})
            } else {
                alert("Must type a name")
            }
        }
    }
}
</script>