import React from 'react-native'
import { BlurView } from 'react-native-blur'
import { Icon } from 'react-native-icons'

import config from '../configs/config'
import nativeWindow from '../util/window'

const { width, height } = nativeWindow.get()

const {
  View,
  Component,
  PropTypes,
  Text,
  StyleSheet,
  Image,
  ActivityIndicatorIOS,
  TouchableOpacity
} = React

export default class Home extends Component {

  constructor (props) {
    super(props)
  }

  _onGithubHomeOpen () {
    nativeWindow.link(config.github.home)
  }

  render () {
    return {
      <Image
        style={styles.bgWall}
        source={{uri: config.bgImgUrl}} >

        <BlurView
          blurType='dark'
          style={styles.container}>

          <Image
            style={styles.noderLogo}
            source={require('image!logo')} />

          <Text
            style={styles.title}>
            版本:
            <Text
            style={{fontSize: 18, color: 'rgba(255,255,255,0.6)'}}>
              {' v' + config.package.version}
            </Text>
          </Text>

          <TouchableOpacity onPress={() => nativeWindow.link(config.author.blog)}>
            <Text style={styles.subTitle}>by okoala</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={::this._onGithubHomeOpen}>
            <Icon
              name='ion|social-github'
              size={40}
              color='rgba(255,204,0,1)'
              style={[styles.rowIcon, {marginTop: 20}]}/>
          </TouchableOpacity>

          <Icon
            name='ion|ios-arrow-thin-down'
            size={60}
            color='rgba(255,255,255,0.5)'
            style={styles.arrow}/>

          <View
            style={styles.footer}>
            <TouchableOpacity onPress={() => nativeWindow.link(config.RNWebPage)}>
              <Text style={styles.ReactNative}>
                Power By React Native {'v' + config.package.dependencies['react-native']}
              </Text>
            </TouchableOpacity>
          </View>

        </BlurView>
      </Image>
    }
  }
}

const styles = StyleSheet.create({
  bgWall: {
    height: height,
    width: width
  },
  noderLogo: {
    height: 150,
    width: 150
  },
  container: {
    width: width,
    height: height,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 30
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    color: 'rgba(255,255,255,0.7)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)'

  },
  subTitle: {
    marginTop: 10,
    fontSize: 16,
    color: 'rgba(255,255,255,0.5)'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    alignItems: 'center'
  },
  rowIcon: {
    height: 40,
    width: 40
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrow: {
    marginTop: 40,
    height: 50,
    width: 50
  },
  blog: {
    height: 20,
    width: 100,
    opacity: 0.5
  },
  ReactNative: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.3)',
    marginBottom: 10
  }
})
