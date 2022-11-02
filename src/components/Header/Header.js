import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <Link to={`/advocates/`}>
      <h2 className="title--logo">Cados.dev</h2>
    </Link>
  )
}

export default Header