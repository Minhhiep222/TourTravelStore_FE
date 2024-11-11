<template>
  <form @submit.prevent="handleSubmit">
    <div :class="$style.wrapper">
      <div :class="$style.parent">
        <Icons @click="handleDisplayRegister(false)" :class="$style.iconClose" :iconName="'iconX'" />
        <h1 :class="$style.title">Enter Verification Code</h1>
        <div :class="$style.subtitle">
          Please enter the verification code that we sent to
          <h3 :class="$style.username">{{ username }}</h3>
        </div>
        <h4 :class="$style.titleVerify">Verification code</h4>
        <div :class="$style.parentInput">
          <input v-model="code" :class="$style.inputEmail" type="text" placeholder="Example: 10242" />
        </div>
        <label v-if="errorCode" :class="$style.errorInput">{{ errorCode }}</label>
        <button :class="$style.btnVerify">Verify</button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import Icons from '../Icons/Icons.vue';

export default {
  name: 'SendConfirmation',
  components: {
    Icons,
  },
  props: {
    setSwicth: {
      type: Function,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    handleDisplayRegister: {
      type: Function,
      required: true,
    },
  },

  setup(props) {
    const code = ref('');
    const errorCode = ref('');

    const handleSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/sendCode', {
          username: props.username,
          confirmCode: code.value,
        });
        console.log('Registration successful:', response.data);
        props.setSwicth(response.data.swicth);
      } catch (error) {
        console.error('Registration failed:', error.response.data);
        if (error.response && error.response.data) {
          const errors = error.response.data.errors || {};
          errorCode.value = errors.confirmCode ? errors.confirmCode[0] : '';
        }
      }
    };

    return {
      code,
      errorCode,
      handleSubmit,
    };
  },
};
</script>

<style lang="scss" module>
@import './SendConfirmation.module.scss';
</style>
