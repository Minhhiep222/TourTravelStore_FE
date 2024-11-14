<template>
  <div class="bg-gray-100 flex items-center justify-center h-screen">
    <form
      @submit.prevent="handleSubmit"
      class="bg-white shadow-lg rounded-lg w-96"
    >
      <div
        class="bg-blue-500 text-white text-lg font-semibold p-4 rounded-t-lg flex items-center justify-between"
      >
        <span>ChatStorelLoka</span>
        <!-- <div @click="logData">logValue</div> -->
        <!-- <div class="flex items-center space-x-2">
                 <input type="color" id="headerColorPicker" class="w-6 h-6 cursor-pointer">
                 <i class="fas fa-times cursor-pointer"></i>
             </div> -->
      </div>
      <div class="p-4 h-64 overflow-y-auto">
        <div v-for="(item, index) in response" :key="index" class="mb-4">
          <div v-if="item.type === 'question'" class="text-right">
            <div class="bg-blue-500 text-white p-2 rounded-lg inline-block">
              <p>{{ item.text }}</p>
            </div>
          </div>
          <div v-if="item.type === 'answer'" class="text-left">
            <div class="bg-gray-200 p-2 rounded-lg inline-block">
              <p class="text-gray-800">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 border-t border-gray-200 flex items-center">
        <input
          v-model="question"
          type="text"
          class="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          class="ml-2 bg-blue-500 text-white p-2 rounded-lg"
        >
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "ChatBot",
  setup() {
    const question = ref("");
    const response = ref([]);
    const request = ref([]);
    //  const error = ref(null);

    const logData = () => {
      console.log("request", request.value);
      console.log("question", question.value);
      console.log("response", response.value);
    };

    const handleSubmit = async () => {
      try {
        const questionFake = question.value;
        response.value.push({ type: "question", text: question.value });
        question.value = "";
        // Gửi câu hỏi đến API
        const res = await axios.post("http://localhost:8000/api/chatbot", {
          message: questionFake,
        });

        if (
          res.data.message &&
          res.data.message.candidates &&
          res.data.message.candidates.length > 0
        ) {
          const parts = res.data.message.candidates[0].content.parts;
          console.log("get data:", parts);
          parts.forEach((part) => {
            response.value.push({ type: "answer", text: part.text });
          });
        }
      } catch (error) {
        console.error("get data fail :", error.response);
        if (error.response && error.response.data) {
          // error = error.response.data.error;
          Swal.fire({
            icon: "error",
            title: error.response.data.error,
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      }
    };

    return {
      question,
      logData,
      handleSubmit,
      response,
    };
  },
};
</script>

<style lang="scss" module>
@import "./ChatBot.module.scss";
</style>
