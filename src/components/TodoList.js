import React, { Component, PropTypes } from 'react-native'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import { createGraphQLContainer as createContainer } from '../utils'

const {
  View,
  TextInput
} = React

class TodoList extends Component {
  static propTypes = {
    actions: PropTypes.object,
    todos: PropTypes.array
  }

  static defaultProps = {
    todos: []
  }

  render () {
    const { createTodo } = this.props.actions

    return (
      <View>
        <TodoInput createTodo={createTodo} />
        {this.props.todos.map(todo => {
          <TodoItem key={todo._id} todo={todo} />
        })}
      </View>
    )
  }
}

export default createContainer(TodoList, {
  queryParams: {
    count: 5
  },
  queries: {
    todos: `
      todos(count: <count>) {
        _id,
        ${TodoItem.getQuery('todo')}
      }
    `
  }
})
