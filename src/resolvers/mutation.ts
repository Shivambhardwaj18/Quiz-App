import { signup, login } from "./Mutations/teacher";
import { addSubject, deleteSubject } from "./Mutations/subjects";

const Mutation = {
  signup,
  login,
  addSubject,
  deleteSubject,
};

export { Mutation as default };
