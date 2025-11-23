
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
    <small>© 2025 The Zongo Family</small>
  </motion.footer>
);

export default Footer;


