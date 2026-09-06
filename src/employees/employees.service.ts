import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  private  employees: CreateEmployeeDto[] = [
    {
      id: 1,
      name: "Alberto",
      lastName: "Costas",
      phoneNumber: "XXX443221"
    },
    {
      id: 2,
      name: "José",
      lastName: "Pérez",
      phoneNumber: "4424213XX"
    }
  ];

  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length + 1;
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.filter((employee) => employee.id == id);
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

 remove(id: number) {
  this.employees = this.employees.filter((employee) => employee.id !== id);
return this.employees;
}
}