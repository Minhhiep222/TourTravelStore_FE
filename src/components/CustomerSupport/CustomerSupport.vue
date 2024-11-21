<template>
    <div>
      <header class="header">
        <h1>Trung tâm trợ giúp Storeloka</h1>
        <!-- <p>Tìm câu trả lời của bạn ở đây</p>
        <div class="search-bar">
          <input v-model="searchQuery" placeholder="Nhập chủ đề của bạn ở đây (ví dụ: hoàn tiền)" type="text"/>
        </div> -->
      </header>
  
      <div class="container">
        <div class="topics">
          <h2>Chủ đề phổ biến</h2>
          <ul>
            <li v-for="(topic, index) in topics" :key="index">
              <a :href="topic.link">{{ topic.title }}</a>
            </li>
          </ul>
        </div>
  
      
      </div>
  
      <div class="help-section">
        <p>Bạn cần sự giúp đỡ?</p>
        <p>Hãy liên hệ với bộ phận chăm sóc khách hàng của chúng tôi để được hỗ trợ thêm bằng cách quét mã QR bên dưới.</p>
        <a href="http://localhost:3000/CustomerSupport/ContactUs" >Liên hệ với chúng tôi</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomerSupport',
    data() {
      return {
        searchQuery: '',
        topics: [
          { title: 'Hướng Dẫn Đặt Tour Nhanh Chóng', link: '#' },
          { title: 'Cách hủy và hoàn tiền đặt vé tour', link: '#' },
          { title: 'Cách sửa tên hành khách trên tour', link: '#' },
          { title: 'Cách hủy và nhận lại tiền hoàn lại cho đặt  Tour của tôi', link: '#' },
          { title: 'Cách Đăng ký trực tuyến', link: '#' },
          
          { title: 'Cam kết hoàn tiền của Storeloka', link: '#' }
        ],
       
      };
    }
  };
  </script>
  
  
<style lang="scss" scoped>
@import "@/components/CustomerSupport/CustomerSupport.scss";
</style>;
  
  