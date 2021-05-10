import * as jwt from "jsonwebtoken";

// export interface Context {
//   request: any;
// }

export const getUserId = (ctx) => {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { id } = jwt.verify(token, process.env.SECRET) as {
      id: string;
    };
    return id;
  }

  throw new AuthError();
};

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}
