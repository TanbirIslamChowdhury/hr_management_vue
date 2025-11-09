import { createWebHistory, createRouter } from "vue-router";

const routes =  [
   {
     path: "/home",
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
      name: "salary",
      component: () => import("./components/Salary/List")
    },
  {
      path: "/salaryCreate"  ,
      alias: "/salaryCreate",
      name: "salaryCreate",
      component: () => import("./components/Salary/Create")
    },
    {
      path: "/loan"  ,
      alias: "/loan",
      name: "loan",
      component: () => import("./components/Loan/List")
    },
  {
      path: "/loanCreate"  ,
      alias: "/loanCreate",
      name: "loanCreate",
      component: () => import("./components/Loan/Create")
    },
  {
      path: "/salaryEdit/:id"  ,
      alias: "/salaryEdit/:id",
      name: "editPayroll",
      component: () => import("./components/Salary/Edit")
    },
  {
      path: "/payslip/:id"  ,
      alias: "/payslip/:id",
      name: "payslip",
      component: () => import("./components/Salary/Payslip")
    },
       {
      path: "/"  ,
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