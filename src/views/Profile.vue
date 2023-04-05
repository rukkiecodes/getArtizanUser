<template>
  <v-container>
    <v-card flat color="transparent" width="400" max-width="100%" class="mx-auto">
      <v-card-text class="text-center">
        <v-avatar color="indigo" size="80">
          <v-img v-if="profile.user?.avatar" :src="profile.user?.avatar" cover />
          <v-icon v-else size="30">mdi-account</v-icon>
        </v-avatar>
      </v-card-text>
      <v-card-text class="text-center">
        <v-card-title class="text-h5 text-grey-darken-4">
          {{ profile.user?.name }}
        </v-card-title>
        <v-card-subtitle class="text-body-2 text-grey-darken-4">
          {{ profile.user?.email }}
        </v-card-subtitle>
      </v-card-text>
      <v-card-text v-if="profile.user?.gender" class="text-center">
        <v-card-subtitle class="px-0 text-caption">Gender</v-card-subtitle>
        {{ profile.user?.gender }}
      </v-card-text>
      <v-card-text v-if="profile.user?.stateOfResidence" class="text-center">
        <v-card-subtitle class="px-0 text-caption">State Of Residence</v-card-subtitle>
        {{ profile.user?.stateOfResidence }}
      </v-card-text>
      <v-card-text v-if="profile.user?.LGA" class="text-center">
        <v-card-subtitle class="px-0 text-caption">Local Government Area</v-card-subtitle>
        {{ profile.user?.LGA }}
      </v-card-text>
      <v-card-text v-if="profile.user?.phone" class="text-center">
        <v-card-subtitle class="px-0 text-caption">Phone</v-card-subtitle>
        {{ profile.user?.phone }}
      </v-card-text>

      <v-card-actions>
        <v-btn block @click="drawer = true" class="ma-4 text-caption rounded-lg bg-indigo mx-auto hidden-lg-and-up">
          Edit Profile
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>

  <v-navigation-drawer v-model="drawer" location="right" width="350" border="0" color="indigo-lighten-5">
    <v-card class="ma-4" :elevation="flat" :color="color" rounded="xl">
      <v-card-title class="text-grey-darken-4 text-body-1">Edit your profile</v-card-title>
      <v-card-text class="text-center my-4">
        <v-avatar @click="clickOnInput" color="indigo" size="80" style="cursor: pointer;">
          <v-img v-if="profile.user?.avatar" :src="profile.user?.avatar" cover />
          <v-icon v-else size="30">mdi-account</v-icon>
        </v-avatar>
      </v-card-text>
      <input type="file" id="avatarInput" style="display: none" @change="setAvatar" />

      <v-card-text>
        <v-select label="Gender" v-model="profile.gender" :items="['Male', 'Female']" density="compact"
          variant="underlined" color="indigo-accent-4" />
        <v-autocomplete @update:model-value="e => currentState(e)" v-model="profile.stateOfResidence"
          :items="app.location" item-title="state" item-value="state" label="State of residence" density="compact"
          variant="underlined" color="indigo-accent-4" />
        <v-autocomplete v-model="profile.LGA" :items="lga" label="Local government of residence" density="compact" variant="underlined"
          color="indigo-accent-4" />
        <v-text-field v-model="profile.phone" label="Phone" density="compact" variant="underlined"
          color="indigo-accent-4" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="profile.updateProfile" :loading="profile.loading" class="bg-indigo" rounded="xl" block>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useProfileStore } from "@/store/profile/profile";
import { useDisplay } from "vuetify";
import { useAppStore } from "@/store/app";

const { name } = useDisplay();

const profile = ref(useProfileStore());
const drawer = ref(true);
const app = useAppStore()

let lga = ref([])

const clickOnInput = () => {
  document.querySelector("#avatarInput").click();
};

onMounted(() => {
  profile.value.gender = profile.value.user?.gender;
  profile.value.stateOfResidence = profile.value.user?.stateOfResidence;
  profile.value.LGA = profile.value.user?.LGA;
  drawerVisibility()
});

const setAvatar = (e) => {
  profile.value.file = e;
  profile.value.updateAvatar();
};

const currentState = e => {
  let currnetLga = app.location.filter(obj => obj.state === e)
  let object = { ...currnetLga }
  lga = object[0].lgas
}

const flat = computed(() => {
  switch (name.value) {
    case "xs":
      return 0;
    case "sm":
      return 0;
    case "md":
      return 0;
    case "lg":
      return 5;
    case "xl":
      return 5;
  }

  return undefined;
});

const color = computed(() => {
  // name is reactive and
  // must use .value
  switch (name.value) {
    case "xs":
      return "indigo-lighten-5";
    case "sm":
      return "indigo-lighten-5";
    case "md":
      return "indigo-lighten-5";
    case "lg":
      return "white";
    case "xl":
      return "white";
  }

  return undefined;
});

const drawerVisibility = () => {
  switch (name.value) {
    case 'xs': return drawer.value = false
    case 'sm': return drawer.value = false
    case 'md': return drawer.value = false
    case 'lg': return drawer.value = true
    case 'xl': return drawer.value = true
    case 'xxl': return drawer.value = true
  }
}
</script>
