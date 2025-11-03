Attendence list component
ID	Date	Action
<template>
    <div>
        <h1>Attendence List</h1>
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
            // Fetch attendence data from an API or data source
            // This is a placeholder for demonstration purposes
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