Attendence list component
ID	Date	Action
<template>
    <div>
        <h1>Attendence List</h1>
        <router-link class="btn btn-primary mb-3" :to="{ name: 'attendenceCreate' }">Create Employee</router-link>
        <table class="table table-hover table-product">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="attendence in attendences" :key="attendence.id">
                    <td>{{ attendence.id }}</td>
                    <td>{{ attendence.date }}</td>
                    <td>
                        <button class="btn btn-info" @click="editAttendence(attendence.id)">Edit</button>
                        <button class="btn btn-danger" @click="deleteAttendence(attendence.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import DataService from '../../services/DataService'
export default {
    name: "AttendenceList",
    data() {
        return {
            attendences: [],
        };
    },
    created() {
        this.fetchAttendences();
    },
    methods: {
        fetchAttendences() {
            DataService.attendanceList()
            .then(response => {
                if(response.data)
                this.attendences= response.data;
                else
                alert(response.data.error)
            })
            .catch(e => {
                console.log(e);
            });
            this.attendences = [
                { id: 1, date: '2024-01-01' },
                { id: 2, date: '2024-01-02' },
            ];
        },
        editAttendence(id) {
            // Logic to navigate to edit attendence page
            this.$router.push({ name: 'EditAttendence', params: { id } });
        },
        deleteAttendence(id) {
            // Logic to delete attendence
            this.attendences = this.attendences.filter(attendence => attendence.id !== id);
        },
    },
};
</script>