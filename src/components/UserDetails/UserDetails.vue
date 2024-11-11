<template>
    <div class="container">
        <div class="sidebar">
            <div class="profile">
                <img alt="Profile Picture" height="50" src="https://storage.googleapis.com/a1aa/image/2Q7eD6euH6pTEUfAozdUIg2WHvLOxSkn5AIwxgcrUP7QsdUnA.jpg" width="50"/>
                <div class="name">Toàn Đức</div>
            </div>
            <ul class="menu">
                <li><a href="#"><i class="fas fa-home"></i> Trang chủ</a></li>
                <li><a href="#"><i class="fas fa-credit-card"></i> Thẻ của tôi</a></li>
                <li><a href="#"><i class="fas fa-cog"></i> Đặt chỗ của tôi</a></li>
                <li><a href="#"><i class="fas fa-list"></i> Danh sách giao dịch</a></li>
                <li><a href="#"><i class="fas fa-undo"></i> Refunds</a></li>
                <li><a href="#"><i class="fas fa-plane"></i> Thông báo giá vé máy bay</a></li>
                <li><a href="#"><i class="fas fa-user-friends"></i> Thông tin hành khách đã lưu</a></li>
                <li><a href="#"><i class="fas fa-tags"></i> Khuyến mãi</a></li>
                <li><a class="active" href="#"><i class="fas fa-user"></i> Tài khoản</a></li>
                <li><a href="#"><i class="fas fa-sign-out-alt"></i> Đăng xuất</a></li>
            </ul>
        </div>
        <div class="content">
            <h1>Cài đặt</h1>
            <div class="tabs">
                <a class="active" href="#">Thông tin tài khoản</a>
                <a href="#">Mật khẩu & Bảo mật</a>
                <a href="#">Bản tin & tin Khuyến mãi</a>
            </div>
            <div class="notification">
                <p>Bạn muốn nhận thông báo đăng nhập mới và các hoạt động khác của <a href="#">Cho phép gửi thông báo trên máy tính</a></p>
            </div>
            <div class="form-group">
                <label for="name">Tên đầy đủ</label>
                <input id="name" type="text" v-model="fullName"/>
            </div>
            <div class="form-group">
                <label for="gender">Giới tính</label>
                <select id="gender" v-model="gender">
                    <option value="Male">Nam</option>
                    <option value="Female">Nữ</option>
                </select>
            </div>
            <div class="form-group">
                <label for="dob">Ngày sinh</label>
                <div class="dob-select">
                    <select id="dob-day" v-model="dobDay">
                        <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
                    </select>
                    <select id="dob-month" v-model="dobMonth">
                        <option v-for="month in months" :key="month" :value="month">Tháng {{ month }}</option>
                    </select>
                    <select id="dob-year" v-model="dobYear">
                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="phone">Số điện thoại của bạn</label>
                <input id="phone" placeholder="Số điện thoại của bạn" type="text" v-model="phone"/>
            </div>
            <div class="form-group">
                <label for="city">Thành phố bạn đang ở</label>
                <input id="city" placeholder="Thành phố bạn đang ở" type="text" v-model="city"/>
            </div>
            <div class="form-actions">
                <button class="cancel" @click="cancel">Hủy</button>
                <button class="save" @click="save">Lưu</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserDetails',
    data() {
        return {
            fullName: 'Toàn Đức',
            gender: 'Male',
            dobDay: null,
            dobMonth: null,
            dobYear: null,
            phone: '',
            city: '',
            days: Array.from({ length: 31 }, (_, i) => i + 1),
            months: Array.from({ length: 12 }, (_, i) => i + 1),
            years: Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => new Date().getFullYear() - i)
        };
    },
    methods: {
        cancel() {
            console.log('Hủy bỏ chỉnh sửa');
        },
        save() {
            console.log('Lưu thông tin', this.fullName, this.gender, this.dobDay, this.dobMonth, this.dobYear, this.phone, this.city);
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
}
.sidebar {
    width: 250px;
    background-color: #ffffff;
    border-right: 1px solid #e1e8ed;
    padding: 20px;
}
.sidebar .profile {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.sidebar .profile img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 10px;
}
.sidebar .profile .name {
    font-weight: bold;
}
.sidebar .menu {
    list-style: none;
    padding: 0;
}
.sidebar .menu li {
    margin-bottom: 10px;
}
.sidebar .menu li a {
    text-decoration: none;
    color: #1da1f2;
    display: flex;
    align-items: center;
}
.sidebar .menu li a i {
    margin-right: 10px;
}
.sidebar .menu li a.active {
    color: #ffffff;
    background-color: #1da1f2;
    padding: 10px;
    border-radius: 5px;
}
.content {
    flex-grow: 1;
    padding: 20px;
}
.content h1 {
    font-size: 24px;
    margin-bottom: 20px;
}
.tabs {
    display: flex;
    border-bottom: 1px solid #e1e8ed;
    margin-bottom: 20px;
}
.tabs a {
    text-decoration: none;
    color: #1da1f2;
    padding: 10px 20px;
    border-bottom: 3px solid transparent;
}
.tabs a.active {
    border-bottom: 3px solid #1da1f2;
    font-weight: bold;
}
.notification {
    background-color: #e1e8ed;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
}
.notification a {
    color: #1da1f2;
    text-decoration: none;
}
.form-group {
    margin-bottom: 20px;
}
.form-group label {
    display: block;
    margin-bottom: 5px;
}
.form-group input, .form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #e1e8ed;
    border-radius: 5px;
}
.form-actions {
    display: flex;
    justify-content: flex-end;
}
.form-actions button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.form-actions .cancel {
    background-color: #e1e8ed;
    margin-right: 10px;
}
.form-actions .save {
    background-color: #1da1f2;
    color: #ffffff;
}
.dob-select {
    display: flex;
    gap: 10px;
}
</style>
