// import React from "react";
// import "./footer.css";

// const Footer = () => (
//   <footer className="footer">
//     <p>Made with ❤️ for Abdoul’s special day!</p>
//     <small>© 2025 The Zongo Family</small>
//   </footer>
// );

// export default Footer;




import React from "react";
import { motion } from "framer-motion";
import "./footer.css";

const Footer = () => (
  <motion.footer
    className="footer"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <p>Made with ❤️ for Abdoul’s special day!</p>
    <small>© 2025 The Zongo Family</small>
  </motion.footer>
);

export default Footer;


