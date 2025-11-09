Name	Email	Phone	Branch	Department	Designation	Shift	Status	Action

<template>
    <div>
        <h1>Edit Employee</h1>
        <form @submit.prevent="updateEmployee">
        <div>
            <label for="name">Name:</label>
            <input type="text" v-model="employee.name" id="name" required />
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" v-model="employee.email" id="email" required />
        </div>
        <div>
            <label for="phone">Phone:</label>
            <input type="text" v-model="employee.phone" id="phone" required />
        </div>
        <div>
            <label for="branch">Branch:</label>
            <input type="text" v-model="employee.branch" id="branch" required />
        </div>
        <div>
            <label for="department">Department:</label>
            <input type="text" v-model="employee.department" id="department" required />
        </div>
        <div>
            <label for="designation">Designation:</label>
            <input type="text" v-model="employee.designation" id="designation" required />
        </div>
        <div>
            <label for="shift">Shift:</label>
            <input type="text" v-model="employee.shift" id="shift" required />
        </div>
        <div>
            <label for="status">Status:</label>
            <input type="text" v-model="employee.status" id="status" required />
        </div>
        <button type="submit">Update Employee</button>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            employee: {
                id: null,
                name: '',
                email: '',
                phone: '',
                branch: '',
                department: '',
                designation: '',
                shift: '',
                status: ''
            }
        };
    },
    created() {
        const employeeId = this.$route.params.id;
        this.fetchEmployee(employeeId);
    },
    methods: {
        fetchEmployee(id) {
            // Fetch employee data by ID (mocked here for simplicity)
            const mockData = {
                1: { id: 1, name: 'John Doe', email: '', phone: '123-456-7890', branch: 'New York', department: 'Sales', designation: 'Manager', shift: 'Morning', status: 'Active' },
                2: { id: 2, name: 'Jane Smith', email: '', phone: '987-654-3210', branch: 'Los Angeles', department: 'Marketing', designation: 'Executive', shift: 'Evening', status: 'Inactive' }
            };
            const employeeData = mockData[id];
            if (employeeData) {
                this.employee = employeeData;
            } else {
                console.error('Employee not found');
            }
        },
        updateEmployee() {
            // Logic to update employee goes here
            console.log('Employee Updated:', this.employee);
            // Redirect or give feedback as needed
        }
        
    }
};
</script>

