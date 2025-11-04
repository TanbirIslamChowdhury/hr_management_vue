<template>
    <div class="row">
        <div class="col-12">
            <div class="card card-default">
                <div class="card-header">
                    <h2>Add Payroll</h2>
                </div>
                <div class="card-body">
                    <form @submit.prevent="createPayroll">
                        <!-- Month -->
                        <div class="form-group">
                            <label for="month">Month</label>
                            <select v-model="formData.month" id="month" class="form-control" required @change="updateAbsentDays">
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>

                        <!-- Year -->
                        <div class="form-group">
                            <label for="year">Year</label>
                            <input type="number" v-model.number="formData.year" id="year" class="form-control" required @change="updateAbsentDays">
                        </div>

                        <table class="table">
                            <tr>
                                <th>Employee</th>
                                <th>Basic Salary</th>
                                <th>Absent</th>
                                <th>Absent deduction</th>
                                <th>Loan deduction</th>
                                <th>Allowances</th>
                                <th>Deductions</th>
                                <th>Bonuses</th>
                                <th>Net Salary</th>
                                <th>Payment Status</th>
                                <th>Status</th>
                                <th>Remarks</th>
                            </tr>
                            <template v-if="employees.length > 0">
                                <tr v-for="employee in employees" :key="employee.id">
                                    <td>{{ employee.name }}</td>
                                <td>
                                    <input 
                                        @change="calculateNetSalary(employee.id)" 
                                        type="text" 
                                        v-model="payrollData[employee.id].basic_salary" 
                                        :name="`basic_salary_${employee.id}`"
                                        class="form-control" 
                                        required>
                                </td>
                                <td>
                                    <input 
                                        @change="calculateNetSalary(employee.id)" 
                                        type="text" 
                                        v-model="payrollData[employee.id].total_absent" 
                                        :name="`total_absent_${employee.id}`"
                                        class="form-control" 
                                        value="0" 
                                        required>
                                </td>
                                <td>
                                    <input 
                                        @change="calculateNetSalary(employee.id)" 
                                        type="text" 
                                        v-model="payrollData[employee.id].deduction_for_absent" 
                                        :name="`deduction_for_absent_${employee.id}`"
                                        class="form-control" 
                                        value="0" 
                                        required>
                                </td>
                                <td>
                                    <input 
                                        @change="calculateNetSalary(employee.id)" 
                                        type="text" 
                                        v-model="payrollData[employee.id].loan_deduction" 
                                        :name="`loan_deduction_${employee.id}`"
                                        class="form-control" 
                                        value="0" 
                                        required>
                                </td>
                                <td>
                                    <input 
                                        @change="calculateNetSalary(employee.id)" 
                                        type="text" 
                                        v-model="payrollData[employee.id].allowances" 
                                        :name="`allowances_${employee.id}`"
                                        step="0.01" 
                                        class="form-control" 
                                        value="0">
                                </td>
                                <td>
                                    <input 
                                        @change="calculateNetSalary(employee.id)" 
                                        type="text" 
                                        v-model="payrollData[employee.id].deductions" 
                                        :name="`deductions_${employee.id}`"
                                        step="0.01" 
                                        class="form-control" 
                                        value="0">
                                </td>
                                <td>
                                    <input 
                                        @change="calculateNetSalary(employee.id)" 
                                        type="text" 
                                        v-model="payrollData[employee.id].bonuses" 
                                        :name="`bonuses_${employee.id}`"
                                        step="0.01" 
                                        class="form-control" 
                                        value="0">
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        v-model="payrollData[employee.id].net_salary" 
                                        :name="`net_salary_${employee.id}`"
                                        step="0.01" 
                                        class="form-control" 
                                        required
                                        readonly>
                                </td>
                                <td>
                                    <select 
                                        v-model="payrollData[employee.id].payment_status" 
                                        :name="`payment_status_${employee.id}`"
                                        class="form-control" 
                                        required>
                                        <option value="0">Unpaid</option>
                                        <option value="1">Paid</option>
                                    </select>
                                </td>
                                <td>
                                    <select 
                                        v-model="payrollData[employee.id].status" 
                                        :name="`status_${employee.id}`"
                                        class="form-control" 
                                        required>
                                        <option value="0">Regular</option>
                                        <option value="1">Hold</option>
                                    </select>
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        v-model="payrollData[employee.id].remarks" 
                                        :name="`remarks_${employee.id}`"
                                        class="form-control">
                                </td>
                                </tr>
                            </template>
                            <tr v-if="employees.length === 0">
                                <td colspan="12" class="text-center">No employees found.</td>
                            </tr>
                        </table>
                        
                        <button type="submit" class="btn btn-primary">Add Payroll</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DataService from '../../services/DataService'

export default {
    name: 'CreatePayroll',
    data() {
        const currentYear = new Date().getFullYear();
        return {
            employees: [],
            formData: {
                month: new Date().getMonth() + 1, // Current month (1-12)
                year: currentYear
            },
            currentYear: currentYear,
            payrollData: {}
        }
    },
    created() {
        this.fetchEmployees();
    },
    methods: {
        fetchEmployees() {
            DataService.EmployeeList()
                .then(response => {
                    this.employees = response.data;
                    // Initialize payroll data for each employee
                    const payrollInit = {};
                    this.employees.forEach(employee => {
                        payrollInit[employee.id] = {
                            basic_salary: employee.salary?.basic_salary || 0,
                            total_absent: 0,
                            deduction_for_absent: 0,
                            loan_deduction: employee.active_loan?.monthly_installment || 0,
                            allowances: 0,
                            deductions: 0,
                            bonuses: 0,
                            net_salary: 0,
                            payment_status: '0',
                            status: '0',
                            remarks: ''
                        };
                    });
                    this.payrollData = payrollInit;
                    // Load absent days and loan deductions on initial load
                    this.updateAbsentDays();
                })
                .catch(error => {
                    console.error('Error fetching employees:', error);
                });
        },
        async fetchEmployeeAbsent(employeeId, month, year) {
            try {
                const response = await DataService.getEmployeeAbsent(employeeId, month, year);
                return response.data.absent_days || 0;
            } catch (error) {
                console.error('Error fetching absent days:', error);
                return 0;
            }
        },
        async fetchLoanInstallment(employeeId, month, year) {
            try {
                const response = await DataService.getMonthlyLoanDeduction(employeeId, month, year);
                return response.data.loan_deduction || 0;
            } catch (error) {
                console.error('Error fetching loan installment:', error);
                return 0;
            }
        },
        async updateAbsentDays() {
            const month = this.formData.month;
            const year = this.formData.year;

            for (const employee of this.employees) {
                const employeeId = employee.id;
                
                // Fetch absent days
                const absentDays = await this.fetchEmployeeAbsent(employeeId, month, year);
                
                // Fetch loan deduction
                const loanDeduction = await this.fetchLoanInstallment(employeeId, month, year);
                
                // Update loan deduction
                if (this.payrollData[employeeId]) {
                    this.payrollData[employeeId].loan_deduction = loanDeduction;
                    
                    // Update absent days
                    this.payrollData[employeeId].total_absent = absentDays;
                    
                    // Calculate absent deduction
                    const basicSalary = parseFloat(this.payrollData[employeeId].basic_salary) || 0;
                    const perDaySalary = basicSalary / 30; // Assuming 30 days in a month
                    const deduction = perDaySalary * absentDays;
                    this.payrollData[employeeId].deduction_for_absent = deduction.toFixed(2);
                    
                    // Recalculate net salary
                    this.calculateNetSalary(employeeId);
                }
            }
        },
        calculateNetSalary(empId) {
            if (!this.payrollData[empId]) return;
            
            // Get all input values
            const basic_salary = parseFloat(this.payrollData[empId].basic_salary) || 0;
            const deduction_for_absent = parseFloat(this.payrollData[empId].deduction_for_absent) || 0;
            const loan_deduction = parseFloat(this.payrollData[empId].loan_deduction) || 0;
            const allowances = parseFloat(this.payrollData[empId].allowances) || 0;
            const deductions = parseFloat(this.payrollData[empId].deductions) || 0;
            const bonuses = parseFloat(this.payrollData[empId].bonuses) || 0;

            // Calculate net salary
            const net_salary = basic_salary - deduction_for_absent - loan_deduction + allowances - deductions + bonuses;

            // Update net salary
            this.payrollData[empId].net_salary = net_salary.toFixed(2);
        },
        createPayroll() {
            // Prepare form data in the format expected by Laravel
            const submitData = {
                month: this.formData.month,
                year: this.formData.year
            };

            // Add employee-specific data
            this.employees.forEach(employee => {
                const empId = employee.id;
                submitData[`basic_salary_${empId}`] = this.payrollData[empId].basic_salary;
                submitData[`total_absent_${empId}`] = this.payrollData[empId].total_absent;
                submitData[`deduction_for_absent_${empId}`] = this.payrollData[empId].deduction_for_absent;
                submitData[`loan_deduction_${empId}`] = this.payrollData[empId].loan_deduction;
                submitData[`allowances_${empId}`] = this.payrollData[empId].allowances;
                submitData[`deductions_${empId}`] = this.payrollData[empId].deductions;
                submitData[`bonuses_${empId}`] = this.payrollData[empId].bonuses;
                submitData[`net_salary_${empId}`] = this.payrollData[empId].net_salary;
                submitData[`payment_status_${empId}`] = this.payrollData[empId].payment_status;
                submitData[`status_${empId}`] = this.payrollData[empId].status;
                submitData[`remarks_${empId}`] = this.payrollData[empId].remarks;
            });

            DataService.createPayroll(submitData)
                .then(response => {
                    console.log('Payroll created successfully:', response.data);
                    // Redirect to payroll list or show success message
                    this.$router.push({ name: 'salary' });
                })
                .catch(error => {
                    console.error('Error creating payroll:', error);
                    alert('Error creating payroll. Please try again.');
                });
        }
    }
}
</script>
