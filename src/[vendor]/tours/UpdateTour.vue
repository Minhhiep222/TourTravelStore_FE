<template>
  <div>
    <div class="header_create-tour">
      <label>Chỉnh sửa tour du lịch</label>
    </div>
    <div class="container p-0 my-8 rounded">
      <form
        class="form_tour"
        v-if="swicth == ''"
        @submit.prevent="handleSubmit"
      >
        <!-- image -->
        <div class="form-group">
          <label> Hình ảnh </label>
          <div class="group_image">
            <div class="image_tours" v-if="imagePreviews.length">
              <div
                class="image-item"
                v-for="(image, index) in imagePreviews"
                :key="index"
              >
                <img
                  class="image_tours-item"
                  :src="image"
                  alt="Image"
                  width="100"
                />
                <button
                  class="btn_removeImage"
                  @click.prevent="removeImage(index)"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
              <img
                class="image_tours-item button"
                :src="imageDefault"
                alt="Image"
                width="100"
                @click="openFileDialog"
              />
            </div>
            <div v-else>
              <img
                class="image_tours-item button"
                :src="imageDefault"
                alt="Image"
                width="100"
                @click="openFileDialog"
              />
            </div>
            <input
              class="input_img"
              type="file"
              @change="handleFileUpload"
              accept=".jpg, .png, .svg, .jpeg"
              multiple
              hidden
            />
            <div v-if="errorImage" class="error">{{ errorImage }}</div>
          </div>
        </div>

        <!-- name -->
        <div class="form-group">
          <label> Tên tour </label>
          <input
            @input="logTour"
            placeholder="Nhập tên tour du lịch"
            type="text"
            v-model="name"
          />
          <div v-if="errorName" class="error">{{ errorName }}</div>
        </div>

        <!-- duration -->
        <div class="form-group">
          <label> Thời gian </label>
          <input
            placeholder="Nhập vào số ngày"
            type="text"
            v-model="duration"
          />
          <div v-if="errorDuration" class="error">{{ errorDuration }}</div>
        </div>

        <!-- start date -->
        <!-- <div class="form-group">
          <div class="time_tour">
            <div class="time_start">
              <label> Ngày bắt đầu </label>
              <VueDatePicker v-model="start" placeholder="Chọn ngày bắt đầu"></VueDatePicker>
              <div v-if="errorStartDate" class="error">
                {{ errorStartDate }}
              </div>
            </div>
            <div class="time_end">
              <label> Ngày kết thúc </label>
              <VueDatePicker v-model="end" placeholder="Chọn ngày kết thúc"></VueDatePicker>
              <div v-if="errorEndDate" class="error">{{ errorEndDate }}</div>
            </div>
          </div>
        </div> -->

        <!-- end date -->
        <div class="form-group">
          <label> Địa chỉ </label>
          <input
            placeholder="Nhập vào địa chỉ"
            type="text"
            v-model="location"
          />
          <div v-if="errorLocation" class="error">{{ errorLocation }}</div>
        </div>

        <!-- price and stutus -->
        <div class="form-group">
          <div class="schedule">
            <div class="price">
              <label> Giá </label>
              <input placeholder="Nhập vào giá" type="text" v-model="price" />
              <div v-if="errorPrice" class="error">{{ errorPrice }}</div>
            </div>
            <div class="status">
              <label> Trạng thái </label>
              <select v-model="availability">
                <option>Chọn trạng thái</option>
              </select>
              <div v-if="errorAvailability" class="error">
                {{ errorAvailability }}
              </div>
            </div>
          </div>
        </div>

        <!-- schedule -->
        <div class="form-group">
          <label> Lịch trình </label>
          <div
            class="schedule"
            v-for="(schedule, index) in schedules"
            :key="index"
          >
            <div class="schedule-item">
              <div class="schedule-item_name">
                <input
                  :placeholder="'Nhập vào tên lịch trình ' + (index + 1)"
                  type="text"
                  v-model="schedule.name_schedule"
                />
                <div v-if="errorNameSchedule[index]" class="error">
                  {{ errorNameSchedule[index] }}
                </div>
              </div>
              <div class="schedule-item_time">
                <VueDatePicker
                  v-model="schedule.time_schedule"
                  placeholder="Chọn thời gian lịch trình"
                >
                </VueDatePicker>
                <div v-if="errorDateTimeSchedule[index]" class="error">
                  {{ errorDateTimeSchedule[index] }}
                </div>
              </div>
              <button
                class="btn_removeSchedule"
                @click.prevent="removeSchedule(index)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div v-if="errorSchedules" class="error">{{ errorSchedules }}</div>
          <button class="btn_addSchedule" @click.prevent="addSchedule">
            Thêm lịch trình +
          </button>
        </div>

        <!-- desciption -->
        <div class="form-group">
          <label> Mô tả </label>
          <textarea
            placeholder="Nhập vào mô tả"
            type="text"
            v-model="description"
          ></textarea>
          <div v-if="errorDescription" class="error">
            {{ errorDescription }}
          </div>
        </div>
      </form>
    </div>
    <div class="footer_create-tour">
      <button @click.prevent="showModal" class="save">Lưu</button>
      <!-- Updated to show modal -->
      <button class="cancel" @click.prevent="close">Đóng</button>
    </div>
    <!-- Modal for confirmation -->
    <div
      v-if="isModalVisible"
      @click="closeModal"
      class="modal fade show"
      style="display: block; z-index: 1050"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content p-3">
          <div class="modal-header">
            <h5 class="modal-title text-green-500 text-3xl">Lưu dữ liệu</h5>
          </div>
          <div class="modal-body">
            <p>Bạn có chắc chắn muốn lưu tour này không?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Đóng
            </button>
            <button type="button" class="btn btn-success" @click="confirmSave">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default {
  name: "UpdateTour",
  components: {
    VueDatePicker,
  },
  setup() {
    // const start = ref(null);
    // const end = ref(null);
    const route = useRoute();
    const tourId = ref(route.params.id); // Lấy tham số ID từ URL
    let tourData = ref(null);
    const name = ref("");
    const description = ref("");
    const duration = ref("");
    const price = ref("");
    const location = ref("");
    const availability = ref("");
    const start = ref("");
    const end = ref("");
    const selectedFiles = ref([]);
    const imagePreviews = ref([]);
    const schedules = ref([]);
    const image = ref("");
    const start_date = ref("");
    const end_date = ref("");

    onMounted(async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/tours/${tourId.value}`
        );
        tourData.value = response.data;
        name.value = tourData.value.tour.name;
        description.value = tourData.value.tour.description;
        duration.value = tourData.value.tour.duration;
        price.value = String(tourData.value.tour.price);
        location.value = tourData.value.tour.location;
        availability.value = tourData.value.tour.availability;
        start.value = moment(tourData.value.tour.start_date).toDate();
        end.value = moment(tourData.value.tour.end_date).toDate();
        // selectedFiles.value = moment(tourData.value.tour.end_date).toDate();
        const arrayImage = tourData.value.tour.images;
        arrayImage.forEach((item) => {
          imagePreviews.value.push(
            `http://127.0.0.1:8000/images/${item.image_url}`
          );
          image.value = item.image_url;
        });

        const arraySchedule = tourData.value.tour.schedules;
        arraySchedule.forEach((item) => {
          schedules.value.push({
            name_schedule: item.name,
            time_schedule: item.time,
          });
        });
        // localStorage.setItem('tourId', tourId.value);
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          document.querySelector(".container").innerHTML = `
            <div class="error-message">
              <h2>Tour Not Found</h2>
              <p>We apologize, but the tour you are looking for does not exist.</p>
              <button class="btn btn-primary" onclick="window.location.href='/minh-hiep/tours'">View All Tours</button>
            </div>
          `;
          return;
        }
      }
    });

    return {
      tourId,
      tourData,
      name,
      description,
      duration,
      price,
      location,
      availability,
      start,
      end,
      selectedFiles,
      imagePreviews,
      schedules,
      image,
      start_date,
      end_date,
    };
  },
  data() {
    return {
      swicth: "",
      errorName: "",
      errorDescription: "",
      errorDuration: "",
      errorPrice: "",
      errorStartDate: "",
      errorEndDate: "",
      errorLocation: "",
      errorAvailability: "",
      errorImage: "",
      errorSchedules: "",
      errorNameSchedule: [],
      errorDateTimeSchedule: [],
      imageDefault: "http://127.0.0.1:8000/images/default.png",
      isModalVisible: false,
      verify: false,
    };
  },

  watch: {
    // Theo dõi sự thay đổi của start và end date
    // start(val) {
    //   this.start_date = moment(val).format("YYYY/MM/DD");
    // },
    // end(val) {
    //   this.end_date = moment(val).format("YYYY/MM/DD");
    // },

    name: {
      handler(val) {
        this.name = val;
        this.validateField("Name", "Tên tour", this.name, 20, 100, this.regex);
      },
      deep: true,
    },
    description: {
      handler(val) {
        this.description = val;
        this.validateField(
          "Description",
          "Mô tả",
          this.description,
          10,
          500,
          null
        );
      },
      deep: true,
    },
    duration: {
      handler(val) {
        this.duration = val;
        this.validateField(
          "Duration",
          "Thời gian dự kiến",
          this.duration,
          1,
          3,
          /^[0-9]+$/,
          (value) => {
            return value <= 0 ? "Thời gian phải là số dương lớn hơn 0" : "";
          }
        );
      },
      deep: true,
    },
    price: {
      handler(val) {
        this.price = val;
        this.validateField(
          "Price",
          "Giá",
          this.price,
          1,
          10,
          /^[0-9]+$/,
          (value) => {
            return value <= 0 ? "Giá phải là số dương lớn hơn 0" : "";
          }
        );
      },
      deep: true,
    },
    // start_date: {
    //   handler(val) {
    //     this.start_date = val;
    //     this.checkDate();
    //   },
    //   deep: true,
    // },
    // end_date: {
    //   handler(val) {
    //     this.end_date = val;
    //     this.checkDate();
    //   },
    //   deep: true,
    // },
    location: {
      handler(val) {
        this.location = val;
        this.validateField(
          "Location",
          "Địa chỉ",
          this.location,
          20,
          100,
          this.regex
        );
      },
      deep: true,
    },
    image: {
      handler(val) {
        this.image = val;
        this.validateField(
          "Image",
          "Hình ảnh",
          this.image,
          1,
          500,
          /\.(jpg|svg|png)$/i
        );
      },
      deep: true,
    },

    schedules: {
      handler(val) {
        val.forEach((schedule, index) => {
          this.schedules[index].name_schedule = schedule.name_schedule;
          this.schedules[index].time_schedule = moment(
            schedule.time_schedule
          ).format("YYYY/MM/DD HH:mm");
          this.validateSchedules();
        });
      },
      deep: true, // Bắt buộc theo dõi các thay đổi bên trong mảng
    },
  },

  methods: {
    notifyError(message) {
      toast.error(`${message}!`, {
        autoClose: 1500,
      }); // ToastOptions
    },
    showModal() {
      this.isModalVisible = true; // Show the modal
    },
    confirmSave() {
      this.isModalVisible = false;
      this.handleSubmit();
    },
    closeModal() {
      this.isModalVisible = false;
    },
    validateField(
      fieldNameError,
      fieldName,
      fieldValue,
      minLength,
      maxLength,
      regexPattern
    ) {
      if (!fieldValue || fieldValue.trim() === "") {
        // Kiểm tra nếu error là mảng
        if (Array.isArray(this[`error${fieldNameError}`])) {
          this[`error${fieldNameError}`].push(
            `${fieldName} không được để trống`
          );
        } else {
          this[`error${fieldNameError}`] = `${fieldName} không được để trống`;
        }
        return false;
      }

      if (fieldValue.length < minLength || fieldValue.length > maxLength) {
        // Kiểm tra nếu error là mảng
        if (Array.isArray(this[`error${fieldNameError}`])) {
          this[`error${fieldNameError}`].push(
            `${fieldName} phải có ít nhất ${minLength} ký tự hoặc ít hơn ${maxLength} ký tự`
          );
        } else {
          this[
            `error${fieldNameError}`
          ] = `${fieldName} phải có ít nhất ${minLength} ký tự hoặc ít hơn ${maxLength} ký tự`;
        }
        return false;
      }

      if (fieldNameError == "Price" || fieldNameError == "Duration") {
        if (regexPattern && !regexPattern.test(fieldValue)) {
          this[
            `error${fieldNameError}`
          ] = `${fieldName} phải là số dương lớn hơn 0`;
          return false;
        }
      }
      if (fieldNameError == "Image") {
        if (regexPattern && !fieldValue.match(regexPattern)) {
          this[
            `error${fieldNameError}`
          ] = `${fieldName} phải có định dạng jpg, svg, hoặc png`;
          return false;
        }
      }
      if (regexPattern && !regexPattern.test(fieldValue)) {
        if (Array.isArray(this[`error${fieldNameError}`])) {
          this[`error${fieldNameError}`].push(
            `${fieldName} không được chứa ký tự đặc biệt`
          );
        } else {
          this[
            `error${fieldNameError}`
          ] = `${fieldName} không được chứa ký tự đặc biệt`;
        }
        return false;
      }

      if (Array.isArray(this[`error${fieldNameError}`])) {
        this[`error${fieldNameError}`] = [];
      } else {
        this[`error${fieldNameError}`] = "";
      }
      return true;
    },

    setSwicth(item) {
      this.swicth = item;
    },
    handleFileUpload(event) {
      const files = event.target.files;
      if (files && files.length > 10) {
        this.errorImage = "Vui lòng chọn nhiều nhất 10 hình ảnh.";
        return;
      }
      if (files && files.length < 5) {
        this.errorImage = "Vui lòng chọn ít nhất 5 hình ảnh.";
        return;
      } else if (files && files.length > 0) {
        this.errorImage = null; // Reset lỗi nếu có
        this.selectedFiles = Array.from(files);
        this.imagePreviews = this.selectedFiles.map((file) =>
          URL.createObjectURL(file)
        );
      } else {
        this.errorImage = "Vui lòng chọn ít nhất một tệp hình ảnh.";
        return;
      }
    },

    openFileDialog() {
      // Tìm input và kích hoạt sự kiện click
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.click();
      }
    },

    removeImage(index) {
      this.selectedFiles.splice(index, 1);
      this.imagePreviews.splice(index, 1);
    },

    // Add schedule when click button
    addSchedule() {
      this.schedules.push({ name_schedule: "", time_schedule: "" });
    },

    //Remove schedule
    removeSchedule(index) {
      this.schedules.splice(index, 1);
    },

    checkDate() {
      // Validate ngày bắt đầu và ngày kết thúc
      let isValidStartDate = true;
      let isValidEndDate = true;

      if (!this.start_date) {
        this.errorStartDate = "Ngày bắt đầu không được để trống";
        isValidStartDate = false;
      } else {
        this.errorStartDate = ""; // Xóa lỗi nếu không có lỗi
      }

      if (!this.end_date) {
        this.errorEndDate = "Ngày kết thúc không được để trống";
        isValidEndDate = false;
      } else {
        this.errorEndDate = ""; // Xóa  nếu không có lỗi
      }

      let startDateObj = null;
      let endDateObj = null;
      // Kiểm tra nếu start date bé hơn ngày hiện tại
      if (this.start_date) {
        startDateObj = new Date(this.start_date);
        const dateNowObj = new Date();
        if (startDateObj < dateNowObj) {
          this.errorStartDate = "Ngày bắt đầu phải lớn hơn ngày hiện tại";
          isValidStartDate = false;
        }
      }

      // Kiểm tra nếu start_date lớn hơn end_date
      if (this.start_date && this.end_date) {
        startDateObj = new Date(this.start_date);
        endDateObj = new Date(this.end_date);

        if (startDateObj > endDateObj) {
          this.errorStartDate = "Ngày bắt đầu phải bé hơn ngày kết thúc";
          isValidStartDate = false;
        }

        if (endDateObj <= startDateObj) {
          this.errorEndDate = "Ngày kết thúc phải lớn hơn ngày bắt đầu";
          isValidEndDate = false;
        }
      }

      if (!isValidStartDate || !isValidEndDate) {
        console.log("Có lỗi trong form, không gửi dữ liệu.");
        return false; // Validation failed
      }

      return true;
    },

    checkValidate(regex) {
      // Validate fields
      const isValidName = this.validateField(
        "Name",
        "Tên tour",
        this.name,
        20,
        100,
        regex
      );
      const isValidLocation = this.validateField(
        "Location",
        "Địa chỉ",
        this.location,
        20,
        100,
        regex
      );
      const isValidDescription = this.validateField(
        "Description",
        "Mô tả",
        this.description,
        10,
        500,
        null
      );
      const isValidDuration = this.validateField(
        "Duration",
        "Thời gian dự kiến",
        this.duration,
        1,
        3,
        /^[0-9]+$/,
        (value) => {
          return value <= 0 ? "Thời gian phải là số dương lớn hơn 0" : "";
        }
      );
      const isValidPrice = this.validateField(
        "Price",
        "Giá",
        this.price,
        1,
        10,
        /^[0-9]+$/,
        (value) => {
          return value <= 0 ? "Giá phải là số dương lớn hơn 0" : "";
        }
      );
      const isValidImage = this.validateField(
        "Image",
        "Hình ảnh",
        this.image,
        1,
        500,
        /\.(jpg|svg|png)$/i
      );

      //Check Validate of Date
      // const validDate = this.checkDate();
      // Check if any validation failed
      if (
        !isValidName ||
        !isValidLocation ||
        !isValidDescription ||
        !isValidDuration ||
        !isValidPrice ||
        !isValidImage
      ) {
        return false; // Validation failed
      }

      return true; // Validation succeeded
    },

    validateSchedules() {
      if (this.schedules.length === 0) {
        this.errorSchedules = "Vui lòng thêm lịch trình";
        return false;
      }
      let isValidNameSchedule = true;
      let isValidTimeSchedule = true;
      this.errorNameSchedule = [];
      this.errorDateTimeSchedule = [];

      if (this.schedules.length === 0) {
        return false;
      }

      this.schedules.forEach((schedule, index) => {
        const isValid = this.validateField(
          "NameSchedule",
          "Tên lịch trình",
          schedule.name_schedule,
          10,
          100,
          this.regex
        );
        this.errorNameSchedule[index] = isValid
          ? ""
          : `Tên lịch trình ${index + 1} không hợp lệ`;
        isValidNameSchedule = isValidNameSchedule && isValid;
        const currentDate = schedule.time_schedule;
        if (index < this.schedules.length - 1) {
          const nextDate = this.schedules[index + 1].time_schedule;
          if (nextDate < currentDate) {
            this.errorDateTimeSchedule[index] = `Thời gian lịch trình ${
              index + 1
            } không được bé hơn lịch trình ${index + 2}`;
            isValidTimeSchedule = false;
          }
        }
        // // Validate with start_date and end_date
        // const startDate = moment(this.start).format("YYYY/MM/DD HH:mm");
        // const endDate = moment(this.end).format("YYYY/MM/DD HH:mm");
        // if (currentDate < startDate || currentDate > endDate) {
        //   if (this.start == null || this.end == null) {
        //     this.errorDateTimeSchedule[index] =
        //       "Vui lòng chọn ngày bắt đầu và ngày kết thúc chuyến đi!";
        //   } else {
        //     this.errorDateTimeSchedule[index] = `Thời gian lịch trình ${index + 1
        //       } phải nằm trong khoảng từ ${this.start_date} đến ${this.end_date}`;
        //   }
        //   isValidTimeSchedule = false;
        // }
      });
      // this.errorNameSchedule = [];
      // this.errorDateTimeSchedule = [];
      return isValidNameSchedule && isValidTimeSchedule;
    },

    close() {
      this.$router.push({
        path: "/minh-hiep/tours",
        query: { message: "errorEdit" },
      });
    },

    async handleSubmit() {
      if (this.schedules.length > 0) {
        const checkVar = this.validateSchedules();
        if (!checkVar) {
          this.notifyError("Có lỗi xảy ra vui lòng kiểm tra lại dữ liệu");
          return;
        }
      }

      // Validate schedules before submission
      const checkValidate = this.checkValidate();
      if (!checkValidate) {
        this.notifyError("Có lỗi xảy ra vui lòng kiểm tra lại dữ liệu");
        return; // Validation failed
      }

      // Prepare form data for update
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("description", this.description);
      formData.append("duration", this.duration);
      formData.append("price", this.price);
      formData.append("start_date", this.start_date);
      formData.append("end_date", this.end_date);
      formData.append("location", this.location);
      formData.append("availability", this.availability);
      formData.append("schedules", JSON.stringify(this.schedules));

      // Append files to form data
      this.selectedFiles.forEach((file) => {
        formData.append(`images[]`, file);
      });

      //Mạo danh
      formData.append("_method", "PUT");

      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/tours/${this.tourId}`, // Update endpoint
          formData,
          {
            headers: {
              "Content-type": "multipart/form-data",
            },
          }
        );
        if (response.status == 200) {
          this.$router.push({
            path: "/minh-hiep/tours",
            query: { message: "successEdit" },
          });
        }
      } catch (error) {
        console.error("Update failed:", error.response.data);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@use "../../assets/Global.module.scss";
@use "../../assets/Tour.module.scss";
</style>
