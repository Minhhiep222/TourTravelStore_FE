<template>
  <div>
    <form v-if="swicth == ''" @submit.prevent="handleSubmit">
      <div :class="$style.wrapper">
        <div :class="$style.parent">
          <Icons
            @click="handleDisplayRegister(false)"
            :class="$style.iconClose"
            :iconName="'iconX'"
          />
          <h1 :class="$style.title">Register</h1>
          <div :class="$style.subtitle">Email/Mobile Number</div>
          <div :class="$style.parentInput">
            <input
              v-model="username"
              :class="$style.inputEmail"
              type="text"
              placeholder="Example: @gmail.com"
            />
          </div>
          <label v-if="errorUsername" :class="$style.errorInput">{{
            errorUsername
          }}</label>
          <div :class="$style.parentInput">
            <input
              v-model="password"
              :class="$style.inputEmail"
              type="password"
              placeholder="Password"
            />
          </div>
          <label v-if="errorPassword" :class="$style.errorInput">{{
            errorPassword
          }}</label>
          <div :class="$style.parentRole">
            <div :class="$style.parentContent">
              <input
                :class="$style.contentInput"
                v-model="role"
                value="1"
                type="radio"
                id="customer"
                name="role"
              />
              <label :class="$style.contentLabel" for="customer"
                >Customer</label
              >
            </div>
            <div :class="$style.parentContent">
              <input
                :class="$style.contentInput"
                v-model="role"
                value="2"
                type="radio"
                id="suppliers"
                name="role"
              />
              <label :class="$style.contentLabel" for="suppliers"
                >Suppliers</label
              >
            </div>
            <!-- <div class="none" :class="$style.parentContent">
              <input
                :class="$style.contentInput"
                v-model="role"
                value="3"
                type="radio"
                id="admin"
                name="role"
              />
              <label :class="$style.contentLabel" for="admin">Admin</label>
            </div> -->
          </div>
          <div v-if="errorRole" :class="$style.errorRole">{{ errorRole }}</div>
          <button :class="$style.btnLogin">Sign up</button>
          <div :class="$style.wrapTitleChoose">
            <div :class="$style.lineLeft"></div>
            <div :class="$style.lineContent">Or login/register with</div>
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

    <SendConfirmation
      :handleDisplayRegister="handleDisplayRegister"
      :username="username"
      :setSwicth="setSwicth"
      v-if="swicth == 'send code'"
    ></SendConfirmation>
    <MoreInfomation
      :handleDisplayRegister="handleDisplayRegister"
      :username="username"
      :role="role"
      :password="password"
      v-if="swicth == 'more infomation'"
    ></MoreInfomation>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import SendConfirmation from "../SendConfirmation/SendConfirmation.vue";
import MoreInfomation from "../moreInfomation/moreInfomation.vue";
import Icons from "../Icons/Icons.vue";

export default {
  components: {
    SendConfirmation,
    MoreInfomation,
    Icons,
  },
  props: {
    handleDisplayRegister: {
      type: Function,
      required: true,
    },
  },
  name: "UserRegister",

  setup() {
    const username = ref("");
    const password = ref("");
    const role = ref("");
    const errorUsername = ref("");
    const errorPassword = ref("");
    const errorRole = ref("");
    const swicth = ref("");

    const logUsername = () => {
      console.log("username:", username.value);
      console.log("password:", password.value);
      console.log("errorPassword:", errorPassword.value);
      console.log("errorUsername:", errorUsername.value);
      console.log("role:", role.value);
    };

    const setSwicth = (item) => {
      swicth.value = item;
    };

    const handleSubmit = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/mainInformation",
          {
            username: username.value,
            password: password.value,
            role: role.value,
          }
        );
        console.log("Registration successful:", response.data);
        swicth.value = response.data.swicth;
      } catch (error) {
        console.error("Registration failed:", error.response.data);
        if (error.response && error.response.data) {
          const errors = error.response.data.errors || {};
          errorUsername.value = errors.username ? errors.username[0] : "";
          errorPassword.value = errors.password ? errors.password[0] : "";
          errorRole.value = errors.role ? errors.role[0] : "";
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
      swicth,
      logUsername,
      setSwicth,
      handleSubmit,
    };
  },
};
</script>

<style lang="scss" module>
@import "./Register.module.scss";
</style>
