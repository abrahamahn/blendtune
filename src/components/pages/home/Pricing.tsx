import React from 'react';
import styles from '@/pages/home/styles/components/Pricing.module.css';

function Pricing() {
  return (
    <>
      <div className={styles.pricing_container}>
        <div className={styles.pricing_text}>
          <h2 className={styles.pricing_title}>Start free 7-day trial</h2>
          <select className={styles.pricing_select}>
            <option value="monthly">Monthly billing</option>
            <option value="yearly">Yearly billing</option>
          </select>
          <p className={styles.pricing_description}>Save 2 months</p>
        </div>
        <div className={styles.pricing_cards}>
          <div className={styles.pricing_card}>
            <div className={styles.pricing_card_text}>
              <h3 className={styles.pricing_card_title}>Starter</h3>
              <p className={styles.pricing_card_price}>$7.99/month</p>
              <ul className={styles.pricing_card_description}>
                <li>20 credits monthly</li>
                <li>Samples, Stems & MIDI</li>
                <li>Unlimited One-Shot downloads</li>
              </ul>
              <div className={styles.pricing_card_button_container}>
                <button className={styles.pricing_card_button}>Try free</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.pricing_cards}>
          <div className={styles.pricing_card}>
            <div className={styles.pricing_card_text}>
              <h3 className={styles.pricing_card_title}>Pro</h3>
              <p className={styles.pricing_card_price}>$14.99/month</p>
              <ul className={styles.pricing_card_description}>
                <li>40 credits monthly</li>
                <li>Samples, Stems & MIDI</li>
                <li>Unlimited One-Shot downloads</li>
              </ul>
              <div className={styles.pricing_card_button_container}>
                <button className={styles.pricing_card_button}>Try free</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.pricing_cards}>
          <div className={styles.pricing_card}>
            <div className={styles.pricing_card_text}>
              <h3 className={styles.pricing_card_title}>Premium</h3>
              <p className={styles.pricing_card_price}>$24.99/month</p>
              <ul className={styles.pricing_card_description}>
                <li>80 credits monthl</li>
                <li>Samples, Stems & MIDI</li>
                <li>Unlimited One-Shot downloads</li>
              </ul>
              <div className={styles.pricing_card_button_container}>
                <button className={styles.pricing_card_button}>Try free</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;