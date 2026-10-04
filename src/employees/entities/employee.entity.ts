import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Location } from "../../locations/entities/location.entity";
import { User } from "../../auth/entities/user.entity";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  employeeId: string;

  @Column({ nullable: true })
employeeName: string;

  @Column('text')
  employeeLastName: string;

  @Column('text') 
  employeePhoneNumber: string;

  @Column('text', {
    unique:true,
})
  employeeEmail: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  employeePhoto: string;

  @ManyToOne(() => Location)
  @JoinColumn({
    name: "locationId"
  })
  location: Location;

  @OneToOne(() => User)
  @JoinColumn({
    name: "userId"
  })
  user: User;
}