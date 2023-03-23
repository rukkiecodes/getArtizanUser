<template>
  <v-sheet height="100vh" class="d-flex align-center auth">
    <div class="splat"></div>
    <img src="./assets/images/takeOff.svg" class="takeOffCOntainer" />
    <img class="cash" src="./assets/images/cash.svg" alt="" />
    <img class="hand" src="./assets/images/hand.svg" alt="" />
    <img class="check" src="./assets/images/check.svg" alt="" />
    <v-container class="mainSection d-flex justify-space-between">
      <v-card width="400" max-width="100%" flat color="transparent">
        <p class="text-h4 font-weight-bold text-grey-darken-4">
          Sign in to find an artizan
        </p>
        <span class="text-body-1 font-weight-regular text-grey-darken-4">
          If you Don't have an account You can
          <router-link to="/" class="text-decoration-none text-indigo font-weight-bold">Sign Up
            here</router-link></span>
      </v-card>
      <v-card elevation="0" width="400" max-width="100%" class="rounded-xl glass mt-10 mt-md-0">
        <v-card-text>
          <v-form>
            <v-text-field v-model="signin.email" label="Email" type="email" variant="plain" prepend-inner-icon="mdi-at" />
            <v-text-field v-model="signin.password" label="Password" variant="plain" prepend-inner-icon="mdi-lock-outline"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" />

            <v-btn @click="signin.signinUser" :loading="signin.loading" color="indigo" class="rounded-lg" block>
              Sign In
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-sheet>
</template>

<script setup>
import { ref } from "vue";
import { useUserSigninStore } from "@/store/auth/signin";

const signin = ref(useUserSigninStore());

const show1 = ref(false)
const rules = ref({
  required: value => !!value || 'Required.',
  min: v => v.length >= 8 || 'Min 8 characters',
  emailMatch: () => (`The email and password you entered don't match`),
})
</script>

<style scoped>
@import "./assets/style.css";
</style>