<template>
  <div class="container mt-5">
    <h1 class="mb-4">Danh sách người dùng</h1>

    <!-- Hiển thị thông báo thành công nếu có -->
    <div v-if="successMessage" class="alert alert-success" role="alert">
      {{ successMessage }}
    </div>

    <!-- Nút thêm người dùng -->
    <button @click="showAddModal = true" class="btn btn-success mb-3">
      Thêm User
    </button>

    <!-- Modal thêm người dùng -->
    <div
      class="modal fade"
      :class="{ show: showAddModal }"
      tabindex="-1"
      role="dialog"
      style="display: block"
      v-if="showAddModal"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thêm User</h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addUser">
              <div class="form-group">
                <label for="name">Tên</label>
                <input
                  v-model="newUser.name"
                  type="text"
                  class="form-control"
                  id="name"
                  required
                />
                <span class="text-danger">{{ errorName }}</span>
              </div>
              <div class="form-group">
                <label for="username">Tên đăng nhập</label>
                <input
                  v-model="newUser.username"
                  type="text"
                  class="form-control"
                  id="username"
                  required
                />
                <span class="text-danger">{{ errorUsername }}</span>
              </div>
              <div class="form-group">
                <label for="password">Mật khẩu</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="newUser.password"
                  required
                />
                <span class="text-danger">{{ errorPassword }}</span>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  v-model="newUser.email"
                  type="email"
                  class="form-control"
                  id="email"
                  required
                />
                <span class="text-danger">{{ errorEmail }}</span>
              </div>
              <div class="form-group">
                <label for="role">Vai trò</label>
                <select
                  v-model="newUser.role"
                  class="form-control"
                  id="role"
                  required
                >
                  <option value="3">Quản trị viên</option>
                  <option value="2">Người dùng</option>
                  <option value="1">Khách</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Lưu</button>
              <button
                type="button"
                class="btn btn-secondary"
                @click="showAddModal = false"
              >
                Đóng
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal sửa người dùng -->
    <div
      class="modal fade"
      :class="{ show: showEditModal }"
      tabindex="-1"
      role="dialog"
      style="display: block"
      v-if="showEditModal"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Sửa User</h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateUser">
              <div class="form-group">
                <label for="editName">Tên</label>
                <input
                  v-model="editUser.name"
                  type="text"
                  class="form-control"
                  id="editName"
                  required
                />
                <span class="text-danger">{{ errorEditName }}</span>
              </div>
              <div class="form-group">
                <label for="editUsername">Tên đăng nhập</label>
                <input
                  v-model="editUser.username"
                  type="text"
                  class="form-control"
                  id="editUsername"
                  required
                />
                <span class="text-danger">{{ errorEditUsername }}</span>
              </div>
              <div class="form-group">
                <label for="editEmail">Email</label>
                <input
                  v-model="editUser.email"
                  type="email"
                  class="form-control"
                  id="editEmail"
                  required
                />
                <span class="text-danger">{{ errorEditEmail }}</span>
              </div>
              <div class="form-group">
                <label for="editRole">Vai trò</label>
                <select
                  v-model="editUser.role"
                  class="form-control"
                  id="editRole"
                  required
                >
                  <option value="3">Quản trị viên</option>
                  <option value="2">Người dùng</option>
                  <option value="1">Khách</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Lưu</button>
              <button
                type="button"
                class="btn btn-secondary"
                @click="showEditModal = false"
              >
                Đóng
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal xác nhận xóa người dùng -->
    <div
      class="modal fade"
      :class="{ show: showDeleteModal }"
      tabindex="-1"
      role="dialog"
      style="display: block"
      v-if="showDeleteModal"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content p-3">
          <div class="modal-header">
            <h5 class="modal-title">Xác nhận xóa</h5>
          </div>
          <div class="modal-body">
            <p>Bạn có muốn xóa người dùng này không?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="deleteUser">
              Xóa
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="showDeleteModal = false"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Bảng hiển thị danh sách người dùng -->
    <table class="custom-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên</th>
          <th>Tên đăng nhập</th>
          <th>Email</th>
          <th>Vai trò</th>
          <th style="width: 14%">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button class="btn btn-warning" @click="editUserModal(user)">
              Sửa
            </button>
            <button class="btn btn-danger" @click="confirmDeleteModal(user)">
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      successMessage: null,
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      newUser: { name: "", username: "", email: "", role: "" },
      editUser: { id: "", name: "", username: "", email: "", role: "" },
      errorName: "",
      errorUsername: "",
      errorPassword: "",
      errorEmail: "",
      errorEditName: "",
      errorEditUsername: "",
      errorEditEmail: "",
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        this.users = response.data.users;
      } catch (error) {
        console.error("Lỗi khi lấy người dùng:", error);
      }
    },
    validateField(
      fieldNameError,
      fieldName,
      fieldValue,
      minLength,
      maxLength,
      regexPattern,
      existingValues
    ) {
      if (!fieldValue || fieldValue.trim() === "") {
        this[`error${fieldNameError}`] = `${fieldName} không được để trống`;
        return false;
      }

      if (fieldNameError === "Password") {
        if (fieldValue.length < minLength || fieldValue.length > maxLength) {
          this[
            `error${fieldNameError}`
          ] = `${fieldName} phải có từ ${minLength} đến ${maxLength} ký tự`;
          return false;
        }
        if (/\s/.test(fieldValue)) {
          this[
            `error${fieldNameError}`
          ] = `${fieldName} không được chứa khoảng trắng`;
          return false;
        }
      }

      if (fieldNameError === "Username") {
        const hasLetter = /[a-zA-Z]/.test(fieldValue);
        const hasNumber = /\d/.test(fieldValue);
        if (!hasLetter || !hasNumber) {
          this[
            `error${fieldNameError}`
          ] = `${fieldName} phải chứa ít nhất một chữ và một số`;
          return false;
        }
        if (existingValues.includes(fieldValue)) {
          this[`error${fieldNameError}`] = `${fieldName} đã tồn tại`;
          return false;
        }
      }

      if (fieldNameError === "Email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Định dạng email cơ bản
        if (!emailRegex.test(fieldValue)) {
          this[`error${fieldNameError}`] = `${fieldName} không hợp lệ`;
          return false;
        }
        if (existingValues.includes(fieldValue)) {
          this[`error${fieldNameError}`] = `${fieldName} đã tồn tại`;
          return false;
        }
      }

      if (fieldValue.length < minLength || fieldValue.length > maxLength) {
        this[
          `error${fieldNameError}`
        ] = `${fieldName} phải có ít nhất ${minLength} ký tự hoặc ít hơn ${maxLength} ký tự`;
        return false;
      }
      // if (regexPattern && !regexPattern.test(fieldValue)) {
      //   this[
      //     `error${fieldNameError}`
      //   ] = `${fieldName} không được chứa ký tự đặc biệt`;
      //   return false;
      // }

      this[`error${fieldNameError}`] = ""; // Xóa lỗi nếu hợp lệ
      return true;
    },

    async addUser() {
      const regex = /^(?!.*\s{2})(?!.*\u3000)[\p{L}0-9\s]+$/u;
      const existingUsernames = this.users.map((user) => user.username);
      const existingEmails = this.users.map((user) => user.email);

      const isValidName = this.validateField(
        "Name",
        "Tên",
        this.newUser.name,
        5,
        100,
        regex
      );
      const isValidUsername = this.validateField(
        "Username",
        "Tên đăng nhập",
        this.newUser.username,
        5,
        100,
        regex,
        existingUsernames
      );
      const isValidPassword = this.validateField(
        "Password",
        "Mật khẩu",
        this.newUser.password,
        8,
        30,
        null
      );
      const isValidEmail = this.validateField(
        "Email",
        "Email",
        this.newUser.email,
        5,
        100,
        null,
        existingEmails
      );

      if (isValidName && isValidUsername && isValidEmail && isValidPassword) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/users",
            this.newUser
          );
          this.successMessage = "Thêm người dùng thành công!";
          location.reload();
          this.users.push(response.data);
          this.showAddModal = false;
          this.newUser = { name: "", username: "", email: "", role: "" };
          this.errorName = "";
          this.errorUsername = "";
          this.errorEmail = "";
          this.errorPassword = "";
        } catch (error) {
          if (error.response && error.response.status === 422) {
            const validationErrors = error.response.data.errors;
            this.errorUsername = validationErrors.username
              ? validationErrors.username[0]
              : "";
            this.errorEmail = validationErrors.email
              ? validationErrors.email[0]
              : "";
          } else {
            console.error("Lỗi khi thêm người dùng:", error);
          }
        }
      }
    },

    editUserModal(user) {
      this.editUser = { ...user };
      this.showEditModal = true;
    },
    async updateUser() {
      const regex = /^(?!.*\s{2})(?!.*\u3000)[\p{L}0-9\s]+$/u;
      const isValidName = this.validateField(
        "EditName",
        "Tên",
        this.editUser.name,
        5,
        100,
        regex
      );
      const isValidUsername = this.validateField(
        "EditUsername",
        "Tên đăng nhập",
        this.editUser.username,
        5,
        100,
        regex
      );
      const isValidEmail = this.validateField(
        "EditEmail",
        "Email",
        this.editUser.email,
        5,
        100,
        null
      );

      if (isValidName && isValidUsername && isValidEmail) {
        try {
          const response = await axios.put(
            `http://127.0.0.1:8000/api/users/${this.editUser.id}`,
            this.editUser
          ); // Đảm bảo dùng PUT
          this.successMessage = "Cập nhật người dùng thành công!";
          location.reload();
          const index = this.users.findIndex(
            (user) => user.id === this.editUser.id
          );
          this.users.splice(index, 1, response.data);
          this.showEditModal = false;
          this.editUser = {
            id: "",
            name: "",
            username: "",
            email: "",
            role: "",
          };
          this.errorEditName = "";
          this.errorEditUsername = "";
          this.errorEditEmail = "";
        } catch (error) {
          console.error("Lỗi khi cập nhật người dùng:", error);
        }
      }
    },

    confirmDeleteModal(user) {
      this.userToDelete = user;
      this.showDeleteModal = true;
    },
    async deleteUser() {
      try {
        await axios.delete(
          `http://127.0.0.1:8000/api/users/${this.userToDelete.id}`
        );
        this.successMessage = "Xóa người dùng thành công!";
        this.users = this.users.filter(
          (user) => user.id !== this.userToDelete.id
        );
        this.showDeleteModal = false;
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/Global.module.scss";
@use "../../assets/Tour.module.scss";
</style>

<style lang="scss" scoped>
  @import "@/components/UserAdmin/UserAdmin.scss";
  </style>
