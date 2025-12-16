import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Repository, ILike, DeleteResult } from 'typeorm';
import { CategoriaService } from '../categoria/categoria.service';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService
  ) { }

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    if (createProdutoDto.categoria) {
      await this.categoriaService.findOne(createProdutoDto.categoria.id);
    }
    return await this.produtoRepository.save(createProdutoDto);
  }

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true
      }
    });
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: {
        categoria: true
      }
    });
    if (!produto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    return produto;
  }

  async findByNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true
      }
    });
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
    const produto = await this.findOne(id);
    if (!produto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

    if (updateProdutoDto.categoria) {
      await this.categoriaService.findOne(updateProdutoDto.categoria.id);
    }

    return await this.produtoRepository.save({
      ...produto,
      ...updateProdutoDto,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    const produto = await this.findOne(id);
    if (!produto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    return await this.produtoRepository.delete(id);
  }
}
