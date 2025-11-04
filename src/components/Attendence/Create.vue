


Name	In Time	Out Time	Status
<template>
    <div class="row">
        <div class="col-12">
            <div class="card card-default">
                <div class="card-header">
                    <h2>Add Attendance</h2>
                </div>
                <div class="card-body">
                    <form @submit.prevent="submitAttendance">
                        <div class="form-group">
                            <label for="date">Date</label>
                            <input type="date" v-model="attendanceDate" id="date" class="form-control" required @change="checkLeaveStatus">
                        </div>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>In Time</th>
                                    <th>Out Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="employee in employees" :key="employee.id">
                                    <td>
                                        {{ employee.name }}
                                    </td>
                                    <td>
                                        <input type="time" 
                                            v-model="attendance[employee.id].check_in" 
                                            :id="'check_in_' + employee.id" 
                                            class="form-control">
                                    </td>
                                    <td>
                                        <input type="time" 
                                            v-model="attendance[employee.id].check_out" 
                                            :id="'check_out_' + employee.id" 
                                            class="form-control">
                                    </td>
                                    <td>
                                        <select 
                                            v-model="attendance[employee.id].status" 
                                            :id="'status_' + employee.id" 
                                            class="form-control" 
                                            required>
                                            <option value="0">Present</option>
                                            <option value="1">Absent</option>
                                            <option value="2">Leave</option>
                                            <option value="3">Late</option>
                                            <option value="4">Half-day</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit" class="btn btn-primary">Add Attendance</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DataService from '../../services/DataService'

export default {
    name: 'CreateAttendance',
    data() {
        return {
            attendanceDate: '',
            employees: [],
            attendance: {},
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
                    // Initialize attendance object for each employee
                    const attendanceInit = {};
                    this.employees.forEach(employee => {
                        attendanceInit[employee.id] = {
                            check_in: '',
                            check_out: '',
                            status: '0' // Default to Present
                        };
                    });
                    this.attendance = attendanceInit;
                })
                .catch(error => {
                    console.error('Error fetching employees:', error);
                });
        },
        checkLeaveStatus() {
            const date = this.attendanceDate;
            this.employees.forEach(employee => {
                DataService.checkLeaveStatus(employee.id, date)
                    .then(response => {
                        if (response.data.leave_type !== null) {
                            // Employee is on leave
                            this.attendance[employee.id].status = '2'; // Set to Leave
                            this.attendance[employee.id].check_in = '';
                            this.attendance[employee.id].check_out = '';
                        } else {
                            // Employee is not on leave
                            this.attendance[employee.id].status = '0'; // Set to Present
                        }
                    })
                    .catch(error => {
                        console.error('Error checking leave status:', error);
                    });
            });
            this.employees.forEach(employee => {
                DataService.checkAttendanceStatus(employee.id, date)
                    .then(response => {
                        if (response.data) {
                            // Employee is on leave
                            this.attendance[employee.id].status = response.data.status; // Set to Leave
                            this.attendance[employee.id].check_in = response.data.check_in;
                            this.attendance[employee.id].check_out = response.data.check_out;
                        } else {
                            // Employee is not on leave
                            this.attendance[employee.id].status = '0'; // Set to Present
                        }
                    })
                    .catch(error => {
                        console.error('Error checking leave status:', error);
                    });
            });
        },
        submitAttendance() {
            const attendanceData = {
                date: this.attendanceDate,
                attendance: Object.keys(this.attendance).map(employeeId => ({
                    employee_id: employeeId,
                    check_in: this.attendance[employeeId].check_in,
                    check_out: this.attendance[employeeId].check_out,
                    status: this.attendance[employeeId].status
                }))
            };
            

            DataService.createAttendance(attendanceData)
                .then(response => {
                    console.log('Attendance saved successfully:', response.data);
                    this.$router.push({ name: 'attendence' });
                })
                .catch(error => {
                    console.error('Error saving attendance:', error);
                });
        }
    }
};
</script>
