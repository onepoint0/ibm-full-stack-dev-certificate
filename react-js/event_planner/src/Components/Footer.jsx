import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <address>
          Email: <a href="mailto:events@eventplanner.com">events@eventplanner.com</a><br />
          Phone: <a href="tel:+4155550132">+415 555 0132</a> <br />
          Come and visit us at: <br />
          123 Excellent Street, <br />
          Sydney, NSW, 2000 <br />
        </address>
      </div>
      <div className="footer">Event Planner 2024 &copy; All rights reserved</div>
    </footer>
  )
}
export default Footer