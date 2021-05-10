import Teacher from "../../model/teacher";
import { getUserId } from "../utils";

const Query = {
  me: async (parent, args, ctx, info) => {
    let id = getUserId(ctx);
    console.log(id);
    let requiredUser: object;
    try {
      requiredUser = await Teacher.findById(id);
    } catch (e) {
      throw new Error(e);
    }
    return requiredUser;
  },
  hello: () => {
    return "hello";
  },
};

export { Query as default };
