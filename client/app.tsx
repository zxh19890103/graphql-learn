import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'

import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { BrowserRouter } from "react-router-dom"

import { Query, ApolloProvider } from 'react-apollo'

import { Match } from "./routes"

const httpLink = new HttpLink({
    uri: 'http://0.0.0.0:3000'
})

const errorLink = onError(data => {
    if (data.graphQLErrors && data.graphQLErrors.length > 0) {
        console.log(data.graphQLErrors)
    }
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: errorLink.concat(httpLink),
    connectToDevTools: true
})

const query = gql`
    query increment
    {
        increment(input: 1989),
        person {
            name,
            age
        }
    }
`

const MyContext = React.createContext<{
    name: string
    setName: (update: string) => void
}>(null)

const providerValue = {
    name: "Singhi",
    setName: (update: string) => {
        providerValue.name = update
        console.log('ppp')
    }
}

class ComsumerThing extends React.Component {
    static contextType = MyContext
    render () {
        console.log(this.context)
        return <MyContext.Consumer>
            {
                ({ name, setName }) => {
                return <a href="javascript:;" onClick={() => {
                            setName("Singhi + 90")
                        }}>{name}</a>
                }
            }
        </MyContext.Consumer>
    }
}

const App = () => {
    return <MyContext.Provider value={providerValue}>
        <ComsumerThing/>
    </MyContext.Provider>
}

ReactDOM.render(<App/>, document.querySelector('#App'))