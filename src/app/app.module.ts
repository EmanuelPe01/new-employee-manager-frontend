import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { RegisterComponent } from './screens/register/register.component';
import { InputComponent } from './items/input.component';
import { SelectComponent } from './items/select.component';
import { MainComponent } from './screens/main/main.component';
import { ShowEmployeesComponent } from './screens/main/show-employees/show-employees.component';
import { EditEmployeeComponent } from './screens/main/show-employees/actions/edit-employee.component';
import { DetailEmployeeComponent } from './screens/main/show-employees/actions/detail-employee.component';
import { AllDepartmentsInformation } from './screens/main/show-departments/all-information.component';
import { DepartmentsComponent } from './screens/main/show-departments/departments.component';
import { PuestosComponent } from './screens/main/show-departments/puestos.component';
import { StatesComponent } from './screens/main/show-departments/states.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InputComponent,
    SelectComponent,
    MainComponent,
    ShowEmployeesComponent,
    EditEmployeeComponent,
    DetailEmployeeComponent,
    AllDepartmentsInformation,
    DepartmentsComponent,
    PuestosComponent,
    StatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
