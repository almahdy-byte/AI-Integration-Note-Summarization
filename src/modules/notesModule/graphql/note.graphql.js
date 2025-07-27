import {  GraphQLID, GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { getNote } from "./note.graphql.controller.js";
import { NoteType } from "./note.graphql.type.js"; 

export const noteQuery = {
    getNote: {
      type: new GraphQLList(NoteType),
      args: {
            noteId: { type: GraphQLID },
            title: { type: GraphQLString },
            fromDate: { type: GraphQLString },
            toDate: { type: GraphQLString },
            skip: { type: GraphQLInt },
            limit: { type: GraphQLInt }
      },
      resolve: getNote
    
    }
}
