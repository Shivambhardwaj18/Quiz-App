import Subject from "../../../model/subject";
import Teacher from "../../../model/teacher";
import { getUserId } from "../../utils";

export const addSubject = async (
  parent,
  args: {
    name: string;
  },
  ctx,
  info
) => {
  let id = getUserId(ctx);
  let requiredTeacher: any, newSubject: any, subjectNameTakn: any;
  console.log(id);
  try {
    requiredTeacher = await Teacher.findById(id);
  } catch (e) {
    throw new Error(e);
  }
  try {
    subjectNameTakn = await Subject.findOne({
      name: args.name,
      teacher: requiredTeacher._id,
    });
  } catch (e) {
    throw new Error(e);
  }
  console.log(args.name, requiredTeacher._id, subjectNameTakn);
  if (subjectNameTakn) {
    throw new Error("Subjct already exists");
  }
  try {
    newSubject = await Subject.create({
      ...args,
      teacher: requiredTeacher,
    });
    await Teacher.findOneAndUpdate(
      { _id: id },
      {
        $push: { subjects: newSubject },
      }
    );
  } catch (e) {
    throw new Error(e);
  }
  return newSubject;
};
