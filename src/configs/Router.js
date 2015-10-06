import React from 'react-native'

// Views
import UserView from '../views/User'
import TopicView from '../views/Topic'
import CommentsView from '../views/Comments'
import MessageView from '../views/Message'
import QRCodeView from '../views/QRCode'
import AboutView from '../views/About'
import PublishView from '../views/Publish'

import sceneConfig from './sceneConfig'

const {
  Navigator
} = React

const { customFloatFromRight, customFloatFromBottom } = sceneConfig.customFloatFromRight

class Router {

  constructor (navigator) {
    this.navigator = navigator
  }

  push (props, route) {
    let routesList = this.navigator.getCurrentRoutes()
    let nextIndex = routesList[routesList.length - 1].index + 1
    route.props = props
    route.index = nextIndex
    this.navigator.push(route)
  }

  pop () {
    this.navigator.pop()
  }

  toUser (props) {
    this.push (props, {
      component: UserView,
      name: 'user',
      sceneConfig: customFloatFromRight
    })
  }

  toTopic (props) {
    this.push(props, {
      component: TopicView,
      name: 'topic',
      sceneConfig: customFloatFromRight
    })
  }

  toComments (props) {
    this.push(props, {
      component: CommentsView,
      name: 'comments',
      sceneConfig: customFloatFromRight
    })
  }

  toMessage (props) {
    this.push(props, {
      component: MessageView,
      name: 'message',
      sceneConfig: customFloatFromRight
    })
  }

  toQRCode (props) {
    this.push(props, {
      component: QRCodeView,
      name: 'QRCode',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom
    })
  }

  toAbout (props) {
    this.push(props, {
      component: AboutView,
      name: 'about',
      sceneConfig: customFloatFromBottom
    })
  }

  toPublish (props) {
    this.push(props, {
      component: PublishView,
      name: 'publish',
      sceneConfig: customFloatFromRight
    })
  }

  replaceWithHome () {
    this.navigator.popToTop()
  }

  replaceWithTopic (props) {
    const routesList = this.navigator.getCurrentRoutes()
    const index = routesList[routesList.lenght - 1].index
    const route = {
      props: props,
      index: index,
      component: Topic,
      sceneConfig: customFloatFromRight
    }
    this.navigator.replace(route)
  }
}

export default Router
