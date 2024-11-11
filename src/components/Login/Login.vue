<template>
  <!-- <form @submit.prevent="handleSubmit" action="">
    <h1>Login Form</h1>
    <div class="wrap-parent">
      <div class="parent">
        <input @input="logValue" v-model="username" type="text" />
        <label class="placeholder">{{ errorUsername }}</label>
      </div>
      <div class="parent">
        <input @input="logValue" v-model="password" type="password" />
        <label class="placeholder">{{ errorPassword }}</label>
      </div>
    </div>

    <label for="user">User</label>
    <input @input="logValue" v-model="role" type="radio" value="1" id="user" />
    <label for="someValue">Some Value</label>
    <input @input="logValue" v-model="role" type="radio" value="2" id="someValue" />
    <label for="admin">Admin</label>
    <input @input="logValue" v-model="role" type="radio" value="3" id="admin" />
    
    <div class="placeholder">{{ errorRole }}</div>
    <button type="submit">Submit</button>
  </form> -->

  <!-- <button @click="logValue">valueCurrentUser</button> -->
  <form @submit.prevent="handleSubmit">
    <div :class="$style.wrapper">
      <div :class="$style.parent">
        <Icons @click="handleDisplayLogin(false)" :class="$style.iconClose" :iconName="'iconX'" />
        <h1 :class="$style.title">Login/Register</h1>
        <div :class="$style.subtitle">Email/Mobile Number</div>
        <div :class="$style.parentInput">
          <input v-model="username" :class="$style.inputEmail" type="text" placeholder="Example: @gmail.com">
        </div>
        <label v-if="errorUsername" :class="$style.errorInput">{{ errorUsername }}</label>
        <div :class="$style.parentInput">
          <input v-model="password" :class="$style.inputEmail" type="password" placeholder="Password">
        </div>
        <label v-if="errorPassword" :class="$style.errorInput">{{ errorPassword }}</label>
        <div :class="$style.parentRole">
          <div :class="$style.parentContent">
            <input :class="$style.contentInput" v-model="role" value="1" type="radio" id="customer" name="role">
            <label :class="$style.contentLabel" for="customer">Customer</label>
          </div>

          <div :class="$style.parentContent">
            <input :class="$style.contentInput" v-model="role" value="2" type="radio" id="suppliers" name="role">
            <label :class="$style.contentLabel" for="suppliers">Suppliers</label>
          </div>

          <div :class="$style.parentContent">
            <input :class="$style.contentInput" v-model="role" value="3" type="radio" id="admin" name="role">
            <label :class="$style.contentLabel" for="admin">Admin</label>
          </div>

        </div>
        <div v-if="errorRole" :class="$style.errorRole">{{ errorRole }}</div>

        <button :class="$style.btnLogin">
          Log in
        </button>
        <div :class="$style.btnForgot">
          Forgot Password?
        </div>
        <div :class="$style.wrapTitleChoose">
          <div :class="$style.lineLeft"></div>
          <div :class="$style.lineContent"> Or login/register with</div>
          <div :class="$style.lineRight"></div>
        </div>
        <div :class="$style.social">
          <div :class="$style.facebookBtn">
            Facebook
            <Icons :class="$style.facebookIcon" :iconName="'iconFacebook'" />
          </div>
          <div :class="$style.facebookBtn">
            Google
            <Icons :class="$style.facebookIcon" :iconName="'iconGoogle'" />
          </div>
        </div>

      </div>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';
import Icons from '../Icons/Icons.vue';

export default {
  name: 'UserLogin',
  components: {
    Icons,
  },
  props: {
    setCurrentUser: {
      type: Function,
      required: true,
    },
    handleDisplayLogin: {
      type: Function,
      required: true,
    }
  },
  setup(props) {
    const username = ref('');
    const password = ref('');
    const role = ref('');
    const errorUsername = ref('');
    const errorPassword = ref('');
    const errorRole = ref('');

    const logValue = () => {
      console.log('valueCurrentUser', props.setCurrentUser);
      console.log('username', username.value);
      console.log('password', password.value);
      console.log('role', role.value);
      console.log('errorUsername', errorUsername.value);
      console.log('errorPassword', errorPassword.value);
      console.log('errorRole', errorRole.value);
    };

    const handleDataCurrentUser = async () => {
      try {
        const token = Cookies.get('tokenLogin');
        const response = await axios.get('http://localhost:8000/api/inforCurrentUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        console.log('User info retrieved successfully:', response.data.data);
        props.setCurrentUser(response.data.data);

      } catch (error) {
        console.error('Failed to retrieve user info:', error.response.data);
        alert(error.response.data.message);
      }
    };

    const handleSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          username: username.value,
          password: password.value,
          role: role.value,
        });
        console.log('login successful:', response.data);
        if (response.data.message === 'login sussesfully') {
          Cookies.set('tokenLogin', response.data.token, { expires: 7 });
          await handleDataCurrentUser();
        }
      } catch (error) {
        console.error('Registration failed:', error.response.data.message);
        if (error.response && error.response.data) {
          const errors = error.response.data.errors;
          errorUsername.value = errors.username ? errors.username[0] : '';
          errorPassword.value = errors.password ? errors.password[0] : '';
          errorRole.value = errors.role ? errors.role[0] : '';
        }
      }
    };

    return {
      username,
      password,
      role,
      errorUsername,
      errorPassword,
      errorRole,
      logValue,
      handleSubmit,
      Icons,

    };
  },
};
</script>

<style lang="scss" module>
@import './Login.module.scss';
</style>
