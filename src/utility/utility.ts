import { HttpStatus } from "@nestjs/common"

export const sendSuccessResponse = (message: string, data: any, ) => {
  return {
    success: true,
    statusCode: HttpStatus.OK,
    message: message || 'Successful',
    data
  }
}