#	Employee	Basic Salary	Allowances	PF Enabled	PF %	Loan Active	Action

salary list
<template>
    <div>
        <h1>Salary List</h1>
        <table class="table table-hover table-product">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Employee</th>
                    <th>Basic Salary</th>
                    <th>Allowances</th>
                    <th>PF Enabled</th>
                    <th>PF %</th>
                    <th>Loan Active</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(salary, index) in salaries" :key="salary.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ salary.employee }}</td>
                    <td>{{ salary.basicSalary }}</td>
                    <td>{{ salary.allowances }}</td>
                    <td>{{ salary.pfEnabled ? 'Yes' : 'No' }}</td>
                    <td>{{ salary.pfPercentage }}</td>
                    <td>{{ salary.loanActive ? 'Yes' : 'No' }}</td>
                    <td>
                        <button class="btn btn-info" @click="editSalary(salary.id)">Edit</button>
                        <button class="btn btn-danger" @click="deleteSalary(salary.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            salaries: [],
        };
    },
    created() {
        this.fetchSalaries();
    },
    methods: {
        fetchSalaries() {
            // Fetch salary data from an API or data source
            // This is a placeholder for demonstration purposes
            this.salaries = [
                { id: 1, employee: 'John Doe', basicSalary: 50000, allowances: 10000, pfEnabled: true, pfPercentage: 12, loanActive: false },
                { id: 2, employee: 'Jane Smith', basicSalary: 60000, allowances: 15000, pfEnabled: false, pfPercentage: 0, loanActive: true },
            ];
        },
        editSalary(id) {
            // Logic to navigate to edit salary page
            this.$router.push({ name: 'EditSalary', params: { id } });
        },
        deleteSalary(id) {
            // Logic to delete salary record
            this.salaries = this.salaries.filter(salary => salary.id !== id);
        },
    },
};
</script>
