<template>
    <div class="container">
        <div class="sidebar">
            <div class="profile">
                <img :src="profilePicture" alt="" height="50" width="50" />
                <div class="name">{{ name }}</div>
            </div>
            <ul class="menu">
                <li><a href="#"><i class="fas fa-home"></i> Trang chủ</a></li>
                <li><a class="active" href="#"><i class="fas fa-user"></i> Tài khoản</a></li>
                <li v-if="role === 3"><a href="#"><i class="fas fa-user"></i> Quản Lý Tour</a></li>
                <li v-if="role === 3"><a href="#"><i class="fas fa-user"></i> Quản lý User</a></li>

                <li><a href="#"><i class="fas fa-sign-out-alt"></i> Đăng xuất</a></li>
            </ul>
        </div>
        <div class="content">
            <h1>Cài đặt</h1>
            <div class="tabs">
                <a class="active" href="#">Thông tin tài khoản</a>
            </div>

            <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" />

         
            <div class="profile">
                <img :src="profilePicture" alt="" height="50" width="50" @click="changeProfilePicture" />
                
            </div>
            <div class="form-group">
                <label for="name">Tên</label>
                <input id="name" type="tel" v-model="name" autocomplete="tel" />
                <div v-if="errorName" class="error-message">{{ errorName }}</div>
            </div>
            <div class="form-group">
                <label for="gender">Giới tính</label>
                <select id="gender"  autocomplete="sex" v-model="gender">
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option  value="other">Khác</option>
                </select>
            </div>
            <div class="form-group">
                <label for="dob">Ngày sinh</label>
                <div class="dob-select">
                    <select id="dob-day" v-model="dobDay" autocomplete="bday-day">
                        <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
                    </select>
                    <select id="dob-month" v-model="dobMonth" autocomplete="bday-month">
                        <option v-for="month in months" :key="month" :value="month">Tháng {{ month }}</option>
                    </select>
                    <select id="dob-year" v-model="dobYear" autocomplete="bday-year">
                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="phone">Số điện thoại</label>
                <input id="phone" type="tel" v-model="phone" autocomplete="tel" />
                <div v-if="errorPhone" class="error-message">{{ errorPhone }}</div>
            </div>
            <div class="form-group">
                <label for="email">Gmail</label>
                <input id="email" type="email" v-model="email" autocomplete="email" />
                <div v-if="errorEmail" class="error-message">{{ errorEmail }}</div>
            </div>
            <div class="form-group">
                <label for="address">Địa chỉ</label>
                <input id="address" type="text" v-model="address" autocomplete="street-address" />
                <div v-if="errorAddress" class="error-message">{{ errorAddress }}</div>
            </div>
            <div class="form-actions">
                <button class="cancel" @click="cancel">Hủy</button>
                <button class="save" @click="save">Lưu</button>
            </div>
        </div>
        <div v-if="showSuccessModal" class="modal">
            <div class="modal-content">
                <p>Đã lưu thành công!</p>
                <button @click="closeModal">Đóng</button>
            </div>
        </div>
    </div>
   
        
   
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserDetails',
    // Nếu muốn nhận id từ route params
    // props: ['id'], // bỏ dòng này nếu lấy từ route params
    data() {
        return {
            name: '',
            gender: '',
            dobDay: null,
            dobMonth: null,
            dobYear: null,
            phone: '',
            email: '',
            address: '',
            role:null,  
            profilePicture: '',
            days: Array.from({ length: 31 }, (_, i) => i + 1),
            months: Array.from({ length: 12 }, (_, i) => i + 1),
            years: Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => new Date().getFullYear() - i),
            showSuccessModal: false, 
            errorName: '',
            errorPhone: '',
            errorEmail: '',
            errorAddress: ''
        };
    },
    mounted() {
        // Lấy id từ props (nếu có) hoặc từ route params
        this.userId = this.id || this.$route.params.id; // Điều này giả định bạn đang sử dụng Vue Router
        this.fetchUserDetails();
    },
    methods: {
        fetchUserDetails() {
            // Sử dụng userId đã lấy ở trên để fetch dữ liệu
            axios.get(`http://127.0.0.1:8000/api/users/${this.userId}`)
                .then(response => {
                    const userDetails = response.data;
                    this.name = userDetails.name;
                    this.gender = userDetails.details.gender;
                    this.dobDay = userDetails.details.dob ? new Date(userDetails.details.dob).getDate() : null;
                    this.dobMonth = userDetails.details.dob ? new Date(userDetails.details.dob).getMonth() + 1 : null;
                    this.dobYear = userDetails.details.dob ? new Date(userDetails.details.dob).getFullYear() : null;
                    this.phone = userDetails.details.phone;
                    this.email = userDetails.email;
                    this.role = userDetails.role;
                    this.address = userDetails.details.address;
                    this.profilePicture = userDetails.details.profile_picture;
                    console.log('User details fetched:', this.role);

                })
                .catch(error => {
                    console.error("Error fetching user details:", error);
                });
                
        },
        fetchUser(user) {
      let userProxy = new Proxy(user, {
        get: function (target, prop) {
          return prop in target ? target[prop] : undefined;
        },
      });
      return userProxy.role;
    },
        
        changeProfilePicture() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.profilePicture = URL.createObjectURL(file);
                const formData = new FormData();
                formData.append("profile_picture", file);

                axios.post(`http://127.0.0.1:8000/api/users/${this.userId}/uploadProfilePicture`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                .then(response => {
                    console.log("Profile picture updated:", response.data);
                })
                .catch(error => {
                    console.error("Error updating profile picture:", error);
                });
            }
        },
        validateField(fieldNameError, fieldName, fieldValue, minLength, maxLength, regexPattern) {
            if (!fieldValue || fieldValue.trim() === "") {
                this[`error${fieldNameError}`] = `${fieldName} không được để trống`;
                return false;
            }

            if (fieldNameError === "Name") {
                if (fieldValue.length > 100) {
                    this[`error${fieldNameError}`] = `${fieldName} không được dài quá 100 ký tự`;
                    return false;
                }
                if (/\s{2,}/.test(fieldValue)) {
                    this[`error${fieldNameError}`] = `${fieldName} không được có 2 khoảng trắng gần nhau`;
                    return false;
                }
                if (/^\s/.test(fieldValue)) {
                    this[`error${fieldNameError}`] = `${fieldName} không được có khoảng trắng ở đầu`;
                    return false;
                }
            }

            if (fieldNameError === "Phone") {
                if (fieldValue.length !== 10 || !/^0\d{9}$/.test(fieldValue)) {
                    this[`error${fieldNameError}`] = `${fieldName} phải có 10 ký tự và bắt đầu bằng số 0`;
                    return false;
                }
            }

            if (fieldNameError === "Email") {
                if (fieldValue.length > 100) {
                    this[`error${fieldNameError}`] = `${fieldName} không được dài quá 100 ký tự`;
                    return false;
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(fieldValue)) {
                    this[`error${fieldNameError}`] = `${fieldName} không hợp lệ`;
                    return false;
                }
            }

            if (fieldNameError === "Address") {
                if (fieldValue.length > 100) {
                    this[`error${fieldNameError}`] = `${fieldName} không được dài quá 100 ký tự`;
                    return false;
                }
                if (/\s{2,}/.test(fieldValue)) {
                    this[`error${fieldNameError}`] = `${fieldName} không được có 2 khoảng trắng gần nhau`;
                    return false;
                }
                if (/^\s/.test(fieldValue)) {
                    this[`error${fieldNameError}`] = `${fieldName} không được có khoảng trắng ở đầu`;
                    return false;
                }
            }

            if (fieldValue.length < minLength || fieldValue.length > maxLength) {
                this[`error${fieldNameError}`] = `${fieldName} phải có ít nhất ${minLength} ký tự hoặc ít hơn ${maxLength} ký tự`;
                return false;
            }
            if (regexPattern && !regexPattern.test(fieldValue)) {
                this[`error${fieldNameError}`] = `${fieldName} không được chứa ký tự đặc biệt`;
                return false;
            }

            this[`error${fieldNameError}`] = ""; 
            return true;
        },

        save() {
            const validName = this.validateField("Name", "Tên", this.name, 1, 100);
            const validPhone = this.validateField("Phone", "Số điện thoại", this.phone, 10, 10, /^0\d{9}$/);
            const validEmail = this.validateField("Email", "Email", this.email, 5, 100);
            const validAddress = this.validateField("Address", "Địa chỉ", this.address, 1, 100);
            if (validName && validPhone && validEmail && validAddress) {
                const updatedUserDetails = {
                    name: this.name,
                    gender: this.gender,
                    dob: `${this.dobYear}-${this.dobMonth}-${this.dobDay}`,  
                    phone: this.phone,
                    email: this.email,
                    address: this.address,
                    profile_picture: this.profilePicture || ''
                };

                axios.put(`http://127.0.0.1:8000/api/users/${this.userId}`, updatedUserDetails)
                    .then(response => {
                        console.log('User details updated:', response.data);
                        this.showSuccessModal = true; 

                        setTimeout(() => {
                            this.showSuccessModal = false;
                        }, 3000);
                    })
                    .catch(error => {
                        console.error("Error saving user details:", error);
                    });
            }
        },
        closeModal() {
            this.showSuccessModal = false;
        },
        cancel() {
            this.fetchUserDetails();
        }
        
    }
};
</script>


<style lang="scss" scoped>
@import "@/components/UserDetails/UserDetails.scss";
</style>