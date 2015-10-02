import React, { Component, PropTypes } from 'react-native'

const {
  TextInput
} = React

export default class TodoInput extends Component {
  static propTypes = {
    createTodo: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this.state = {
      text: ''
    }
  }

  onEnter (text) {
    if (text !== '') {
      this.props.createTodo(text)
      this.setState({text: ''})
    }
  }

  render () {
    return (
      <TextInput
        placeholder='输入todo'
        value={this.state.text}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        onSubmitEditing={this.onEnter}
      />
    )
  }
}
