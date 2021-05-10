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
  } catch (e) {
    throw new Error(e);
  }
  return newSubject;
};

export const deleteSubject = async (
  parent,
  args: {
    name: String;
  },
  ctx,
  info
) => {
  let id = getUserId(ctx);
  console.log(id);
  let requiredTeacher: any, subjectExists: any;
  try {
    requiredTeacher = await Teacher.findById(id);
  } catch (e) {
    throw new Error(e);
  }
  try {
    subjectExists = await Subject.findOne({
      name: args.name,
      teacher: requiredTeacher._id,
    });
  } catch (e) {
    throw new Error(e);
  }
  if (!subjectExists) {
    throw new Error("Subjct doesnot exists");
  }
  try {
    await Subject.findOneAndDelete({ name: args.name });
  } catch (e) {
    throw new Error(e);
  }
  return "sUBJECT DELETED";
};
