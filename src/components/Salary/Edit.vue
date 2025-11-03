#	Employee	Basic Salary	Allowances	PF Enabled	PF %	Loan Active	Action
<template>
    <div>
        <h1>Edit Salary</h1>
        <form @submit.prevent="updateSalary">
        <div>
            <label for="employee">Employee:</label>
            <input type="text" v-model="salary.employee" id="employee" required />
        </div>
        <div>
            <label for="basicSalary">Basic Salary:</label>
            <input type="number" v-model="salary.basicSalary" id="basicSalary" required />
        </div>
        <div>
            <label for="allowances">Allowances:</label>
            <input type="number" v-model="salary.allowances" id="allowances" required />
        </div>
        <div>
            <label for="pfEnabled">PF Enabled:</label>
            <input type="checkbox" v-model="salary.pfEnabled" id="pfEnabled" />
        </div>
        <div>
            <label for="pfPercentage">PF %:</label>
            <input type="number" v-model="salary.pfPercentage" id="pfPercentage" :disabled="!salary.pfEnabled" />
        </div>
        <div>
            <label for="loanActive">Loan Active:</label>
            <input type="checkbox" v-model="salary.loanActive" id="loanActive" />
        </div>
        <button type="submit">Update Salary</button>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            salary: {
                id: null,
                employee: '',
                basicSalary: 0,
                allowances: 0,
                pfEnabled: false,
                pfPercentage: 0,
                loanActive: false
            }
        };
    },
    created() {
        this.fetchSalary();
    },
    methods: {
        fetchSalary() {
            // Fetch salary data based on ID (this is a placeholder)
            const salaryId = this.$route.params.id;
            // Simulated fetch
            this.salary = {
                id: salaryId,
                employee: 'John Doe',
                basicSalary: 50000,
                allowances: 10000,
                pfEnabled: true,
                pfPercentage: 12,
                loanActive: false
            };
        },
        updateSalary() {
            // Logic to update salary record
            console.log("Salary Updated:", this.salary);
            // Redirect or give feedback after update
        }
    }
};
</script>