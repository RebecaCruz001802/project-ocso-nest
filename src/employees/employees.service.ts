import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepository.create(createEmployeeDto as DeepPartial<Employee>);
    return await this.employeeRepository.save(employee);
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findOne(id: string) {
    return this.employeeRepository.findOneBy({
      employeeId: id,
    });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...(updateEmployeeDto as DeepPartial<Employee>),
    });
    if (!employeeToUpdate) throw new NotFoundException();
    return await this.employeeRepository.save(employeeToUpdate);
  }

  async remove(id: string) {
    await this.employeeRepository.delete({
      employeeId: id
    });
    return {
      message: "Employee deleted"
    };
  }
}