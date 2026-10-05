import React from 'react'
import HomePage from './components/HomePage'
import Register from './components/Register'
import FAQ from './components/FAQ'
import Contact from './components/Contact'


const App = () => {
  return (
    <div>
        <HomePage/>
        <section id="timeline">{/* timeline content */}</section>
  <section id="faqs"><FAQ/></section>
   <section id="registration"> <Register/></section>
  <Contact />
    </div>
  )
}

export default App