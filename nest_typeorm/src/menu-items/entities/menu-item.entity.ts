import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ type: 'integer', default: null })
  parentId: number;

  @Column({ type: 'datetime' })
  createdAt: string;

  @OneToMany(() => MenuItem, menuItem => menuItem.parent)
  children: MenuItem[];

  @ManyToOne(() => MenuItem, (menuItem: MenuItem) => menuItem.children)
  parent?: MenuItem;
}
