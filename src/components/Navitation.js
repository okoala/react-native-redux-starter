import React from 'react-native'
import Router from '../configs/Router'

const {
  PropTypes,
  Component,
  Navigator
} = React

class Navigation extends Component {
  static propTypes = {
    initialRoute: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.actions.getLoginUserFromStorage()
    this.props.actions.getAllTopicsFromStorage()

    this.navigator.navigationContext.addListener('didfocus', e => {
      const route = e.data.route
      this[route.name] && this[route.name].componentDidFocus && this[route.name].componentDidFocus()
    })
  }

  renderScene (route, navigator) {
    this.router = this.router || new Router(navigator)

    if (route.component) {
      return React.createElement(route.component, Object.assign({}, route.props, {
        ref: view => this[route.name] = view,
        actions: this.props.actions,
        state: this.props.state,
        router: this.router
      }))
    }
  }

  configureScene (route) {
    if (route.sceneConfig) {
      return route.sceneConfig
    }

    return Navigator.SceneConfigs.FloatFromRight
  }

  render () {
    return (
      <Navigator
        ref={view => this.navigator = view}
        initialRoute={this.initialRoute}
        configureScene={this.configureScene.bind(this)}
        renderScene={this.renderScene.bind(this)}
      />
    )
  }

}

export default Navigation
