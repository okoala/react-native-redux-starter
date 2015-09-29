import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import { getProjections } from '../utils'
import TodoModel from '../models/todo'

export const todoType = new GraphQLObjectType({
  name: 'Todo',
  description: 'Todo Model',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Todo Id'
    },
    text: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Todo Text'
    },
    createAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Todo creation date'
    }
  })
})

export const todoQueries = {
  todo: {
    type: todoType,
    args: {
      _id: {
        name: '_id',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, { _id }, source, fieldsASTs) => {
      const projs = getProjections(fieldsASTs)
      return TodoModel.findById(_id, projs)
    }
  },
  todos: {
    type: new GraphQLList(todoType),
    args: {
      count: {
        name: 'count',
        type: GraphQLInt
      }
    },
    resolve: (root, { count = 0 }, source, fieldsASTs) => {
      const projs = getProjections(fieldsASTs)
      return TodoModel.find({}, projs, {
        sort: { createAt: -1 },
        limti: count
      })
    }
  }
}

export const todoMutations = {
  createTodo: {
    type: todoType,
    args: {
      text: {
        name: 'text',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (obj, { text }, source, fieldsASTs) => {
      return Todo.create({ text, createAt: new Date() })
    }
  }
}
