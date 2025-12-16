import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({ name: "tb_produtos" })
export class Produto {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    nome: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    descricao: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @Column({ type: "decimal", precision: 10, scale: 2 })
    preco: number;

    @Column({ length: 5000, nullable: true })
    foto: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria;

}
