<template>
  <div
    class="bg-white p-4 rounded-lg flex items-center shadow-md max-w-6xl mx-auto mt-3"
  >
    <img
      alt="Shop logo"
      class="rounded-full w-16 h-16"
      height="60"
      width="60"
    />
    <div class="ml-4 flex-1">
      <div class="text-lg font-bold">{{ shop?.name }}</div>
      <div class="text-gray-500">Online 5 Phút Trước</div>
      <div class="mt-2 flex space-x-2">
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          @click.prevent="handleStartConversation"
        >
          <i class="fas fa-comments mr-2"> </i>
          Chat Ngay
        </button>
        <button
          class="border border-gray-300 text-gray-700 px-4 py-2 rounded flex items-center"
        >
          <i class="fas fa-store mr-2"> </i>
          Xem Shop
        </button>
      </div>
    </div>
    <div class="ml-4 flex-1">
      <div class="flex justify-between">
        <div class="text-gray-500">Đánh Giá</div>
        <div class="text-blue-500">441,1k</div>
      </div>
      <div class="flex justify-between mt-2">
        <div class="text-gray-500">Sản Phẩm</div>
        <div class="text-blue-500">{{ shop?.product?.count || "0" }}</div>
      </div>
    </div>
    <div class="ml-4 flex-1">
      <div class="flex justify-between">
        <div class="text-gray-500">Tỉ Lệ Phản Hồi</div>
        <div class="text-blue-500">100%</div>
      </div>
      <div class="flex justify-between mt-2">
        <div class="text-gray-500">Thời Gian Phản Hồi</div>
        <div class="text-blue-500">trong vài giờ</div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "ShopAccount",
  props: {
    shop: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    // Hàm xử lý khi bắt đầu cuộc trò chuyện
    const router = useRouter();
    // const id = ref(1);
    const handleStartConversation = async () => {
      try {
        const jwt = Cookies.get("tokenLogin");
        console.log(jwt);
        if (!jwt) {
          return;
        }
        const response = await axios.post(
          "http://127.0.0.1:8000/api/conversations",
          {
            user_id: props.shop.id,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        // Xử lý kết quả sau khi bắt đầu cuộc trò chuyện
        // Ví dụ: mở modal chat, chuyển hướng đến trang chat
        // const id = response.data.conversation_id;
        const conver = response.data.conversation;
        console.log("Bắt đầu cuộc trò chuyện:", conver);
        localStorage.setItem("conversation", JSON.stringify(conver));
        router.push({
          path: `/minh-hiep/chat_cv`,
        });
      } catch (error) {
        console.error("Lỗi khi bắt đầu cuộc trò chuyện:", error);
        // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
      }
    };

    return {
      handleStartConversation,
    };
  },
};
</script>
