<template>
  <div class="container h-100">
    <div class="row mt-5">
      <div class="col-md-6 m-auto">
        <img
          class="
            img-fluid
            hero-img
            animate__animated animate__fadeIn animate__slow
          "
          src="../assets/signup_image.svg"
          alt="sign up image"
        />
      </div>
      <div class="col-md-6 signup">
        <form @submit.prevent="signUp" class="text-dark card card-body">
          <p class="text-center text-primary text-header">
            SignUp to Get Started
          </p>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              v-model.trim="email"
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

          <button type="submit" class="btn btn-primary">SignUp</button>
          <router-link to="/signin" class="mt-2">
                Have an account? SignIn here
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signUp() {
      if (!this.email) return this.$swal("please provide email!");
      if (!this.password) return this.$swal("please provide password!");

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((res) => {
          console.log("user created using firebase ", res.user);
          this.$router.push({ path: "/signin" });
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          const errorMessage = error.message;
          console.log(errorMessage);
          this.$swal({
            icon: "error",
            title: "user already exists!!",
            text: "This email id has already been registered! kindly sign in",
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
.signup{
  margin-top: -5rem;
}
</style>
