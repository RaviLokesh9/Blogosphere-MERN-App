const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/blogs">Blogs</a>
        </li>
        <li>
          <a href="/login">Account</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </div>
    <p className="developer-credits">
      Developed by: Ravi Lokesh
      <span className="social-icons">
        <a
          href="https://github.com/RaviLokesh9"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/tsrlokesh9"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        
      </span>
    </p>
  </footer>
);

export default Footer;
