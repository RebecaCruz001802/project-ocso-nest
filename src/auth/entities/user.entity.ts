import { Manager } from "../../managers/entities/manager.entity";
import { Employee } from "../../employees/entities/employee.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, Unique } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column('text', {
    unique:true,
})
  userEmail: string;

  @Column('text')
  userPassword: string;

  @Column('simple-array', {
    default: "Employee"
  })
  userRoles: string[];

  @OneToOne(() => Manager)
  manager: Manager;

  @OneToOne(() => Employee)
  employee: Employee;
} 