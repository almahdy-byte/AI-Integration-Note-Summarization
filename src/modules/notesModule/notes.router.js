import { Router } from "express";
import { auth } from "../../middleware/auth.middleware.js";
import * as noteService from './notes.controller.js'
import * as noteValidation from './notes.validation.js'
import { validation } from "../../middleware/validation.middleware.js";
const router = Router({mergeParams : true});

router.post(
    '/' ,
    validation(noteValidation.createNoteValidationSchema),
    auth ,
    noteService.createNote
)

router.delete(
    '/:noteId' ,
    validation(noteValidation.noteIdValidation),
    auth ,
    noteService.deleteNote
)
router.post(
    '/:noteId/summarize' ,
    validation(noteValidation.noteIdValidation),
    auth ,
    noteService.summarizeNote
)


export default router;