<template>
  <div :class="$style.parent">
    <div :class="$style.wrapper" >
     <div :class="$style.wrapTitle">
      <h1 :class="$style.title">Location Details</h1>
      <Icons v-if="handleDisplayMap" @click="handleDisplayMap" :class="$style.iconClose" :iconName="'iconX'" />
     </div>
        <div :class="$style.content">
          <!-- <div @click="logValue">logValue</div> -->
        <!-- <div @click="getCoordinates">get</div> -->
      
        <div v-if="tourName" :class="$style.tourName">{{tourName}}</div>
      <l-map v-if="markerPosition.length > 0 && zoom" :class="$style.map" ref="map" v-model:zoom="zoom" :center="markerPosition">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <l-marker v-if="markerPosition.length > 0" :lat-lng="markerPosition">
           <l-popup>Điểm đến</l-popup>
        </l-marker>
        <l-marker v-if="latitude && longitude"  :lat-lng="[latitude,longitude]">
        <l-popup>Điểm hiện tại</l-popup>
      </l-marker>
      <l-polyline :lat-lngs="polylineCoordinates" :color="'blue'"></l-polyline>
      </l-map>

      <div :class="$style.line"></div>
      <h1 :class="$style.titleService">Pick-up Service</h1>
      <div :class=$style.service>
        <div class="flex items-center space-x-4">
        <div class="flex items-center bg-blue-200 px-2 py-1 rounded-full">
          <font-awesome-icon :class="$style.solidEstimate"  class="ml-0.5" icon="clock" />
            <span v-if="timeTravel" class="ml-1">{{timeTravel}} giờ</span>
        </div>
        <div class="flex items-center bg-blue-200 px-2 py-1 rounded-full">
          <font-awesome-icon :class="$style.solidRoad"  class="ml-0.5" icon="road" />
            <span v-if="distanceTravel" class="ml-1">{{distanceTravel}} km</span>
        </div>
        <!-- <div class="flex items-center bg-blue-200 px-2 py-1 rounded-full">
            <i class="fas fa-bus"></i>
            <span class="ml-1">1 giờ 36</span>
        </div>
        <div class="flex items-center bg-blue-200 px-2 py-1 rounded-full">
            <i class="fas fa-walking"></i>
            <span class="ml-1">2 giờ 5 phút</span>
        </div> -->
    </div>
     <div class="mt-4 space-y-2">
        <div class="flex items-center w-50 space-x-2 p-2 border rounded-lg bg-white">
            <div class="flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full">
                <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span v-if="currentLocation" class="text-gray-700">{{currentLocation}}</span>
        </div>
        <div class="flex items-center w-50 space-x-2 p-2 border rounded-lg bg-white">
            <i class="fas fa-map-marker-alt text-red-500"></i>
            <span v-if="location" class="text-gray-700">{{location}}</span>
        </div>
    </div>
      </div>
   



     </div>
    </div>
  </div>
  </template>
 <script>

 import "leaflet/dist/leaflet.css";
 import { LMap, LTileLayer, LMarker, LPopup,LPolyline } from '@vue-leaflet/vue-leaflet';
//  import L from 'leaflet';
 import { ref, onMounted,nextTick } from "vue";
 import axios from "axios";
 import Swal from "sweetalert2";
 import Icons from "../Icons/Icons.vue";
 
 export default {
   name: 'MapComponent',
   props: {
  handleDisplayMap: {
    type: Function,
    required: true,  
  },
  tourName: {
    type: String,
    required: true,
  },
  tourLocation: {
    type: String,
    required: true,
  }
},
   components: {
     LMap,
     LTileLayer,
     LMarker,
     LPopup,
     Icons,
     LPolyline,
   },
   data(props) {
     const currentLocation = ref(null);
     const map = ref(null);
     const markerPosition = ref([]); 
  
     const latitude = ref(null);
     const longitude = ref(null);
     const distanceTravel = ref(null);
     const timeTravel = ref(null);
     const location = ref(props.tourLocation);
     const polylineCoordinates = ref([]);
    const zoom = ref(null);
 
   
    //uoc tinh thoi gian giua 2 dia diem
    const getTimeTravel = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/getTimeTravel', {
      params: {
        startLat: latitude.value,         
        startLon: longitude.value,        
        endLat: markerPosition.value[0], 
        endLon: markerPosition.value[1],    
      }
    });
    console.log('data', response.data);
    if (response.data.message === 'calculate time travel sussesful') {
      timeTravel.value = response.data.data;
    }
  } catch (error) {
    console.error("Failed to retrieve coordinates:", error.response ? error.response.data.message : error.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response ? error.response.data.error : error.error,
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }
};

     //uoc tinh quang duong 2 noi
     const getDistanceTravel = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/getDistanceTravel', {
      params: {
        startLat: latitude.value,         
        startLon: longitude.value,        
        endLat: markerPosition.value[0], 
        endLon: markerPosition.value[1],    
      }
    });
    console.log('data', response.data);
      distanceTravel.value = response.data.data;
      nextTick(() => {
        updateZoomLevel();
      })
  } catch (error) {
    console.error("Failed to retrieve coordinates:", error.response ? error.response.data.message : error.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response ? error.response.data.error : error.error,
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }
};

     //doi dia diem thanh toa do
     const getCoordinates = async () => {
       try {
         const response = await axios.get('http://localhost:8000/api/coordinateConvertion', {
           params: {
             q: location.value,
           }
         });
         console.log('data', response.data);
         if (response.data.message === 'get coordinates succesful') {
           markerPosition.value = [response.data.lat, response.data.lng];
         }
         // ke duong line cua 2 vi tri
         polylineCoordinates.value = [
             markerPosition.value,
              [latitude.value,longitude.value], 
        ]
       
        nextTick(() => {
      getTimeTravel();
      getDistanceTravel();
     
    
    });
         
       } catch (error) {
         console.error("Failed to retrieve coordinates:", error.response ? error.response.data.message : error.message);
         Swal.fire({
           icon: "error",
           title: "Oops...",
           text: error.response ? error.response.data.error : error.error,
           footer: '<a href="#">Why do I have this issue?</a>',
         });
       }
     };


     const logValue = () => {
       console.log('map', map.value);
       console.log('location', location.value);
       console.log('markerPosition', markerPosition.value);
       console.log('latitude', latitude.value);
       console.log('longitude', longitude.value);
       console.log('zoom',zoom);
     };
     
   
    
     const showPosition = (position) => {
       latitude.value = position.coords.latitude;
       longitude.value = position.coords.longitude;
      
       console.log(`Position: ${latitude.value}, ${longitude.value}`);
       reverseCoordinateConvertion();
     };

     //chuyen doi toa do -> dia diem
     const reverseCoordinateConvertion = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/reverseCoordinateConvertion', {
      params: {
        lat: latitude.value,
        lng: longitude.value,
      }
    },
    getCoordinates(),

  );

   
    // console.log('reverseCoordinateConvertion response', response.data);
    
  
    if (response.data && response.data.data) {
      currentLocation.value = response.data.data;  
    } else {
      console.error('No data in response');
    }
  } catch (error) {
    console.error("Failed to reverse:", error.response ? error.response.data.message : error.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response ? error.response.data.error : error.error,
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }
}


  //lay toa do nguoi dung hien tai
  const getLocation = () => {
  if (navigator.geolocation) {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000, 
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(showPosition, showError, options);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

//dieu chinh zoom tuy thuoc vao vi tri 2 dia diem
const updateZoomLevel = () => {
 
    const distance = distanceTravel.value;
    let zoomLevel = 12; 
    if (distance < 50) {
      zoomLevel = 12;  
    } else if (distance < 500) {
      zoomLevel = 8;   
    } else if (distance < 1000) {
      zoomLevel = 4;  
    } else {
      zoomLevel = 1.5;   
    }
     zoom.value = zoomLevel;
  
}

 
     const showError = (error) => {
       switch (error.code) {
         case error.PERMISSION_DENIED:
           alert("User denied the location request.");
           break;
         case error.POSITION_UNAVAILABLE:
           alert("Location information is unavailable.");
           break;
         case error.TIMEOUT:
           alert("The location request timed out.");
           break;
         case error.UNKNOWN_ERROR:
           alert("An unknown error occurred.");
           break;
       }
     };
     onMounted(() => {
      getLocation();   
     });
     return {
       map,
       location,
       zoom,
       logValue,
       getCoordinates,
       markerPosition,
       latitude,
       longitude,
       showError,
       currentLocation,
       distanceTravel,
       timeTravel,
       getLocation,
       polylineCoordinates
     };
   },
 };
 </script>
 
 <style lang="scss" module>
 @import "./../../assets/Global.module.scss";
 @import "./Map.module.scss";
 </style>
 