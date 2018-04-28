import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import '../routes/index.css'

const { Footer } = Layout

const FooterComponent = () => {
  return (
    <Footer className="footer">
      <div className="footer-container">
        <Link to="/">
          <h3>Home</h3>
        </Link>
        <Link to="/about">
          <h3>About</h3>
        </Link>
        <Link to="/contact">
          <h3>Contact</h3>
        </Link>
      </div>
      <h3 className="footer-copyright">Copyright 2018</h3>
    </Footer>
  )
}

export default FooterComponent
