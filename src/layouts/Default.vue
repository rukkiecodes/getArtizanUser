<template>
  <v-app>
    <AppBar />
    <Drawer />

    <v-main class="bg-indigo-lighten-5">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import AppBar from "./AppBar.vue";
import Drawer from "./Drawer.vue";
import { useProfileStore } from "@/store/profile/profile";
import { useGetBookingStore } from "@/store/booking/getBookings";
import { useuserOverviewStore } from "@/store/overview";
import { useArtizansStore } from "@/store/artizans";
import { onMounted, ref } from "vue";
import { useAppStore } from "@/store/app";

const profile = ref(useProfileStore());
const booking = useGetBookingStore();
const count = useuserOverviewStore();
const artizan = useArtizansStore()
const app = useAppStore()

onMounted(() => {
  profile.value.getProfile();
  booking.getBookings()
  count.countPendingStates();
  count.countApprovedStates();
  count.countCompletedStates();
  artizan.getArtizans()
  app.getCategories()
});
</script>
