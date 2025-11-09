import http from "../http-common";

class DataService {
  login(data) {
    return http.post("/login", data);
  }
  EmployeeList() {
    return http.get("/employee");
  }
  checkLeaveStatus(id,date) {
    return http.get(`/get-attendance?date=${date}&employeeId=${id}`);
  }
  checkAttendanceStatus(id,date) {
    return http.get(`/get-attendance?date=${date}&employeeId=${id}`);
  }
  DesignationList() {
    return http.get("/designation");
  }
  DepartmentList() {
    return http.get("/department");
  }
  ShiftList() {
    return http.get("/shift");
  }
  LoanList() {
    return http.get("/Loan");
  }
  createLoan(data) {
    return http.post("/Loan", data);
  }
  // getHotel(id) {
  //   return http.get(`/hotel/${id}`);
  // }
  // UpdateHotel(id, data) {
  //   return http.post(`/hotel/${id}`, data);
  // }
  // DeleteHotel(id) {
  //   return http.delete(`/hotel/${id}`);
  // }
  AddEmployee(data) {
    return http.post("/employee", data);
  }
  createAttendance(data) {
    return http.post("/attendence", data);
  }
  attendanceList() {
    return http.get("/attendence");
  }
  // PropartyList() {
  //   return http.get(`/properties`);
  // }
PhotoList() {
    return http.get("/photo");
  }

getPhoto(id) {
    return http.get(`/photo/${id}`);
  }

UpdatePhoto(id, data) {
    return http.post(`/photo/${id}`, data);
  }
Deletephoto(id) {
    return http.delete(`/photo/${id}`);
  }

AddPhoto(data) {
    return http.post("/photo", data);
  }



BookingList() {
    return http.get("/booking");
  }

getBooking(id) {
    return http.get(`/booking/${id}`);
  }

UpdateBooking(id, data) {
    return http.post(`/booking/${id}`, data);
  }
DeleteBooking(id) {
    return http.delete(`/booking/${id}`);
  }

AddBooking(data) {
    return http.post("/booking", data);
  }

  // Payroll methods
  getEmployeeAbsent(employeeId, month, year) {
    return http.get(`/get-employee-absent?employee_id=${employeeId}&month=${month}&year=${year}`);
  }

  getMonthlyLoanDeduction(employeeId, month, year) {
    return http.get(`/monthly-loan-deduction?employee_id=${employeeId}&month=${month}&year=${year}`);
  }

  createPayroll(data) {
    return http.post("/Payroll", data);
  }

  payrollList() {
    return http.get("/Payroll");
  }

  getPayroll(id) {
    return http.get(`/Payroll/${id}`);
  }

  deletePayroll(id) {
    return http.delete(`/Payroll/${id}`);
  }

  updatePayroll(id, data) {
    
    return http.post(`/Payroll/${id}`, data);
  }
  
}




export default new DataService();