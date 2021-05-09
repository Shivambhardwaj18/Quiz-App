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

export const login = async (
  parent,
  args: { email: string; password: string },
  ctx,
  info
): Promise<object> => {
  try {
    const existingTeacher: any = await Teacher.findOne({ email: args.email });
    if (!existingTeacher) {
      throw new Error("Teacher doesNot exist");
    }
    const match = await bcrypt.compare(args.password, existingTeacher.password);
    if (!match) {
      throw new Error("Incorrect password");
    }
    const token = jwt.sign(
      { id: existingTeacher._id, userName: existingTeacher.userName },
      process.env.SECRET
    );

    const returnData: object = {
      user: existingTeacher,
      token,
    };
    return returnData;
  } catch (e) {
    throw new Error(e);
  }
};
