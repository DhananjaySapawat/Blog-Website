import React from 'react'
import { Link } from 'react-router-dom'
import "./ErrorPage.css"
function ErrorPage() {
  return (
    <div className='error'>
        <h2 className='four'>404</h2>
        <p className='nf'>Page not found</p>
        <Link to = '/'><button>Go Back</button></Link>
    </div>
  )
}
export default ErrorPage