Name	Email	Phone	Branch	Department	Designation	Shift	Status	Action


<template>
  <div>
        <h1>Employee List</h1>
    <router-link class="btn btn-primary mb-3" :to="{ name: 'EmployeeCreate' }">Create Employee</router-link>
    <table class="table table-hover table-product">
        <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Branch</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Shift</th>
            <th>Status</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="employee in employees" :key="employee.id">
            <td>{{ employee.id }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.phone }}</td>
            <td>{{ employee.branch.branch_name }}</td>
            <td>{{ employee.department.name }}</td>
            <td>{{ employee.designation.title }}</td>
            <td>{{ employee.shift.name }}</td>
            <td>{{ employee.status }}</td>
            <td>
                <button  class="btn btn-info" @click="editEmployee(employee.id)">Edit</button>
                <button class="btn btn-danger" @click="deleteEmployee(employee.id)">Delete</button>
            </td>
            </tr>
        </tbody>
  </table>

  </div>
</template>
<script>
import DataService from "../../services/DataService";
export default {
  name: "EmployeeList",
  data() {
    return {
      employees: [],
    };
  },
  created() {
    this.fetchEmployees();
  },
  methods: {
    fetchEmployees() {
      DataService.EmployeeList()
            .then(response => {
                if(response.data)
                this.employees= response.data;
                else
                alert(response.data.error)
            })
            .catch(e => {
                console.log(e);
            });
      // Fetch employee data from an API or data source
      // This is a placeholder for demonstration purposes
      // this.employees = [
      //   { id: 1, name: "John Doe", email: " ", phone: "1234567890", branch: "HQ", department: "Sales", designation: "Manager", shift: "Morning", status: "Active" },
      //   { id: 2, name: "Jane Smith", email: " ", phone: "0987654321", branch: "Branch1", department: "Marketing", designation: "Executive", shift: "Evening", status: "Inactive" },
      //   ];
    },
    editEmployee(id) {
      this.$router.push({ name: "EmployeeEdit", params: { id } });
    },
    deleteEmployee(id) {
      this.employees = this.employees.filter(employee => employee.id !== id);
    },
    },
};
</script>