/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React from 'react-native';
import { bindActionCreators } from 'redux';
import { connect, dispatch } from 'react-redux/native'
import * as TodoAction from '../../actions/todo'
import DumbComponent from '../components/DumbComponent'

const {
  StyleSheet,
  Text,
  View,
} = React;

@connect(
  state => ({
    foo: state.foo
  }),
  dispatch => bindActionCreators(TodoAction, dispatch)
)
export default class AppView extends React.Component {
  static propTypes = {
    foo: React.PropTypes.object,
    dispatch: React.PropTypes.func
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { foo, dispatch } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          React Native Starter is Running Hot!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <DumbComponent
          foo={foo}
          test={(text='hi') => dispatch(test(text))}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
