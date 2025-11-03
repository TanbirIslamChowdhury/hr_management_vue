

    Name	Email	Phone	Branch	Department	Designation	Shift	Status	Action

<template>
    <div>
        <h1>Create Employee</h1>
        <form @submit.prevent="createEmployee">
            <div class="row">
                <div class="col-md-6">
                    <label for="name">Name:</label>
                    <input type="text" class="form-control" v-model="employee.name" id="name" required />
                </div>
                <div class="col-md-6">
                    <label for="email">Email:</label>
                    <input type="email" class="form-control" v-model="employee.email" id="email" required />
                </div>
               <div class="col-md-6">
                    <label for="phone">Phone:</label>
                    <input type="text" class="form-control" v-model="employee.phone" id="phone" required />
                </div>
                <div class="col-md-6">
                    <label for="branch">Join Date:</label>
                    <input type="date" class="form-control" v-model="employee.join_date" id="join_date" required />
                </div>
                <div class="col-md-6">
                    <label for="department">Department:</label>
                    <select class="form-control" v-model="employee.department_id" id="department" required>
                        <option value="">Select Department</option>
                        <option v-for="dept in departmentList" :key="dept.id" :value="dept.id">
                            {{ dept.name }}
                        </option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="designation">Designation:</label>
                    <select class="form-control" v-model="employee.designation_id" id="designation" required>
                        <option value="">Select Designation</option>
                        <option v-for="desig in designationList" :key="desig.id" :value="desig.id">
                            {{ desig.title }}
                        </option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="shift">Shift:</label>
                    <select class="form-control" v-model="employee.shift_id" id="shift" required>
                        <option value="">Select Shift</option>
                        <option v-for="shift in shiftList" :key="shift.id" :value="shift.id">
                            {{ shift.name }}
                        </option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="status">Status:</label>
                    <select class="form-control" v-model="employee.status" id="status" required>
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="probation">Probation</option>
                        <option value="resigned">Resigned</option>
                        <option value="terminated">Terminated</option>
                    </select>
                </div>

            </div>
        
            <button type="submit" class="btn btn-primary">Create Employee</button>
        </form>
    </div>
</template>

<script>
import DataService from "../../services/DataService";

export default {
    data() {
        return {
            designationList:[],
            departmentList:[],
            shiftList:[],
            employee: {
                 branch_id:6,
                 department_id:'',
                 designation_id:'',
                 shift_id:'',
                 name:'',
                 email:'',
                 phone:'',
                 father_name:'',
                 mother_name:'',
                 date_of_birth:'',
                 education:'',
                 skill:'',
                 join_date:'',
                 status: ''
            }
        };
    },
    mounted() {
        this.getDepartment();
        this.getDesignation();
        this.getShift();
    },
    methods: {
        getDesignation(){
            DataService.DesignationList()
            .then(response => {
                if(response.data)
                this.designationList= response.data;
                else
                alert(response.data.error)
            })
            .catch(e => {
                console.log(e);
            });
        },
        getDepartment(){
            DataService.DepartmentList()
            .then(response => {
                if(response.data)
                this.departmentList= response.data;
                else
                alert(response.data.error)
            })
            .catch(e => {
                console.log(e);
            });
        },
        getShift(){
            DataService.ShiftList()
            .then(response => {
                if(response.data)
                this.shiftList= response.data;
                else
                alert(response.data.error)
            })
            .catch(e => {
                console.log(e);
            });
        },
        createEmployee(){
            DataService.AddEmployee(this.employee)
            .then(response => {
                console.log(response.data);
                alert("Room added successfully!");
                this.$router.push({ name: 'employee' });
            })
            .catch(e => {
                console.log(e);
            });
        }
    }
};
</script>

            