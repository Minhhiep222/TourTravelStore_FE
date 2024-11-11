<template>
    <div class="container mt-4">
        <h2>Tour Guides</h2>
        <button class="btn btn-success mb-3" @click="goToAddTourGuide">Add Tour Guide</button>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>experience</th>
                    <th>Action</th>
                  
                </tr>
            </thead>
            <tbody>
                <tr v-for="(guide,index) in valueTourGuide" :key="guide.id">
                    <th>{{ index + 1 }}</th> 
                    <td>{{ guide.name }}</td>
                    <td>{{ guide.email }}</td>
                    <td>{{ guide.phone }}</td>
                    <td>{{ guide.experience }}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" @click="goToUpdateTourGuide(guide.id)">Edit</button>
                        <button class="btn btn-danger btn-sm" @click="deleteTourGuide(guide.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="errorValue" class="alert alert-danger mt-3">
            <p>Error: {{ errorValue }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
export default {
    name: 'TourGuideComponent',

    setup() {
        const valueTourGuide = ref(null);
        const errorValue = ref(null);
        const router = useRouter();
        onMounted(() => {
            getAllTourGuide();
        });
        const getAllTourGuide = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/getAllTourGuide');
                console.log('Response data:', response.data.data);
                valueTourGuide.value = response.data.data;
            } catch (error) {
                console.error('Failed to retrieve tours:', error.response.data);
                errorValue.value = error.response.data.error;
            }
        };
        const logValue = () => {
            console.log('valueTourGuide',valueTourGuide),
            console.log('errorValue',errorValue)
        }

      
        const deleteTourGuide = async (id) => {

const result = await Swal.fire({
    title: 'Bạn có chắc chắn?',
    text: "Bạn sẽ không thể khôi phục lại tour guide này!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Có, xóa!',
    cancelButtonText: 'Không, quay lại!'
});


if (result.isConfirmed) {
    try {
    const response = await axios.post(`http://localhost:8000/api/deleteTourGuide`, {
        tour_id: id, 
    });
    
    
    if (response.data.message === 'Delete successful') {
        Swal.fire({
        title: 'Đã xóa!',
        text: 'Tour guide đã được xóa thành công.',
        icon: 'success',
        confirmButtonText: 'OK'
        });
    }
    getAllTourGuide();
    
    } catch (error) {
        console.error('Delete failed:', error.response ? error.response.data : error.message);
        errorValue.value = error.response.data.error ||  error.response.data.message
    }
}}
        const goToAddTourGuide = () => {
            router.push({ name: 'AddTourGuide' });
        };
        const goToUpdateTourGuide = (id) => {
             router.push({ name: 'UpdateTourGuide', params: { id } });
        };

        return {
            valueTourGuide,
            errorValue,
            logValue,
            deleteTourGuide,
            goToAddTourGuide,
            goToUpdateTourGuide,
        };
    }
}
</script>

<style lang="scss" module>
@import './TourGuide.module.scss';
</style>
