import { HttpService } from "@nestjs/axios";
import { Controller, UseFilters, HttpStatus, UseGuards, Post, Body, Get } from "@nestjs/common";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { ApplicationServiceURL } from "./app.config";
import { AddNewCategoryDto } from "./dto/add-new-category.dto";
import { AxiosExceptionFilter } from "./filters/axios-exception.filter";
import { CheckAdminRoleGuard } from "./guards/check-admin-role.guard";
import { CheckAuthGuard } from "./guards/check-auth.guard";

@ApiTags('Category')
@Controller('category')
@UseFilters(AxiosExceptionFilter)

export class CategoryController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new category has been successfully created.'
  })
  @UseGuards(CheckAuthGuard, CheckAdminRoleGuard)
  @Post('/')
  public async createCategory(@Body() dto: AddNewCategoryDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Category}/`, dto);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All categories found'
  })
  @UseGuards(CheckAuthGuard)
  @Get('/')
  public async indexCaregories() {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Category}/`);
    return data;
  }
}
