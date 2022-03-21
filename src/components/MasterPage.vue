<template>
<div id="secure">
    <div id="app">
        <ul class="nav">
            <li><router-link :to="{ name: 'home'}">Home</router-link></li>
            <li><router-link :to="{ name: 'archive'}">Archive</router-link></li>
            <li><router-link :to="{ name: 'login'}">Login</router-link></li>
        </ul>

        <div class="container">
          <router-view></router-view>
        </div>
        
    </div>
</div>
</template>


<script>
export default {
  name: "MainMaster",
}

</script>

<style scoped>
.container {
  margin: auto;
  max-width: 600px;
  padding: 10px;
}
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .flex-center {
    display: flex;
    justify-content: center;
  }
  .nav {
    display: flex;
    list-style: none;
    padding: 15px 0;
    margin: 0;
    justify-content: center;
    background: #F5F8FA;
    border-bottom: 1px solid lightgrey;
    margin-bottom: 24px;
  }
  .nav a {
    color: #636b6f;
    padding: 0 25px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: .1rem;
    text-decoration: none;
    text-transform: uppercase;
  }

</style>