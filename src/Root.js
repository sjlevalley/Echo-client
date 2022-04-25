import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'connected-react-router'
import store from './redux/configureStore'
import App from './App'

const Root = ({ initialState }) => {
    return (
        <Provider store={store.store}>
            {/* <PersistGate loading={null} persistor={store.persistor}> */}
            {/* <ConnectedRouter history={history}> */}
            <App />
            {/* </ConnectedRouter> */}
            {/* </PersistGate> */}
        </Provider>
    )
}

export default Root