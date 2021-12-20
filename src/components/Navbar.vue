<template>
  <nav class="navbar navbar-dark bg-secondary">
    <router-link class="navbar-brand" to="/">
      <img src="../assets/logo.png" width="30" height="30" alt="" />
    </router-link>
    <div>
      <div v-if="!isAuthenticated" class="d-flex">
       
        <div>
          <router-link to="/signup" tag="button" class="btn btn-dark mr-2"
          >SignUp</router-link
        >
        </div>
         <div>
          <router-link to="/signin" tag="button" class="btn btn-dark mr-2"
          >SignIn</router-link
        >
        </div>
      </div>
      <div v-else>
        <span class="mr-2 badge badge-dark mail p-1"> {{ email }} </span>
        <button type="button" class="btn btn-danger m-1" @click="logout" >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
   name : "Navbar",
   computed : {
       ...mapGetters(["email", "isAuthenticated"])
   },
    methods: {
        ...mapActions(["logout"])
    }

}
</script>

<style>
.mail{
  font-size: 20px;
}

</style>