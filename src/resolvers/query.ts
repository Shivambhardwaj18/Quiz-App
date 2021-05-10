import Teacher from "../../model/teacher";
import { getUserId } from "../utils";

const Query = {
  me: async (parent, args, ctx, info) => {
    let id = getUserId(ctx);
    let requiredUser: object;
    try {
      requiredUser = await Teacher.findById(id);
    } catch (e) {
      throw new Error(e);
    }
    return requiredUser;
  },
};

export { Query as default };
