import React from 'react-native'
import Dimensions from 'Dimensions'

import Navigator from 'react'

const { width, height } = Dimensions.get('window')

const baseConfig = Navigator.SceneConfigs.FloatFromRight
const popGestureConfig = Object.assign({}, baseConfig.gestures.pop, {
  edgeHitWidth: width / 3
})

const fullPopGestureConfig = Object.assign({}, Navigator.SceneConfigs.FloatFromBottom.gestures.pop, {
  edgeHitWidth: width
})


export customFloatFromRight = Object.assign({}, baseConfig, {
  gestures: {
    pop: popGestureConfig
  }
})

export customFloatFromBottom = Object.assign({}, Navigator.SceneConfigs.FloatFromBottom, {
  gestures: {
    pop: fullPopGestureConfig
  }
})
