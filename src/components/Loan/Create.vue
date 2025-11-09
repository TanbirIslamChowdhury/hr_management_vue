
<template>
    <div>
        <h1>Create Loan</h1>
        <form @submit.prevent="createLoan">
            <div class="row">
                <div class="form-group">
                    <label for="employee_id">Employee</label>
                    <select v-model="formData.employee_id" id="employee_id" class="form-control" required>
                        <option value="">Select Employee</option>
                        <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                            {{ employee.name }}
                        </option>
                    </select>
                </div>

                <div class="col-md-6">
                    <label for="name">Loan Amount</label>
                    <input type="text" class="form-control" v-model="formData.loan_amount" id="loan_amount" required />
                </div>
                <div class="col-md-6">
                    <label for="email">Number of Installments</label>
                    <input type="text" class="form-control" v-model="formData.number_of_installment" id="number_of_installment" required />
                </div>
               <div class="col-md-6">
                    <label for="phone">Monthly Installment</label>
                    <input type="text" class="form-control" v-model="formData.monthly_installment" id="phone" required />
                </div>
                <div class="col-md-6">
                    <label for="branch">Start Date</label>
                    <input type="date" class="form-control" v-model="formData.start_date" id="start_date" required />
                </div>

                <div class="col-md-6">
                    <label for="branch">Finish Date</label>
                    <input type="date" class="form-control" v-model="formData.finish_date" id="finish_date" required />
                </div>
                
               
                <div class="col-md-6">
                    <label for="status">Status:</label>
                    <select class="form-control" v-model="formData.status" id="status" required>
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

            </div>
        
            <button type="submit" class="btn btn-primary">Create Loan</button>
        </form>
    </div>
    
</template>

<script>
import DataService from "../../services/DataService";

export default {
    data() {
        return {
            employees:[],
            formData: {
                 loan_amount:'',
                 number_of_installment:'',
                 monthly_installment:'',
                 remaining_balance:'',
                 start_date:'',
                 finish_date:'',
                 status: ''
            }
        };
    },
    mounted() {
        this.getemployee();
    },
    methods: {
        getemployee(){
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
        },
        
       
        createLoan(){
            DataService.createLoan(this.formData)
            .then(response => {
                console.log(response.data);
                alert("Room added successfully!");
                this.$router.push({ name: 'loan' });
            })
            .catch(e => {
                console.log(e);
            });
        }
    }
};
</script>

            