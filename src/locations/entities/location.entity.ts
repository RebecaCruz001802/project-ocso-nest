import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Manager } from "../../managers/entities/manager.entity"; 
import { Region } from "../../regions/entities/region.entity";
import { Employee } from "../../employees/entities/employee.entity"; // Ajusta la ruta si difiere en tu proyecto

@Entity()
export class Location {
  @PrimaryGeneratedColumn('increment')
  locationId: number;

  @Column('text')
  locationName: string;

  @Column('text')
  locationAdress: string;

  @Column('float', { array: true })
  locationLatLng: number[];

  @OneToOne(() => Manager)
  @JoinColumn({
    name: "managerId"
  })
  manager: Manager;

  @ManyToOne(() => Region, (region) => region.locations)
  @JoinColumn({ name: "regionId" })
  region: Region;

  @OneToMany(() => Employee, (employee) => employee.location)
  employees: Employee[];
}