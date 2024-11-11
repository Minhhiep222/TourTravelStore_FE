<template>
  <div>
    <h2>Add Tour Guide</h2>
    <!-- <button @click="logValue">Log Value</button> -->
    
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="text"
          placeholder="Enter email"
        ></b-form-input>
        <div :class="$style.errorInput" v-if="errorMessage.errorEmail">{{ errorMessage.errorEmail }}</div>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Enter name"
        ></b-form-input>
        <div :class="$style.errorInput" v-if="errorMessage.errorName">{{ errorMessage.errorName }}</div>
      </b-form-group>

      <b-form-group id="input-group-3" label="Your Phone:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.phone"
          placeholder="Enter phone"
        ></b-form-input>
        <div :class="$style.errorInput" v-if="errorMessage.errorPhone">{{ errorMessage.errorPhone }}</div>
      </b-form-group>

      <b-form-group id="input-group-4" label="Your Experience:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.experience"
          placeholder="Enter experience"
        ></b-form-input>
        <div :class="$style.errorInput" v-if="errorMessage.errorExperience">{{ errorMessage.errorExperience }}</div>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
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

    const router = useRouter();

    
    const onSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('email', form.value.email);
      formData.append('name', form.value.name);
      formData.append('phone', form.value.phone);
      formData.append('experience', form.value.experience);
      try {
        const response = await axios.post('http://localhost:8000/api/addTourGuide', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data.message === 'Create successful tour guide') {
        Swal.fire({
        title: 'Success!',
        text: 'Create successful tour guide',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        goToAddTourGuide();
      });
    }
      } catch (error) {
        console.error('Registration failed:', error.response.data);
        if (error.response && error.response.data) {
          const { errors } = error.response.data;
          errorMessage.value.errorEmail = errors.email ? errors.email[0] : '';
          errorMessage.value.errorName = errors.name ? errors.name[0] : '';
          errorMessage.value.errorPhone = errors.phone ? errors.phone[0] : '';
          errorMessage.value.errorExperience = errors.experience ? errors.experience[0] : '';
        }
      }
    };

    const logValue = () => {
      console.log('errorMessage', errorMessage);
    };

    const onReset = (event) => {
      event.preventDefault();
      form.value = { email: '', name: '', phone: '', experience: '',};
    
      errorMessage.value = { errorEmail: '', errorName: '', errorPhone: '', errorExperience: ''}; 
    };

    const goToAddTourGuide = () => {
      router.push({ name: 'TourGuide' });
    };

    return {
      form,
      onSubmit,
      onReset,
      errorMessage,
      logValue,
      goToAddTourGuide,
    };
  },
};
</script>

<style lang="scss" module>
@import './AddTourGuide.module.scss';
</style>
