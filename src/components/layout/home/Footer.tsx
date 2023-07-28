import React from 'react';
import styles from '@/pages/home/styles/layout/Footer.module.css';

function Footer() {
  return (
    <div className={styles.footer_container}>
      <div className={styles.footer}>
        <div className={styles.footer_logo_container}>
          <p className={styles.footer_logo}>BLEND.</p>
        </div>
        <div className={styles.footer_directory}>
          <div className={styles.footer_directory_container}>
            <h3 className={styles.footer_category}>Music</h3>
            <ul className={styles.footer_category_list}>
              <li><a href="#">Beats</a></li>
              <li><a href="#">Packs</a></li>
              <li><a href="#">Selections</a></li>
              <li><a href="#">Creators</a></li>
              <li><a href="#">Free samples</a></li>
            </ul>
          </div>
          <div className={styles.footer_directory_container}>
            <h3 className={styles.footer_category}>Support</h3>
            <ul className={styles.footer_category_list}>
              <li><a href="#">Help</a></li>
              <li><a href="#">Licensing</a></li>
              <li><a href="#">Contact Support</a></li>
              <li><a href="#">Feedback</a></li>
            </ul>
          </div>
          <div className={styles.footer_directory_container}>
            <h3 className={styles.footer_category}>Social Media</h3>
            <ul className={styles.footer_category_list}>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
          <div className={styles.footer_directory_container}>
            <h3 className={styles.footer_category}>Account</h3>
            <ul className={styles.footer_category_list}>
              <li><a href="#">Start Selling</a></li>
              <li><a href="#">Subscribe</a></li>
              <li><a href="#">Sign in</a></li>
            </ul>
          </div>
          <div className={styles.footer_directory_container}>
            <h3 className={styles.footer_category}>Legal</h3>
            <ul className={styles.footer_category_list}>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footer_footer}>
          <div className={styles.footer_footer_container}>
            <p className={styles.footer_footer_text}>&copy; 2023 Blend. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;