import React, { Component, PropTypes } from 'react-native'
import { GRAPHQL_ACTION } from '../constants/ActionTypes'

export function createConstants (...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant
    return acc
  }, {})
}

export function map (obj, predicate) {
  const result = {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = predicate(obj[key], key)
    }
  }

  return result
}

export function createReducer (initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type]

    return reducer ? reducer(state, action.payload) : state
  }
}

export function reduce (obj, predicate, initial) {
  let acc = initial

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      acc = predicate(acc, obj[key], key)
    }
  }

  return acc
}

export function getDisplayName (ReactComponent) {
  return ReactComponent.displayName || ReactComponent.name || 'Component'
}

export function compileQuery (query, params) {
  return reduce(params, (acc, val, key) => {
    return acc.replace(new RegExp('<' + key + '>', 'g'), val)
  }, query)
}

export function debouncedFetch (handlerFn) {
  const queue = []
  const processQueue = () => {
    const toProcess = queue.splice(0, queue.length)
    if (toProcess.length > 0) {
      handlerFn(toProcess)
    }
  }

  return item => {
    return new Promise((resolve, reject) => {
      if (queue.length === 0) {
        process.nextTick(processQueue)
      }

      queue.push([item, resolve, reject])
    })
  }
}

export function createGraphQLContainer(ComposedComponent, { queries = {}, queryParams = {} }) {
  let _queryParams = { ...queryParams }

  return class extends Component {
    static displayName = `GraphQLContainer(${getDisplayName(ComposedComponent)})`

    static contextTypes = {
      graphQLRefresh: PropTypes.func.isRequired
    }

    static getQuery (key) {
      const compiledQueries = map(queries, q => compileQuery(q, _queryParams))
      return !key ? compiledQueries : '... on' + compiledQueries[key]
    }

    componentWillMount () {
      this.context.graphQLRefresh()
    }

    setQueryParams (nextParams) {
      _queryParams = {
        ...queryParams,
        ...nextParams
      }

      this.forceUpdate()
      this.context.graphQLRefresh()
    }

    render () {
      return (
        <ComposedComponent {...this.props}
          queryParams={{..._queryParams}}
          setQueryParams={this.setQueryParams} />
      )
    }
  }
}

export class GraphQLConnector extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    dispatch: PropTypes.func,
    children: PropTypes.any.isRequired
  }

  static childContextTypes = {
    graphQLRefresh: PropTypes.func.isRequired
  }

  getChildContext () {
    return {
      graphQLRefresh: this.onGraphQLRefresh
    }
  }

  componentWillMount () {
    this.onGraphQLRefresh()
  }

  onGraphQLRefresh () {
    const { endpoint, dispatch, children } = this.props

    if (typeof children.type.getQuery !== 'function') return

    const query = reduce(children.type.getQuery(), (acc, val, key) => {
      return acc + '\n' + key + ': ' + val;
    }, '')

    const opts = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: '{' + query + '}'})
    }

    fetch(endpoint, opts)
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: GRAPHQL_ACTION,
          payload: json.data
        })
      })
  }

  render () {
    return React.addons.cloneWithProps(this.props.children)
  }
}
