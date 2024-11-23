import { createRouter, createWebHistory } from "vue-router";
import UserRegister from "./components/Register/Register.vue";
import TourList from "./[vendor]/tours/Tour.vue";
import QLTour from "./[vendor]/tours/QLTour.vue";
import CreateTour from "./[vendor]/tours/CreateTour.vue";
import UpdateTour from "./[vendor]/tours/UpdateTour.vue";
import DetailTour from "./[vendor]/tours/DetailTour.vue";
import Payment from "./[user]/Payment.vue";
import Success from "./[user]/Success.vue";
import UserDetails from "./components/UserDetails/UserDetails.vue";
import UserAdmin from "./components/UserAdmin/UserAdmin.vue";
import HomePage from "./components/Home/Home.vue";
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout.vue";
import HeaderOnly from "./Layout/HeaderOnly/HeaderOnly.vue";
import Detail from "./Page/Detail/Detail.vue";
import Profile from "./Page/Profile/Profile.vue";
import Storage from "./Page/Storage/Storage.vue";
import Booking from "./Page/Booking/Booking/Booking.vue";
import TourGuide from "./components/TourGuide/TourGuide.vue";
import AddTourGuide from "./components/TourGuide/AddTourGuide/AddTourGuide.vue";
import UpdateTourGuide from "./components/TourGuide/AddTourGuide/UpdateTourGuide/UpdateTourGuide.vue";
import BookingTicket from "./Page/Booking/BookingTicket/BookingTicket.vue";
import BookingTour from "./Page/Booking/BookingTour/BookingTour.vue";
import Search from "./[user]/Search.vue";
import ChatBot from "./components/ChatBot/ChatBot.vue";
import Favorite from "./Page/Favorite/Favorite.vue";
import ChatRealTime from "./components/chat_conversation/ChatList.vue";
import Socket from "./components/socket/socket.vue";
import CustomerSupport from "./components/CustomerSupport/CustomerSupport.vue";
import ContactUs from "./components/CustomerSupport/ContactUs.vue";
import Statistical from "./components/Statistical/Statistical.vue";
import QLOrder from "./components/Order/Order.vue";
import DetailsOrder from "./components/Order/DetailsOrder.vue";
// import QLOrder from "./components/Order/Order.vue";
// import DetailsOrder from "./components/Order/DetailsOrder.vue";
import Notification from "./components/Notification.vue";
import DefaultLayoutVendor from "./Layout/DefaultLayout/DefaultLayoutVendor.vue";

const routes = [
  {
    path: "/register",
    name: "Register",
    component: UserRegister,
  },

  {
    path: "/login",
    name: "Login",
    component: HeaderOnly,
    children: [
      {
        path: "/",
        name: "Home",
        component: HomePage,
      },
      {
        path: "/search",
        name: "Search",
        component: Search,
      },
      {
        path: "/:user/chat",
        name: "chat",
        component: ChatRealTime,
      },
      {
        path: "/:user/socket",
        name: "socket",
        component: Socket,
      },
      {
        path: "/detail/:id",
        name: "Detail",
        component: Detail,
      },
      {
        path: "/booking/:id",
        name: "Booking",
        component: Booking,
      },
      {
        path: "/tourguide",
        name: "TourGuide",
        component: TourGuide,
      },
      {
        path: "/addtourguide",
        name: "AddTourGuide",
        component: AddTourGuide,
      },
      {
        path: "/updatetourguide/:id",
        name: "UpdateTourGuide",
        component: UpdateTourGuide,
      },
      {
        path: "/bookingticket/:id",
        name: "Bookingticket",
        component: BookingTicket,
      },
      {
        path: "/bookingtour/:id",
        name: "BookingTour",
        component: BookingTour,
      },
      {
        path: "/:user/payment",
        name: "Payment",
        component: Payment,
      },
      {
        path: "/:user/payment/success",
        name: "PaymentSuccess",
        component: Success,
      },
      {
        path: "/UserAdmin",
        name: "UserAdmin",
        component: UserAdmin,
      },

      {
        path: "/chatbot",
        name: "ChatBot",
        component: ChatBot,
      },
      {
        path: "/favorite",
        name: "Favorite",
        component: Favorite,
      },
      {
        path: "/notification",
        name: "Notification",
        component: Notification,
      },
      {
        path: "/UserDetails/:id",
        name: "UserDetails",
        component: UserDetails,
      },
      {
        path: "/CustomerSupport",
        name: "CustomerSupport",
        component: CustomerSupport,
      },
      {
        path: "/CustomerSupport/ContactUs",
        name: "ContactUs",
        component: ContactUs,
      },
    ],
  },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "profile",
        name: "Profile",
        component: Profile,
        props: true,
      },
      {
        path: "storage",
        name: "Storage",
        component: Storage,
      },

      {
        path: "/HomePage",
        name: "HomePage",
        component: HomePage,
      },
      {
        path: "/:vendor/tours",
        name: "Tours",
        component: TourList,
      },
      {
        path: "/admin/manager/tours",
        name: "QLTour",
        component: QLTour,
      },
      {
        path: "/:vendor/tours/:id",
        name: "DetailTour",
        component: DetailTour,
      },
      {
        path: "/Statistical",
        name: "Statistical",
        component: Statistical,
      },

      {
        path: "/QLOrder",
        name: "QLOrder",
        component: QLOrder,
      },
      {
        path: "/DetailsOrder/:id",
        name: "DetailsOrder",
        component: DetailsOrder,
      },
      {
        path: "/UserAdmin",
        name: "UserAdmin",
        component: UserAdmin,
      },
    ],
  },
  {
    path: "/",
    component: DefaultLayoutVendor,
    children: [
      {
        path: "/:vendor/tours",
        name: "Tours",
        component: TourList,
      },
    ],
  },
  {
    path: "/:vendor/tours/create",
    name: "CreateTour",
    component: CreateTour,
  },
  {
    path: "/:vendor/tours/edit/:id",
    name: "UpdateTour",
    component: UpdateTour,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
