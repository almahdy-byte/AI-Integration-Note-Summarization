import { noteModel } from "../../../DB/models/note.model.js";
import { authGraphql } from "../../../middleware/auth.middleware.js";
import { validationGraphql } from "../../../middleware/validation.middleware.js";

export const getNote = async (_, args, context) => {
 
  await validationGraphql(args)
  const user = await authGraphql(context.authorization);

  const filter = {
    ownerId: user._id,
  };

  if (args.noteId) {
    filter._id = args.noteId;
  }

  if (args.title) {
    filter.title = { $regex: args.title, $options: "i" }; 
  }

  if (args.fromDate || args.toDate) {
    filter.createdAt = {};
    if (args.fromDate) filter.createdAt.$gte = new Date(args.fromDate);
    if (args.toDate) filter.createdAt.$lte = new Date(args.toDate);
  }

  const skip = args.skip || 0;
  const limit = args.limit || 10;

  const notes = await noteModel.find(filter)
    .sort({ createdAt: -1 }) 
    .skip(skip)
    .limit(limit);

    
  return notes;
};
