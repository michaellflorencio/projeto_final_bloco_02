import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { Categoria } from "../../categoria/entities/categoria.entity";

export class CreateProdutoDto {

    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    descricao: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    preco: number;

    foto: string;

    categoria: Categoria;

}
