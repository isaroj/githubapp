<template>
  <div class="container h-100">
    <div class="row mt-5">
      <div class="col-md-6">
        <img
          src="../assets/signin_image.png"
          alt=""
          class="img-fluid hero-img animate__animated animate__fadeIn animate__slow"
        />
      </div>

      <div class="col-md-6 signin">
        <form @submit.prevent="signIn" class="text-dark card card-body">
          <p class="text-center text-primary text-header">Login to Continue</p>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              v-model.trim = "email"
              required
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              v-model.trim="password"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary btn-block">
            SignIn
          </button>

          <router-link to="/signup" class="mt-2"
            >Have an account? SignUp here</router-link
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  watch: {
    isAuthenticated: function (newVal) {
      console.log(" NEWVAL", newVal);
      if (newVal) this.$router.replace("/");
    },
  },
  methods: {
    signIn() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((res) => {
          console.log(res.user);
          this.$router.replace("/");
        })
        .catch((error) => {
          console.log(error);
          this.$swal({
            icon: "error",
            title: "credentials mismatched",
            text: "please enter correct email-id & password",
          });
        });
    },
  },
};
</script>

<style>
.hero-img {
  height: 445px;
  width: 100%;
}
.text-header {
  text-transform: uppercase;
  border-bottom: 1px solid blue;
  font-size: 22px;
}
.signin{
  margin-top: -5rem;
}
</style>