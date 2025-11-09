Name	Email	Phone	Branch	Department	Designation	Shift	Status	Action


<template>
  <div>
        <h1>Loan List</h1>
    <router-link class="btn btn-primary mb-3" :to="{ name: 'loanCreate' }">Create Loan</router-link>
    <table class="table table-hover table-product">
        <thead>
            <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Employee Phone</th>
            <th>Loan Amount</th>
            <th>Number of Installments</th>
            <th>Monthly Installmentt</th>
            <th>Remaining Balance</th>
            <th>Start Date</th>
            <th>Finish_date </th>
            <th>Status</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="l in loans" :key="l.id">
            <td>{{ l.id }}</td>
            <td>{{ l.employee.name }}</td>
            <td>{{ l.employee.phone }}</td>
            <td>{{ l.loan_amount }}</td>
            <td>{{ l.number_of_installment }}</td>
            <td>{{ l.monthly_installment }}</td>
            <td>{{ l.remaining_balance }}</td>
            <td>{{ l.start_date }}</td>
            <td>{{ l.finish_date }}</td>
            <td>{{ l.status }}</td>
            <td>
                <button  class="btn btn-info" @click="editLoan(l.id)">Edit</button>
                <button class="btn btn-danger" @click="deleteLoan(l.id)">Delete</button>
            </td>
            </tr>
        </tbody>
  </table>

  </div>
</template>
<script>
import DataService from "../../services/DataService";
export default {
  name: "LoanList",
  data() {
    return {
      loans: [],
    };
  },
  created() {
    this.fetchLoan();
  },
  methods: {
    fetchLoan() {
      DataService.LoanList()
            .then(response => {
                if(response.data)
                this.loans= response.data;
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
    editLoan(id) {
      this.$router.push({ name: "LoanEdit", params: { id } });
    },
    deleteLoan(id) {
      this.loans = this.loans.filter(loan => loan.id !== id);
    },
    },
};
</script>