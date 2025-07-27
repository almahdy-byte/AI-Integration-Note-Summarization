import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { noteQuery } from "./modules/notesModule/graphql/note.graphql.js";

export const schema = new GraphQLSchema({
    query:new GraphQLObjectType({
        name : 'Query',
        fields:{
            ...noteQuery
        }
    })
})