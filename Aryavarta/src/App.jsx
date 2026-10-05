import React from 'react'
import HomePage from './components/HomePage'
import Register from './components/Register'


const App = () => {
  return (
    <div>
        <HomePage/>
        <section id="timeline">{/* timeline content */}</section>
  <section id="faqs">{/* FAQ content */}</section>
   <section id="registration"> <Register/></section>
  <section id="contact">{/* contact content */}</section>
    </div>
  )
}

export default App