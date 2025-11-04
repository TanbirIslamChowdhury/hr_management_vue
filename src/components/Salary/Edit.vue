<template>
    <div class="row">
        <div class="col-12">
            <div class="card card-default">
                <div class="card-header">
                    <h2>Edit Payroll</h2>
                </div>
                <div class="card-body">
                    <form @submit.prevent="updatePayroll">
                        <!-- Employee Dropdown -->
                        <div class="form-group">
                            <label for="employee_id">Employee</label>
                            <select v-model="formData.employee_id" id="employee_id" class="form-control" required>
                                <option value="">Select Employee</option>
                                <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                                    {{ employee.name }}
                                </option>
                            </select>
                        </div>

                        <!-- Month -->
                        <div class="form-group">
                            <label for="month">Month</label>
                            <input type="text" v-model="formData.month" id="month" class="form-control" required>
                        </div>

                        <!-- Year -->
                        <div class="form-group">
                            <label for="year">Year</label>
                            <input type="number" v-model.number="formData.year" id="year" class="form-control" required>
                        </div>

                        <!-- Basic Salary -->
                        <div class="form-group">
                            <label for="basic_salary">Basic Salary</label>
                            <input type="number" step="0.01" v-model.number="formData.basic_salary" id="basic_salary" 
                                   class="form-control" required>
                        </div>

                        <!-- Allowances -->
                        <div class="form-group">
                            <label for="allowances">Allowances</label>
                            <input type="number" step="0.01" v-model.number="formData.allowances" id="allowances" 
                                   class="form-control" required>
                        </div>

                        <!-- Deductions -->
                        <div class="form-group">
                            <label for="deductions">Deductions</label>
                            <input type="number" step="0.01" v-model.number="formData.deductions" id="deductions" 
                                   class="form-control" required>
                        </div>

                        <!-- Bonuses -->
                        <div class="form-group">
                            <label for="bonuses">Bonuses</label>
                            <input type="number" step="0.01" v-model.number="formData.bonuses" id="bonuses" 
                                   class="form-control" required>
                        </div>

                        <!-- Net Salary -->
                        <div class="form-group">
                            <label for="net_salary">Net Salary</label>
                            <input type="number" step="0.01" v-model.number="formData.net_salary" id="net_salary" 
                                   class="form-control" required>
                        </div>

                        <!-- Generated At -->
                        <div class="form-group">
                            <label for="generated_at">Generated At</label>
                            <input type="datetime-local" v-model="formData.generated_at" id="generated_at" 
                                   class="form-control">
                        </div>

                        <button type="submit" class="btn btn-primary" :disabled="loading">
                            {{ loading ? 'Updating...' : 'Update Payroll' }}
                        </button>
                        <router-link to="/salary" class="btn btn-secondary ml-2">Cancel</router-link>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DataService from '../../services/DataService'

export default {
    name: 'EditPayroll',
    data() {
        return {
            formData: {
                employee_id: '',
                month: '',
                year: '',
                basic_salary: 0,
                allowances: 0,
                deductions: 0,
                bonuses: 0,
                net_salary: 0,
                generated_at: ''
            },
            employees: [],
            loading: false
        }
    },
    created() {
        this.fetchPayrollData();
        this.fetchEmployees();
    },
    methods: {
        fetchPayrollData() {
            const payrollId = this.$route.params.id;
            if (!payrollId) {
                alert('Payroll ID is missing');
                this.$router.push({ name: 'salary' });
                return;
            }

            this.loading = true;
            DataService.getPayroll(payrollId)
                .then(response => {
                    const payroll = response.data;
                    this.formData = {
                        employee_id: payroll.employee_id || '',
                        month: payroll.month || '',
                        year: payroll.year || '',
                        basic_salary: payroll.basic_salary || 0,
                        allowances: payroll.allowances || 0,
                        deductions: payroll.deductions || 0,
                        bonuses: payroll.bonuses || 0,
                        net_salary: payroll.net_salary || 0,
                        generated_at: payroll.generated_at ? this.formatDateTimeLocal(payroll.generated_at) : ''
                    };
                    this.loading = false;
                })
                .catch(error => {
                    console.error('Error fetching payroll:', error);
                    alert('Error loading payroll data');
                    this.loading = false;
                    this.$router.push({ name: 'salary' });
                });
        },
        fetchEmployees() {
            DataService.EmployeeList()
                .then(response => {
                    this.employees = response.data || [];
                })
                .catch(error => {
                    console.error('Error fetching employees:', error);
                });
        },
        formatDateTimeLocal(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        },
        updatePayroll() {
            if (this.loading) return;

            this.loading = true;
            const payrollId = this.$route.params.id;
            
            // Add _method for Laravel to recognize PUT request via POST
            const updateData = {
                ...this.formData,
                _method: 'PUT'
            };
            
            DataService.updatePayroll(payrollId, updateData)
                .then(response => {
                    console.log('Payroll updated successfully:', response.data);
                    alert('Payroll updated successfully');
                    this.$router.push({ name: 'salary' });
                })
                .catch(error => {
                    console.error('Error updating payroll:', error);
                    alert('Error updating payroll. Please try again.');
                    this.loading = false;
                });
        }
    }
}
</script>
