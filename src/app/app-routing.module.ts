import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { RegisterComponent } from './screens/register/register.component';
import { MainComponent } from './screens/main/main.component';
import { ShowEmployeesComponent } from './screens/main/show-employees/show-employees.component';
import { EditEmployeeComponent } from './screens/main/show-employees/actions/edit-employee.component';
import { DetailEmployeeComponent } from './screens/main/show-employees/actions/detail-employee.component';

const routes: Routes = [
  {path: '', component: MainComponent, children: [
    {path: '', component: ShowEmployeesComponent},
    {path: 'edit-employee/:id-employee', component: EditEmployeeComponent},
    {path: 'detail-employee/:id-employee', component: DetailEmployeeComponent}
  ]},
  {path: 'auth', children: [
    {path: '', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
