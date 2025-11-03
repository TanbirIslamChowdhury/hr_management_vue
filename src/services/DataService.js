import http from "../http-common";

class DataService {
  login(data) {
    return http.post("/login", data);
  }
  EmployeeList() {
    return http.get("/employee");
  }
  checkLeaveStatus() {
    return http.get("/check-leave");
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
  
}




export default new DataService();