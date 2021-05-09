import Teacher from "../../../model/teacher";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signup = async (
  parent,
  args: {
    name: string;
    email: string;
    password: string;
  },
  ctx,
  info
): Promise<object> => {
  let existingTeacher;
  try {
    existingTeacher = await Teacher.findOne({ email: args.email });
  } catch (e) {
    throw new Error(e);
  }

  if (existingTeacher) {
    throw new Error("email already in use");
  }
  let hashedPassword: string;
  try {
    hashedPassword = await bcrypt.hash(args.password, 12);
  } catch (e) {
    throw new Error();
  }
  let newTeacher: any;

  try {
    newTeacher = await Teacher.create({
      ...args,
      password: hashedPassword,
    });
  } catch (e) {
    throw new Error(e);
  }
  const token = jwt.sign(
    { id: newTeacher._id, userName: newTeacher.userName },
    process.env.SECRET
  );
  const returnData: object = {
    user: newTeacher,
    token,
    expirationTime: 1,
  };
  return returnData;
};
