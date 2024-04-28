import { Category } from 'src/category/entities/category.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // 4ое видео на 29ой минуте
  @OneToMany(
    () => Category,
    (category) =>
      category.user /* привязываемся у таблицы Category к полю user */,
    { onDelete: 'CASCADE' } /* если удаляем юзера то и удаляем категорию */,
  )
  categories: Category[]; /* массив категорий */

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
