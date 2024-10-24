// Footer.js

import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-section">
            <h3>Mail Us:</h3>
            <p>
              AMAZON RETAIL INDIA PRIVATE LIMITED's,<br />
              Ground Floor, Eros Plaza,<br />
              Eros Corporate Centre,<br />
              Nehru Place,<br />
              New Delhi-110019<br />
              New Delhi, India<br />
            </p>
          </div>
          <div className="footer-section">
            <h3>Registered Office Address:</h3>
            <p>
              AMAZON RETAIL INDIA PRIVATE LIMITED's,<br />
              Ground Floor, Eros Plaza,<br />
              Eros Corporate Centre,<br />
              Nehru Place,<br />
              New Delhi-110019<br />
              New Delhi, India<br />
              CIN:U52609DL2017FTC318364<br />
              Telephone:044-45614890/944-67415876
            </p>
          </div>
        </div>

      </div>
      <hr></hr>
      <div className="footer-bottom">
        <p>&copy; 1996-2024, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
};

export default Footer;
