import React from 'react';
import * as Icon from '@/components/icons';

import styles from '@/pages/app/styles/layout/Header.module.css';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.header_logo_container}>
          <p className={styles.header_logo}>BLEND.</p>
          <p className={styles.header_sublogo}></p>
        </div>
        <div className={styles.header_icon_container}>
          <Icon.Notification width={22} height={22} />
          <Icon.Message width={22} height={22} />
        </div>
      </div>
    </div>
  );
};

export default Header;