import React from 'react-native'

const {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React

const styles = StyleSheet.create({
  dummy: {
    fontSize: 20,
    padding: 15,
    backgroundColor: '#F5F5F5'
  }
})

export defualt class DumbComponent extends React.Component {
  static propTypes = {
    test: React.PropTypes.func,
    foo: React.PropTypes.object
  }

  constructor (props) {
    super(props)
  }

  handlePress (e) {
    this.props.test('Success! This action flowed through Redux.')
  }

  render () {
    return (
      <TouchableHighlight onPress={::this.handlePress}>
        <Text style={styles.dummy}>
          {this.props.foo}
        </Text>
      </TouchableHighlight>
    )
  }
}
