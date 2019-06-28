import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
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

const App = () => {
    return <BrowserRouter>
        <ApolloProvider client = {client}>
            <Match/>
        </ApolloProvider>
    </BrowserRouter>
}

ReactDOM.render(<App/>, document.querySelector('#App'))