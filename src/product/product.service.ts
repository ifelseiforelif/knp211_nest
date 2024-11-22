import { Injectable, Logger } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './models/product.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductService {
  private readonly logger: Logger = new Logger(ProductService.name);
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}
  async create(createProductDto) {
    const product = await this.productModel.create(createProductDto);
    return product;
  }

  async findAll() {
    return await this.productModel.findAll();
  }

  async findOne(id: number) {
    return await this.productModel.findByPk(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const rows = await this.productModel.update(updateProductDto, {
      where: { id },
    });
    this.logger.log(`Update  ${rows}`);
    if (rows[0]) {
      return { id, ...updateProductDto };
    }
    return `product ${id} not found`;
  }

  async remove(id: number) {
    await this.productModel.destroy({ where: { id } });
    return `This action removes a #${id} product`;
  }
}
