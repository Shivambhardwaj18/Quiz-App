import Subject from "../../../../model/subject";

export const Teacher = {
  subjects: async (
    parent: {
      id: String;
    },
    args: {
      name: string;
    },
    ctx,
    info
  ) => {
    let subjects: any;
    try {
      subjects = Subject.find({
        teacher: parent.id,
      });
    } catch (e) {
      throw new Error(e);
    }
    return subjects;
  },
};

export { Teacher as default };
