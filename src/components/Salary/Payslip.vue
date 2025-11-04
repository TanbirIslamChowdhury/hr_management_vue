<template>
    <div class="payslip-container" v-if="payroll">
        <button @click="printPayslip" class="print-button no-print">Print Payslip</button>
        
        <div class="container">
            <div class="header">
                <h1>PAYSLIP</h1>
                <h3>{{ getMonthYear() }}</h3>
            </div>

            <div class="company-info">
                <h2>Company Name</h2>
                <p>Address Line 1</p>
                <p>Address Line 2</p>
                <p>Phone: (123) 456-7890</p>
            </div>

            <div class="employee-info">
                <table width="100%">
                    <tr>
                        <td width="50%">
                            <strong>Employee Name:</strong> {{ payroll.employee?.name || 'N/A' }}<br>
                            <strong>Employee ID:</strong> {{ payroll.employee?.employee_id || 'N/A' }}<br>
                            <strong>Department:</strong> {{ payroll.employee?.department?.name || 'N/A' }}<br>
                            <strong>Designation:</strong> {{ payroll.employee?.designation?.name || 'N/A' }}
                        </td>
                        <td width="50%" style="text-align: right">
                            <strong>Payslip #:</strong> {{ payroll.id }}<br>
                            <strong>Payment Date:</strong> {{ formatDate(payroll.created_at) }}<br>
                            <strong>Payment Status:</strong> {{ getPaymentStatus(payroll.payment_status) }}
                        </td>
                    </tr>
                </table>
            </div>

            <table class="salary-details">
                <tr>
                    <th colspan="2">Earnings</th>
                    <th colspan="2">Deductions</th>
                </tr>
                <tr>
                    <td>Basic Salary</td>
                    <td class="text-right">{{ formatCurrency(payroll.basic_salary) }}</td>
                    <td>Absent Deductions</td>
                    <td class="text-right">{{ formatCurrency(payroll.deduction_for_absent) }}</td>
                </tr>
                <tr>
                    <td>Allowances</td>
                    <td class="text-right">{{ formatCurrency(payroll.allowances) }}</td>
                    <td>Loan Deduction</td>
                    <td class="text-right">{{ formatCurrency(payroll.loan_deduction) }}</td>
                </tr>
                <tr>
                    <td>Bonuses</td>
                    <td class="text-right">{{ formatCurrency(payroll.bonuses) }}</td>
                    <td>Other Deductions</td>
                    <td class="text-right">{{ formatCurrency(payroll.deductions) }}</td>
                </tr>
                <tr>
                    <th>Total Earnings</th>
                    <th class="text-right">{{ formatCurrency(getTotalEarnings()) }}</th>
                    <th>Total Deductions</th>
                    <th class="text-right">{{ formatCurrency(getTotalDeductions()) }}</th>
                </tr>
            </table>

            <div class="net-salary">
                <strong>Net Salary:</strong> 
                <h2 style="margin: 0">{{ formatCurrency(payroll.net_salary) }}</h2>
            </div>

            <div v-if="payroll.remarks" style="margin-top: 20px">
                <strong>Remarks:</strong>
                <p>{{ payroll.remarks }}</p>
            </div>

            <div class="footer">
                <p>This is a computer generated payslip and does not require signature.</p>
            </div>
        </div>

        <div v-if="loading" class="loading-container">
            <p>Loading payslip...</p>
        </div>
    </div>
</template>

<script>
import DataService from '../../services/DataService'

export default {
    name: 'Payslip',
    data() {
        return {
            payroll: null,
            loading: false
        }
    },
    created() {
        this.fetchPayrollData();
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
                    this.payroll = response.data;
                    this.loading = false;
                })
                .catch(error => {
                    console.error('Error fetching payroll:', error);
                    alert('Error loading payslip data');
                    this.loading = false;
                    this.$router.push({ name: 'salary' });
                });
        },
        getMonthYear() {
            if (!this.payroll) return '';
            const months = [
                '', 'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            return `${months[this.payroll.month] || this.payroll.month} ${this.payroll.year}`;
        },
        formatDate(dateString) {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
        formatCurrency(amount) {
            if (amount === null || amount === undefined) return '0.00';
            return parseFloat(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        getPaymentStatus(status) {
            return status == 1 ? 'Paid' : 'Unpaid';
        },
        getTotalEarnings() {
            if (!this.payroll) return 0;
            return (parseFloat(this.payroll.basic_salary) || 0) + 
                   (parseFloat(this.payroll.allowances) || 0) + 
                   (parseFloat(this.payroll.bonuses) || 0);
        },
        getTotalDeductions() {
            if (!this.payroll) return 0;
            return (parseFloat(this.payroll.deduction_for_absent) || 0) + 
                   (parseFloat(this.payroll.loan_deduction) || 0) + 
                   (parseFloat(this.payroll.deductions) || 0);
        },
        printPayslip() {
            window.print();
        }
    }
}
</script>

<style scoped>
@media print {
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
    }
    .no-print {
        display: none !important;
    }
    .page-break {
        page-break-after: always;
    }
}

.payslip-container {
    font-family: Arial, sans-serif;
}

@media screen {
    .payslip-container {
        background-color: #f0f0f0;
        padding: 20px;
        min-height: 100vh;
    }
}

.container {
    max-width: 800px;
    margin: auto;
    background-color: white;
    padding: 40px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

@media print {
    .container {
        box-shadow: none;
        padding: 20px;
    }
}

.header {
    text-align: center;
    margin-bottom: 30px;
}

.header h1 {
    margin: 0;
    font-size: 2em;
    color: #333;
}

.header h3 {
    margin: 10px 0 0 0;
    font-size: 1.2em;
    color: #666;
}

.company-info {
    margin-bottom: 20px;
    text-align: center;
}

.company-info h2 {
    margin: 0 0 10px 0;
    color: #333;
}

.company-info p {
    margin: 5px 0;
    color: #666;
}

.employee-info {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 4px;
}

.employee-info table {
    width: 100%;
}

.employee-info td {
    padding: 5px 0;
    color: #333;
}

.salary-details {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.salary-details th,
.salary-details td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
}

.salary-details th {
    background-color: #f5f5f5;
    font-weight: bold;
}

.text-right {
    text-align: right;
}

.net-salary {
    text-align: right;
    font-size: 1.2em;
    margin-top: 20px;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 4px;
}

.net-salary h2 {
    color: #007bff;
    font-weight: bold;
}

.footer {
    margin-top: 40px;
    text-align: center;
    color: #666;
    font-size: 0.9em;
}

.print-button {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.print-button:hover {
    background-color: #0056b3;
}

.loading-container {
    text-align: center;
    padding: 40px;
    font-size: 1.2em;
    color: #666;
}
</style>
