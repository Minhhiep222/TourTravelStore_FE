<template>
  <div class="min-h-screen flex flex-col items-center" id="app">
    <div
      class="w-full mt-8 flex-grow flex flex-col items-center text-center space-y-8"
    >
      <div class="space-y-4">
        <i class="fas fa-check-circle text-green-500 text-6xl"> </i>
        <h1 class="text-2xl font-bold">Đơn hoàn đã đặt thành công!</h1>
        <p>
          Your order number is: {{ this.transId }}.
          <br />
          We'll email you an order confirmation with details and tracking info
        </p>
        <button
          @click="btn_continue"
          class="bg-green-500 text-white px-4 py-2 rounded"
        >
          Continue Shopping
        </button>
      </div>
      <div class="flex items-center space-x-4">
        <img
          alt="Green and white puzzle piece"
          height="100"
          src="https://storage.googleapis.com/a1aa/image/wuYaTViKtxJTJRre3N0DgWwKjjPxx5RVk7b5RnVz5p5QL02JA.jpg"
          width="100"
        />
        <div class="text-left">
          <h2 class="text-xl font-bold">
            This is a sample block for Custom Thank You Page
          </h2>
          <p>You can replace it with any block you find necessary</p>
        </div>
      </div>
      <div class="space-y-4">
        <i class="fas fa-envelope text-4xl text-gray-700"> </i>
        <p>
          Subscribe to receive Important Product Updates and occasional
          discounts
        </p>
        <div class="flex items-center border rounded overflow-hidden">
          <input
            class="p-2 flex-grow"
            placeholder="customer@customer.com"
            type="email"
          />
          <button class="bg-green-500 text-white px-4">Subscribe</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentSuccess",

  data() {
    return {
      transId: null,
      orderId: null,
      payment: null,
    };
  },

  methods: {
    async updateStatusPayment() {
      try {
        const formData = new FormData();
        formData.append("orderId", this.orderId);
        formData.append("trandId", this.transId);

        const response = await fetch(
          "http://127.0.0.1:8000/api/payments/momo/ipn",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    },

    btn_continue() {
      this.$router.push("/");
    },
  },

  mounted() {
    this.transId = this.$route.query.transId;
    this.orderId = this.$route.query.orderId;
    if (this.trandId != null) {
      this.updateStatusPayment(this.trandId);
    }
  },
};
</script>
