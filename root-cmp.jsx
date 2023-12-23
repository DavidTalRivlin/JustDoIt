const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux

import { TodoApp } from "./Pages/TodoApp.jsx"
import { store } from "./store/store.js"

// import { AppHeader } from './cmps/AppHeader.jsx'
// import { AppFooter } from './cmps/AppFooter.jsx'
// import { HomePage } from './pages/HomePage.jsx'
// import { AboutUs } from './pages/AboutUs.jsx'
// import { CarIndex } from './pages/CarIndex.jsx'

// import { store } from './store/store.js'


// export class App extends React.Component {
export function App() {

    // render() {
        return (
            <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    {/* <AppHeader /> */}
                    <main>
                        <Routes>
                            <Route element={<TodoApp />} path="/" />
                            {/* <Route element={<AboutUs />} path="/about" /> */}
                            {/* <Route element={<CarIndex />} path="/car" /> */}
                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </section>
            </Router>
            // </Provider>
        )
    }
// }


