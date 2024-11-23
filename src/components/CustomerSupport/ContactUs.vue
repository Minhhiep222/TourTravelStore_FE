<template>
    <div>
        <header class="header">
        <h1>Trung tâm trợ giúp Storeloka</h1>
      </header>
    
    <div class="container">
      <div class="left-panel">
        <div class="header2">Chúng tôi có thể giúp gì cho bạn?</div>
  
        <div class="contact-section">
          <div style="display: flex; align-items: center;">
            <img
              alt="Customer support representative"
              height="40"
              src="https://storage.googleapis.com/a1aa/image/MByXkuAkEYbmBZfhzekfqZsdynSz7I5sTcov1Q9CsLxNOjeOB.jpg"
              width="40"
            />
            <div>
              <div class="title">Liên hệ với bộ phận chăm sóc khách hàng của chúng tôi</div>
              <div class="description">
                Giờ hoạt động của bộ phận chăm sóc khách hàng
                <br />
                Gọi điện: Thứ Hai-Chủ Nhật (Từ 8 giờ sáng-10 giờ tối) Trợ chuyện &amp; email: Có sẵn 24/7
              </div>
            </div>
          </div>
        </div>

  <div class="Visible" @click="togglePhoneNumbers">
      <div>
        <i class="fas fa-envelope"></i>
        <span>Gọi cho bộ phận chăm sóc khách hàng của chúng tôi</span>
      </div>
      <div class="icon">
        <i :class="iconClass"></i>
      </div>
    </div>
    <div class="content" v-show="isPhoneNumbersVisible">
        <span>Đức Toàn : 0706186424</span>
        <br>
     
    </div>
    

  <div class="Visible" @click="toggleDropdown">
      <div>
        <i class="fas fa-envelope"></i>
        <span>Gửi email đến Dịch vụ khách hàng</span>
      </div>
      <div class="icon">
        <i :class="iconClass"></i>
      </div>
    </div>
    <div class="content" v-show="isDropdownVisible">
      Vui lòng gửi email của bạn đến Bộ phận Dịch vụ Khách hàng của chúng tôi theo địa chỉ 
      <a href="mailto:cs@traveloka.com">nhoctoan6666@gmail.com</a>
    </div>
      </div>
  
      <div class="right-panel">
        <div class="header2">Chủ đề phổ biến</div>
  
        <div class="topic-item" v-for="(topic, index) in topics" :key="index">
          <span>{{ topic }}</span>
          <i class="fas fa-chevron-right"></i>
        </div>
  
        <div class="show-more" @click="showMoreTopics">Hiển thị thêm</div>
      </div>
    </div>
</div>
  </template>
  
  <script>
  
  export default {
    name: 'ContactUs',
    data() {
      return {
        hasCode: false,
        topics: [
          "Hướng Dẫn Đặt Tour Nhanh Chóng",
          "Cách hủy và hoàn tiền đặt vé tour",
          "Cách sửa tên hành khách trên tour",
          "Cách hủy và nhận lại tiền hoàn lại cho đặt  Tour của tôi",
          "Cách Đăng ký trực tuyến",
        ],
        
        isPhoneNumbersVisible: false,
        isDropdownVisible: false,
      };
    },
    computed: {
    // Cập nhật class cho icon khi dropdown mở/đóng
    iconClass() {
      return this.isDropdownVisible ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
    }
  },

    methods: {
        togglePhoneNumbers() {
      this.isPhoneNumbersVisible = !this.isPhoneNumbersVisible;
    },
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    
     
    },
  };
  </script>
  
  <style lang="scss" scoped>
@import "@/components/CustomerSupport/ContactUs.scss";
</style>
  