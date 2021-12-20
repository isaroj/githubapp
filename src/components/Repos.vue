<template>
  <div v-for="repo of repos" class="list-group" :key="repo.id" >
    <a
      :href="repo.html_url"
      target="_blank"
      class="list-group-item list-group-item-action mb-3 animate__animated animate__pulse"
    >
      <div>
        <h6 class="badge badge-primary repo">
          {{ repo.name }}
        </h6>
        <p class="text-muted">
          {{ repo.description }}
        </p>
        <div class="d-flex justify-content-around">
          <span>
            <i class="fas fa-eye" aria-hidden="true"></i>
            {{ repo.watchers_count }}
          </span>
          <span>
            <i class="fas fa-code-branch"></i> {{ repo.stargazers_count }}
          </span>
          <span>
            <i class="fas fa-star" aria-hidden="true"></i>
            {{ repo.forks_count }}
          </span>
          <span>
            <i class="fas fa-exclamation-circle" aria-hidden="true"></i>
            {{ repo.open_issues }}
          </span>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
   name : "Repos",
   props : {
       repoUrl : {
           required : true,
           type : String
       }
   },
   data(){
      return {
           repos : []
      }
   },
   methods : {
       fetchAllRepos(){
           const configObj = {
               method : "GET",
               url : this.repoUrl
           }
           Axios(configObj)
           .then(res =>{
               this.repos = res.data;
           })
           .catch(err =>{
               console.log("unable to fetch repos", err);
           })
       }
   },
   mounted(){
       this.fetchAllRepos();
   }
}
</script>

<style>
.repo{
  font-size: 20px;
}
</style>