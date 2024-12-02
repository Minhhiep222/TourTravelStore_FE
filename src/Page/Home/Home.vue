<template>
  <div>
    <div v-if="displayErrors">{{ displayErrors }}</div>
    <b-container v-if="displayErrors == null">
      <b-row>
        <b-col v-for="(tour, index) in newesTour" :key="index" cols="3">
          <div>
            <b-card :title="tour.name" :img-src="tour.images.length > 0
                ? `http://localhost:8000/${tour.images[0].image_url}`
                : ''
              " :img-alt="tour.images.length > 0
                  ? `http://localhost:8000/${tour.images[0].alt_text}`
                  : ''
                " img-top tag="article" style="max-width: 20rem" class="mb-2">
              <b-card-text>
                {{ tour.description }}
              </b-card-text>
              <b-button @click="handleAddTourToFavorite(tour.id)" variant="primary">Add to Favorite</b-button>
              <b-button @click="detailTour(tour.id)" variant="primary">Detail Tour</b-button>
              <!-- <b-button @click="logValue" variant="primary">log</b-button> -->
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { inject } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default {
  name: "HomeComponent",
  setup() {
    const router = useRouter();
    const valueCurrentUser = inject("valueCurrentUser");
    const newesTour = ref([]);
    const notification = ref(null);
    const displayErrors = ref(null);

    const listenForNewTours = () => {
      // window.Echo.channel('tour-notifications')
      //   .listen('TourCreated', (event) => {
      //     console.log('New tour created:', event.tour);
      //     notification.value.unshift(event.tour);
      //   });
    };

    const getNewesTour = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/displayNewstTour"
        );
        newesTour.value = response.data.data;
        console.log("newesTour", newesTour.value);
      } catch (error) {
        console.error("Failed to retrieve tours:", error.response.data.message);
        displayErrors.value = error.response.data.message;
        console.log("displayErrors.value", displayErrors.value);
      }
    };
    const handleAddTourToFavorite = async (tour_id) => {
      let userID = null;
      if (valueCurrentUser.value && valueCurrentUser.value.id) {
        userID = valueCurrentUser.value.id;
      }
      try {
        const response = await axios.post(
          "http://localhost:8000/api/addTourToFavorite",
          {
            user_id: userID,
            tour_id: tour_id,
          }
        );
        if (
          response.data.message == "Tour added to favorites list successfully."
        ) {
          Swal.fire({
            title: "Thành công!",
            text: "Đã thêm vào danh sách yêu thích",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        if (error.response) {
          console.error("Failed to retrieve tours:", error.response);
          alert(error.response.data.error);
        } else {
          console.error("Error:", error.message);
        }
      }
    };
    const detailTour = (id) => {
      router.push({ name: "Detail", params: { id } });
    };

    const logValue = () => {
      console.log("valueCurrentUser", valueCurrentUser);
      console.log("notification", notification);
    };
    onMounted(() => {
      getNewesTour();
      listenForNewTours;
    });

    return {
      newesTour,
      displayErrors,
      handleAddTourToFavorite,
      logValue,
      detailTour,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./Home.module.scss";
</style>
