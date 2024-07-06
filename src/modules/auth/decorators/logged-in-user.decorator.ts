import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { LoggedUser } from '@/modules/user/user.service';

export const LoggedInUser  = createParamDecorator(
  (data: keyof LoggedUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const loggedUser: LoggedUser = request.user;
    return data ? loggedUser?.[data] : loggedUser;
  },
);