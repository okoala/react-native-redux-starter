import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'

import {
  todoQueries,
  todoMutations
} from './todoType'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
      ...todoQueries
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: () => ({
      ...todoMutations
    })
  })
})

export default schema
