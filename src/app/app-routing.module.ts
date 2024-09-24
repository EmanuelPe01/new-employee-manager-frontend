import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { RegisterComponent } from './screens/register/register.component';
import { MainComponent } from './screens/main/main.component';
import { ShowEmployeesComponent } from './screens/main/show-employees/show-employees.component';
import { EditEmployeeComponent } from './screens/main/show-employees/actions/edit-employee.component';
import { DetailEmployeeComponent } from './screens/main/show-employees/actions/detail-employee.component';
import { AllDepartmentsInformation } from './screens/main/show-departments/all-information.component';
import { DepartmentsComponent } from './screens/main/show-departments/departments.component';
import { PuestosComponent } from './screens/main/show-departments/puestos.component';
import { StatesComponent } from './screens/main/show-departments/states.component';

const routes: Routes = [
  {path: '', component: MainComponent, children: [
    {path: '', component: ShowEmployeesComponent},
    {path: 'edit-employee/:id-employee', component: EditEmployeeComponent},
    {path: 'detail-employee/:id-employee', component: DetailEmployeeComponent},
    {path: 'new-employee', component: RegisterComponent},
    {path: 'departments', component: AllDepartmentsInformation, children: [
      {path: '', component: DepartmentsComponent},
      {path: 'puestos', component: PuestosComponent},
      {path: 'estados', component: StatesComponent},
    ]}
  ]},
  {path: 'auth', children: [
    {path: '', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
