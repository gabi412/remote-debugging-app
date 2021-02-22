import React from "react"
import Header from "./components/Header/Header"
import NavBar from "./components/Navbar/NavBar"
import Content from "./components/Content/Content"
import Footer from "./components/Footer"

import './App.css'

function App() {
    return (
        <div className="App">
            <NavBar />
            <Header />
            <Content />           
            <Footer />
        </div>
    )
}

export default App