import Teacher from "../../../../model/teacher";

const Subject = {
  teacher: async (
    parent: {
      teacher: String;
    },
    args: {
      name: string;
    },
    ctx,
    info
  ) => {
    let teacher: any;
    try {
      teacher = Teacher.findById(parent.teacher);
    } catch (e) {
      throw new Error(e);
    }
    return teacher;
  },
};
export { Subject as default };
