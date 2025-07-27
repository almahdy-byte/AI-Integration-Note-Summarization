import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";


export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    _id: { type: GraphQLID },
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    profilePic: { type: GraphQLString },
  })
});


export const NoteType = new GraphQLObjectType({
  name: 'NoteType',
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    ownerId: {
      type: UserType
    }
  })
});
