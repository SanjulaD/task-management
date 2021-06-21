import { JwtService } from "@nestjs/jwt";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.cookies["token"];

      if (!this.jwtService.verifyAsync(token)) {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    return next.handle();
  }
}
