import { StatusCodes } from "http-status-codes";
import { noteModel } from "../../DB/models/note.model.js";
import { asyncErrorHandler } from "../../utils/error/asyncErrorHandler.js";
import { AppError } from "../../utils/error/appError.js";
import { summarize } from "../../utils/summarizeNote/summarizeNote.js";
export const createNote = asyncErrorHandler(
    async(req , res , next)=>{

        const {title , body} = req.body;

        const note = await noteModel.create({
            title,
            body,
            ownerId:req.user._id
        })

        return res
            .status(StatusCodes.CREATED)
            .json({
                message: "Note created successfully",
                note: {
                    id: note._id,
                    title: note.title,
                    body: note.body,
                }
            });
    }
)

export const deleteNote = asyncErrorHandler(

    async(req , res , next)=>{

        const {noteId} = req.params;

        const note = await noteModel.findByIdAndDelete(noteId);

        if(!note){
            return next(new AppError('Note not found' ,StatusCodes.NOT_FOUND ));
        }

        if(note.ownerId.toString() != req.user._id.toString()){
            return next(new AppError('You are not authorized to delete this note' ,StatusCodes.UNAUTHORIZED ));
        }
        await note.deleteOne();

        return res
        .status(StatusCodes.OK)
        .json({
            message: "Note deleted successfully",
        });

    }

)

export const summarizeNote = asyncErrorHandler(

    async(req , res , next)=>{
        const {noteId} = req.params;

        const note = await noteModel.findById(noteId);

        if(!note){
            return next(new AppError('Note not found' ,StatusCodes.NOT_FOUND ));
        }

        if(note.ownerId.toString() != req.user._id.toString()){
            return next(new AppError('You are not authorized to summarize this note' ,StatusCodes.UNAUTHORIZED ));
        }

        if(!note.summary){
            const summary = await summarize(note.body);
            note.summary = summary;
            await note.save();
        }
        
        return res
        .status(StatusCodes.OK)
        .json({
            message: "Note summarized successfully",
            summary: note.summary,
        });

    }
)