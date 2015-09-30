import React, { Component, PropTypes } from 'react-native'
import { createGraphQLContainer as createContainer } from '../utils'

const {
  View
} = React

class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired
  }

  render () {
    return (
      <View>{this.props.todo.text}</View>
    )
  }
}

export default createContainer(TodoItem, {
  queries: {
    todo: `
      Todo {
        text
      }
    `
  }
})
