#	Employee	Basic Salary	Allowances	PF Enabled	PF %	Loan Active	Action

<template>
    <div>
        <h1>Create Salary</h1>
        <form @submit.prevent="createSalary">
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
        <button type="submit">Create Salary</button>
        </form>
    </div>  
</template>
<script>


export default {
    data() {
        return {
            salary: {
                employee: '',
                basicSalary: 0,
                allowances: 0,
                pfEnabled: false,
                pfPercentage: 0,
                loanActive: false
            }
        };
    },
    methods: {
        createSalary() {
            // Logic to create salary record
            console.log("Salary Created:", this.salary);
            // Reset form
            this.salary = {
                employee: '',
                basicSalary: 0,
                allowances: 0,
                pfEnabled: false,
                pfPercentage: 0,
                loanActive: false
            };
        }
    }
};
</script>