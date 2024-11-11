<template>
    <div>
      <h2>Update tour guide</h2>
      <div v-if="errorValue" class="alert alert-danger mt-3">
            <p>Error: {{ errorValue }}</p>
        </div>
      <button @click="logValue">LogValue</button>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="text"
            :placeholder="defaultValue.email"
          ></b-form-input>
          <div :class="$style.errorInput" v-if="errorMessage.errorEmail">{{ errorMessage.errorEmail }}</div>
        </b-form-group>
  
        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.name"
             :placeholder="defaultValue.name"
          ></b-form-input>
          <div :class="$style.errorInput" v-if="errorMessage.errorName">{{ errorMessage.errorName }}</div>
        </b-form-group>
  
        <b-form-group id="input-group-3" label="Your phone:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.phone"
           :placeholder="defaultValue.phone"
          ></b-form-input>
          <div :class="$style.errorInput" v-if="errorMessage.errorPhone">{{ errorMessage.errorPhone }}</div>
        </b-form-group>
  
        <b-form-group id="input-group-4" label="Your experience:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.experience"
            :placeholder="defaultValue.experience"
          ></b-form-input>
          <div :class="$style.errorInput" v-if="errorMessage.errorExperience">{{ errorMessage.errorExperience }}</div>
        </b-form-group>
  
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  import { useRouter } from 'vue-router';
  import Swal from 'sweetalert2';
  
  export default {
    setup() {
      const form = ref({
        email: '',
        name: '',
        phone: '',
        experience: '',
      }); 
      const errorMessage = ref({
        errorEmail: '',
        errorName: '',
        errorPhone: '',
        errorExperience: '',
      });
      const defaultValue = ref({
        email: '',
        name: '',
        phone: '',
        experience: '',
      })
      const errorValue = ref(null);
      const route = useRoute();
      const router = useRouter();
      const tourGuideId = route.params.id;
      const emailPlaceholder = "Enter your email"; 

      const getTourGuideID = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/getTourGuideID`, {
            params: { tour_id: tourGuideId }  
        });
        console.log('Response dataz:', response.data.data);
        defaultValue.value.email =  response.data.data.email
        defaultValue.value.name =  response.data.data.name
        defaultValue.value.phone =  response.data.data.phone
        defaultValue.value.experience =  response.data.data.experience
    } catch (error) {
        console.error('Failed to fetch tour guide:', error);
        errorValue.value = error.response.data.error;
    }
};
  
const onSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post(`http://localhost:8000/api/UpdateTourGuide`, {
  tour_id: tourGuideId,
  email: form.value.email,
  name: form.value.name,
  phone: form.value.phone,
  experience: form.value.experience,
});
if (response.data.message == 'Update successful tour guide') {
      Swal.fire({
        title: 'Thành công!',
        text: 'Cập nhật tour guide thành công.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        goToTourGuide();
      });
    }
  } catch (error) {
    console.error('Update failed:', error);
    if (error.response) {
      const { data } = error.response;
      if (data && data.errors) {
        const { errors } = data;
        errorMessage.value.errorEmail = errors.email ? errors.email[0] : '';
        errorMessage.value.errorName = errors.name ? errors.name[0] : '';
        errorMessage.value.errorPhone = errors.phone ? errors.phone[0] : '';
        errorMessage.value.errorExperience = errors.experience ? errors.experience[0] : '';
        errorValue.value = errors.error ? errors.error[0] : '';

      } 
  }
}
};


  
      const logValue = () => {
        console.log('defaultValue', defaultValue);
      };
  
      const onReset = (event) => {
        event.preventDefault();
      };
      const goToTourGuide = () => {
        router.push({ name: 'TourGuide' });
        };
  
     
      onMounted(() => {
        getTourGuideID();
        });
  
      return {
        form,
        onSubmit,
        onReset,
        errorMessage,
        logValue,
        tourGuideId,
        emailPlaceholder,
        defaultValue,
        errorValue,
      };
    },
  };
  </script>
  
  <style lang="scss" module>
  @import './UpdateTourGuide.module.scss';
  </style>
  