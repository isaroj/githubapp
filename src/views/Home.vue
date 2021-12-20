<template>
  <div class="container h-100">
    <div class="row mt-5" v-if="!userData">
      <div class="col-md-6">
        <img
          src="../assets/home.svg"
          alt=""
          class="img-fluid hero-img animate__animated animate__fadeIn animate__slow"
        />
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-center p-5">
        <h3
          class="text-center text-uppercase animate__animated animate__bounce"
        >
          Search your github profile
        </h3>
        <input
          type="text"
          placeholder="Github User Name"
          class="form-control"
          v-model.trim="userName"
        />
        <button type="button" class="btn btn-primary" @click="fetchData" >
          Search
        </button>
      </div>
    </div>

    <div class="row mt-3" v-else>
      <div class="col-md-4">
        <UserCard :userData="userData" :resetData="resetData" />
      </div>
      <div class="col-md-8">
        <Repos :repoUrl="repoUrl" />
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import Axios from 'axios'
import UserCard from '../components/UserCard.vue'
import Repos from '../components/Repos.vue'

export default {
  name: 'Home',
  components: {
    UserCard,
    Repos
  },
  data(){
    return {
      userName : "",
      userData : null,
      repoUrl : ""
    }
  },
  computed : {
    ...mapGetters(["isAuthenticated"])
  },
  watch : {
    isAuthenticated : function(newVal){
      console.log("NEWVAL",newVal);
      if(!newVal){
        this.$router.replace("/signin")
      }
    }
  },
  methods : {
    fetchData(){
      if(!this.userName){
        this.$swal({
            icon: "error",
            title: "Blank Field",
            text: "please enter any valid github username",
          });
        return
      }
        const baseUrl = "https://api.github.com/users/";
        const finalUrl = baseUrl + this.userName;
        const configObj = {
          method : "GET",
          url : finalUrl
        }
        Axios(configObj)
        .then(res =>{
          this.userData = res.data;
          this.repoUrl = res.data?.repos_url
        })
        .catch(err =>{
          console.log("unable to fetch user data from github", err);
        })
    },
    resetData(){
      this.repoUrl = "",
      this.userName  = "",
      this.userData = null
    }
  }
}
</script>

<style>
.hero-img {
  height: 70vh;
  width: 100%;
}
button {
  margin-top: 5px;
  border-radius: 5px;
  text-transform: uppercase;
}
</style>