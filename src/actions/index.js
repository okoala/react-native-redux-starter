import user from './UserAction'
import home from './HomeAction'
import message from './MessageAction'
import topic from './TopicAction'

const actions = Object.assign({},
                  user,
                  home,
                  message,
                  topic
                )

export default actions
