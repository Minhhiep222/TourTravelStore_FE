<template>
    <div :class="$style.wrapper">
        <!-- <div class="column">
            <img alt="Traveloka Logo" height="50" src="@/assets/Images/logo.png" width="150" />
            <button class="partner-button">Hợp tác với Traveloka</button>
            <h3>Đối tác thanh toán</h3>
            <div class="payment-partners">
                <img alt="Payment Partner 1" height="40" src="@/assets/Images/cake.png" width="60" />
                <img alt="Payment Partner 2" height="40" src="@/assets/Images/cake.png" width="60" />
                <img alt="Payment Partner 3" height="40" src="@/assets/Images/cake.png" width="60" />
                <img alt="Payment Partner 1" height="40" src="@/assets/Images/cake.png" width="60" />
                <img alt="Payment Partner 2" height="40" src="@/assets/Images/cake.png" width="60" />
                <img alt="Payment Partner 3" height="40" src="@/assets/Images/cake.png" width="60" /><img
                    alt="Payment Partner 1" height="40" src="@/assets/Images/cake.png" width="60" />
                <img alt="Payment Partner 2" height="40" src="@/assets/Images/cake.png" width="60" />
                <img alt="Payment Partner 3" height="40" src="@/assets/Images/cake.png" width="60" /><img
                    alt="Payment Partner 1" height="40" src="@/assets/Images/cake.png" width="60" />
                <img alt="Payment Partner 2" height="40" src="@/assets/Images/cake.png" width="60" />
                <img alt="Payment Partner 3" height="40" src="@/assets/Images/cake.png" width="60" /><img
                    alt="Payment Partner 1" height="40" src="@/assets/Images/cake.png" width="60" />
                <img alt="Payment Partner 2" height="40" src="@/assets/Images/cake.png" width="60" />
                <img alt="Payment Partner 3" height="40" src="@/assets/Images/cake.png" width="60" />
            </div>
        </div>
        <div class="column">
            <h3>Về Traveloka</h3>
            <ul>
                <li><a href="#">Cách đặt chỗ</a></li>
                <li><a href="#">Liên hệ chúng tôi</a></li>
                <li><a href="#">Trợ giúp</a></li>
                <li><a href="#">Tuyển dụng</a></li>
                <li><a href="#">Về chúng tôi</a></li>
            </ul>
        </div>
        <div class="column">
            <h3>Sản phẩm</h3>
            <ul>
                <li><a href="#">Khách sạn</a></li>
                <li><a href="#">Vé máy bay</a></li>
                <li><a href="#">Vé xe khách</a></li>
                <li><a href="#">Đưa đón sân bay</a></li>
                <li><a href="#">Cho thuê xe</a></li>
                <li><a href="#">Xperience</a></li>
                <li><a href="#">Du thuyền</a></li>
                <li><a href="#">Biệt thự</a></li>
                <li><a href="#">Căn hộ</a></li>
            </ul>
        </div>
        <div class="column">
            <h3>Khác</h3>
            <ul>
                <li><a href="#">Traveloka Affiliate</a></li>
                <li><a href="#">Traveloka Blog</a></li>
                <li><a href="#">Chính Sách Quyền Riêng</a></li>
                <li><a href="#">Điều khoản &amp; Điều kiện</a></li>
                <li><a href="#">Quy chế hoạt động</a></li>
                <li><a href="#">Đăng ký nơi nghỉ của bạn</a></li>
                <li><a href="#">Đăng ký doanh nghiệp hoạt động du lịch của bạn</a></li>
                <li><a href="#">Khu vực báo chí</a></li>
                <li><a href="#">Vulnerability Disclosure Program</a></li>
            </ul>
        </div>
        <div class="column">
            <h3>Theo dõi chúng tôi trên</h3>
            <ul class="social-icons">
                <li>
                    <a href="#"><i class="fab fa-facebook"></i> Facebook</a>
                </li>
                <li>
                    <a href="#"><i class="fab fa-instagram"></i> Instagram</a>
                </li>
                <li>
                    <a href="#"><i class="fab fa-tiktok"></i> TikTok</a>
                </li>
                <li>
                    <a href="#"><i class="fab fa-youtube"></i> Youtube</a>
                </li>
                <li>
                    <a href="#"><i class="fab fa-telegram"></i> Telegram</a>
                </li>
            </ul>
            <h3 class="white-text">Tải ứng dụng Traveloka</h3>
            <div class="app-links">
                <img alt="Google Play Store" height="40" src="@/assets/Images/gg1.png" width="120" />
                <img alt="Apple App Store" height="40" src="@/assets/Images/AppStore1.png" width="120" />
            </div>
        </div>
        <div class="bottom-text">
            Công ty TNHH Traveloka Việt Nam. Mã số DN: 0313581779. Tòa nhà An Phú, 117-119 Lý Chính Thắng, P. 7,
            Q. 3, TPHCM
            <br />
            Copyright © 2024 Traveloka. All rights reserved
        </div> -->
    </div>
</template>
<script>
export default {
    name: 'FooterComponent',
}
</script>
<style lang="scss" module>
@import './Footer.module.scss';
</style>


<style scoped>
h3 {
    color: white;
    /* Đặt màu chữ là trắng */
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #1a2b3c;
    color: #ffffff;
}

.white-text {
    color: white;
    /* Đặt màu chữ là trắng */
}

.footer {
    background-color: #1a2b3c;
    padding: 40px 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.footer .column {
    flex: 1;
    margin: 10px;
}

.footer .column h3 {
    font-size: 16px;
    margin-bottom: 20px;
}

.footer .column ul {
    list-style: none;
    padding: 0;
}

.footer .column ul li {
    margin-bottom: 10px;
}

.footer .column ul li a {
    color: #ffffff;
    text-decoration: none;
}

.footer .column ul li a:hover {
    text-decoration: underline;
}

.footer .payment-partners {
    display: flex;
    flex-wrap: wrap;
    /* Cho phép hình ảnh nằm trên nhiều dòng */
    justify-content: flex-start;
    /* Hoặc dùng space-between để có khoảng cách đều */
}

.footer .payment-partners img {
    width: 60px;
    margin: 5px;
    flex: 0 0 25%;
}

/* Mỗi hình ảnh chiếm 25% chiều rộng */
.footer .social-icons a {
    color: #ffffff;
    margin-right: 10px;
    font-size: 20px;
}

.footer .app-links img {
    width: 120px;
    margin: 10px 0;
}

.footer .bottom-text {
    text-align: center;
    margin-top: 20px;
    font-size: 12px;
}

.footer .certifications img {
    width: 100px;
    margin: 5px;
}

.footer .partner-button {
    background-color: #2a3b4c;
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;

}
</style>