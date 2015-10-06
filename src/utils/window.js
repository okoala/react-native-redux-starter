import React from 'react-native'
import Dimensions from 'Dimensions'

const {
  AlertIOS,
  LinkingIOS
} = React


export function get () {
  return Dimensions.get('window')
}

export function alert (content) {
  AlertIOS.alert(content)
}

export function link (url) {
  LinkingIOS.canOpenURL(url, (supported) => {
    if (!supported) {
      console.warn('Can\'t support the url')
    } else {
      LinkingIOS.openURL(url)
    }
  })
}

export function parseImgUrl (url) {
  if (/^\/\/.*/.test(url)) {
    url = 'http:' + url
  }

  return url
}
