<template>
    <div class="row">
        <div class="col-12">
            <div class="card card-default">
                <div class="card-header">
                    <h2>Payroll List</h2>
                    <router-link class="btn btn-primary btn-sm" :to="{ name: 'salaryCreate' }">Add Payroll</router-link>
                </div>
                <div class="card-body">
                    <table id="payrollTable" class="table table-hover table-product" style="width:100%">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Employee</th>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Basic Salary</th>
                                <th>Absent</th>
                                <th>Absent Deductions</th>
                                <th>Loan Deductions</th>
                                <th>Allowances</th>
                                <th>Bonuses</th>
                                <th>Net Salary</th>
                                <th>Payment Status</th>
                                <th>Status</th>
                                <th>Remarks</th>
                                <th>Generated</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading">
                                <td colspan="16" class="text-center">Loading...</td>
                            </tr>
                            <template v-else>
                                <tr v-for="payroll in payrolls" :key="payroll.id">
                                    <td>{{ payroll.id }}</td>
                                    <td>{{ payroll.employee?.name || 'N/A' }}</td>
                                    <td>{{ getMonthName(payroll.month) }}</td>
                                    <td>{{ payroll.year }}</td>
                                    <td>{{ payroll.basic_salary }}</td>
                                    <td>{{ payroll.total_absent }}</td>
                                    <td>{{ payroll.deduction_for_absent }}</td>
                                    <td>{{ payroll.loan_deduction }}</td>
                                    <td>{{ payroll.allowances }}</td>
                                    <td>{{ payroll.bonuses }}</td>
                                    <td>{{ payroll.net_salary }}</td>
                                    <td>{{ getPaymentStatus(payroll.payment_status) }}</td>
                                    <td>{{ getStatus(payroll.status) }}</td>
                                    <td>{{ payroll.remarks || '-' }}</td>
                                    <td>{{ formatDate(payroll.created_at) }}</td>
                                <td>
                                    <div class="dropdown">
                                        <button 
                                            type="button" 
                                            class="btn btn-sm btn-info dropdown-toggle" 
                                            @click="toggleDropdown(payroll.id)"
                                            :aria-expanded="openDropdowns[payroll.id] ? 'true' : 'false'">
                                            Actions
                                        </button>
                                        <div 
                                            class="dropdown-menu" 
                                            :class="{ show: openDropdowns[payroll.id] }"
                                            v-show="openDropdowns[payroll.id]"
                                            @click.stop>
                                            <a class="dropdown-item" href="#" @click.prevent="closeDropdown(payroll.id); showPayroll(payroll.id)">Show</a>
                                            <a class="dropdown-item" href="#" @click.prevent="closeDropdown(payroll.id); editPayroll(payroll.id)">Edit</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item text-danger" href="#" @click.prevent="closeDropdown(payroll.id); deletePayroll(payroll.id)">Delete</a>
                                        </div>
                                    </div>
                                </td>
                                </tr>
                            </template>
                            <tr v-if="!loading && payrolls.length === 0">
                                <td colspan="16" class="text-center">No Payroll Records Found</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DataService from '../../services/DataService'

export default {
    name: 'PayrollList',
    data() {
        return {
            payrolls: [],
            loading: false,
            openDropdowns: {}
        }
    },
    created() {
        this.fetchPayrolls();
        // Close dropdowns when clicking outside
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        // Clean up event listener
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        fetchPayrolls() {
            // Prevent multiple simultaneous calls
            if (this.loading) return;
            
            this.loading = true;
            DataService.payrollList()
                .then(response => {
                    this.payrolls = response.data || [];
                    this.loading = false;
                })
                .catch(error => {
                    console.error('Error fetching payrolls:', error);
                    this.payrolls = [];
                    this.loading = false;
                });
        },
        getMonthName(month) {
            const months = [
                '', 'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            return months[month] || month;
        },
        getPaymentStatus(status) {
            return status == 1 ? 'Paid' : 'Unpaid';
        },
        getStatus(status) {
            return status == 1 ? 'Hold' : 'Regular';
        },
        formatDate(dateString) {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const month = monthNames[date.getMonth()];
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${day} ${month} ${year} ${hours}:${minutes}`;
        },
        showPayroll(id) {
            // Navigate to payslip page
            this.$router.push({ name: 'payslip', params: { id } }).catch(err => {
                console.error('Navigation error:', err);
            });
        },
        editPayroll(id) {
            // Navigate to edit payroll page
            this.$router.push({ name: 'editPayroll', params: { id } }).catch(err => {
                console.error('Navigation error:', err);
            });
        },
        deletePayroll(id) {
            if (confirm('Are you sure you want to delete this payroll record?')) {
                DataService.deletePayroll(id)
                    .then(response => {
                        console.log('Payroll deleted successfully:', response.data);
                        // Remove from local list
                        this.payrolls = this.payrolls.filter(p => p.id !== id);
                        alert('Payroll deleted successfully');
                    })
                    .catch(error => {
                        console.error('Error deleting payroll:', error);
                        alert('Error deleting payroll. Please try again.');
                    });
            }
        },
        toggleDropdown(id) {
            // Close all other dropdowns
            Object.keys(this.openDropdowns).forEach(key => {
                if (key != id) {
                    this.openDropdowns[key] = false;
                }
            });
            // Toggle current dropdown
            this.openDropdowns[id] = !this.openDropdowns[id];
        },
        closeDropdown(id) {
            this.openDropdowns[id] = false;
        },
        handleClickOutside(event) {
            // Close all dropdowns if clicking outside
            if (!event.target.closest('.dropdown')) {
                Object.keys(this.openDropdowns).forEach(key => {
                    this.openDropdowns[key] = false;
                });
            }
        }
    }
}
</script>

<style scoped>
.dropdown {
    position: relative;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    min-width: 10rem;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 0.25rem;
}

.dropdown-menu.show {
    display: block;
}

.dropdown-item {
    display: block;
    width: 100%;
    padding: 0.25rem 1rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
}

.dropdown-item:hover {
    color: #1e2125;
    background-color: #e9ecef;
}

.dropdown-item.text-danger {
    color: #dc3545;
}

.dropdown-item.text-danger:hover {
    color: #fff;
    background-color: #dc3545;
}

.dropdown-divider {
    height: 0;
    margin: 0.5rem 0;
    overflow: hidden;
    border-top: 1px solid rgba(0,0,0,.15);
}
</style>
