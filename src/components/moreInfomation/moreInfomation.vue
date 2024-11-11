<template>
  <div :class="$style.wrapper">
    <div :class="$style.parent">
      <form @submit.prevent="handleSubmit">
        <Icons @click="handleDisplayRegister(false)" :class="$style.iconClose" :iconName="'iconX'" />
        <h1 :class="$style.title">Register Account</h1>
        <div :class="$style.wrapParent">
          <div :class="$style.parentDOB">
            <label :class="$style.titleText">Day</label>
            <input :class="$style.inputDOB" type="text" v-model="day" placeholder="Day" />
            <label v-if="errorDay" :class="$style.errorInput">{{ errorDay }}</label>
          </div>
          <div :class="$style.parentDOB">
            <label :class="$style.titleText">Month</label>
            <input :class="$style.inputDOB" type="text" v-model="month" placeholder="Month" />
            <label v-if="errorMonth" :class="$style.errorInput">{{ errorMonth }}</label>
          </div>
          <div :class="$style.parentDOB">
            <label :class="$style.titleText">Year</label>
            <input :class="$style.inputDOB" type="text" v-model="year" placeholder="Year" />
            <label v-if="errorYear" :class="$style.errorInput">{{ errorYear }}</label>
          </div>
        </div>
        <div :class="$style.wrapGender">
          <label :class="$style.titleText">Gender</label>
          <select :class="$style.parentGender" v-model="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label v-if="errorGender" :class="$style.errorGender">{{ errorGender }}</label>
        </div>
        <button :class="$style.wrapRegister">Register</button>
      </form>
      <form @submit.prevent="handleSubmitMainInformation">
        <button :class="$style.wrapSkip">Skip</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Icons from '../Icons/Icons.vue';
import Swal from 'sweetalert2';

export default {
  components: {
    Icons,
  },

  props: {
    password: {
      type: String, 
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    handleDisplayRegister: {
      type: Function,
      required: true,
    },
    setSwicth: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      day: '',
      month: '',
      year: '',
      gender: '',
      errorDay: '',
      errorMonth: '',
      errorYear: '',
      errorGender: '',
    };
  },
  methods: {
    logUsername() {
      console.log('day:', this.day);
      console.log('month:', this.month);
      console.log('year:', this.year);
      console.log('gender:', this.gender);
      console.log('username:', this.username);
      console.log('password:', this.password);
    },
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:8000/api/RegistermoreInfomation', {
          day: parseInt(this.day, 10),
          month: parseInt(this.month, 10),
          year: parseInt(this.year, 10),
          gender: this.gender,
          username: this.username,
          password: this.password,
          role: this.role,
        });

        if (response.data.message === 'created account') {
          await Swal.fire({
        title: 'Success!',
        text: 'Account created successfully.',
        icon: 'success',
        confirmButtonText: 'Okay'
      });
      window.location.href = '/';
        }
      } catch (error) {
        console.error('Registration failed:', error.response.data);
        if (error.response && error.response.data) {
          const errors = error.response.data.errors || {};
          this.errorDay = errors.day ? errors.day[0] : '';
          this.errorMonth = errors.month ? errors.month[0] : '';
          this.errorYear = errors.year ? errors.year[0] : '';
          this.errorGender = errors.gender ? errors.gender[0] : '';
        }
      }
    },
    async handleSubmitMainInformation() {
      try {
        const response = await axios.post('http://localhost:8000/api/registerMainInfo', {
          username: this.username,
          password: this.password,
          role: this.role,
        });

        if (response.data.message === 'created account') {
      await Swal.fire({
        title: 'Success!',
        text: 'Account created successfully.',
        icon: 'success',
        confirmButtonText: 'Okay'
      });
      window.location.href = '/';
    }
     
      } catch (error) {
        console.error('Registration failed:', error.response.data);
      }
    },
  },
};
</script>

<style lang="scss" module>
@import './MoreInfomation.module.scss';
</style>
