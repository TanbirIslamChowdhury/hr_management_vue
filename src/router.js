import { createWebHistory, createRouter } from "vue-router";

const routes =  [
   {
     path: "/",
     alias: "/home",
     name: "home",
     component: () => import("./components/Home")
   },
   {
     path: "/attendence",
     alias: "/attendence",
    name: "attendence",
    component: () => import("./components/Attendence/List")
    },
   {
     path: "/attendenceCreate",
     alias: "/attendenceCreate",
    name: "attendenceCreate",
    component: () => import("./components/Attendence/Create")
    },
     {
       path: "/employee"  ,
      alias: "/employee",
      name: "employee",
     component: () => import("./components/Employee/List")
    },
     {
       path: "/EmployeeCreate"  ,
      alias: "/EmployeeCreate",
      name: "EmployeeCreate",
     component: () => import("./components/Employee/Create")
    },

  {
      path: "/salary"  ,
      alias: "/salary",
      name: "interest",
      component: () => import("./components/Salary/List")
    },
       {
      path: "/login"  ,
      alias: "/login",
      name: "login",
      component: () => import("./components/Login")
    },
  //      {
  //     path: "/rsvp"  ,
  //     alias: "/rsvp",
  //     name: "rsvp",
  //     component: () => import("./components/Rsvp")
  //   },
    


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;