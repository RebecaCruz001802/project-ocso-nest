import { Provider } from "../../providers/entities/provider.entity";
import { Column, ManyToOne, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  productId: string;

  @Column('text')
  productName: string;

  @Column('float')
  price: number;

  @Column('int')
  countSeal: number;

  @ManyToOne(() => Provider, (provider: Provider) => provider.products)
  provider: Provider;
}