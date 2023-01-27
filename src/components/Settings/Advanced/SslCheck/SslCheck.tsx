
import React from 'react';
import Checkbox from '../../../Checkbox/Checkbox';
import CheckboxGroup from '../../../Checkbox/CheckboxGroup';
import styles from './ssl.module.scss';

const SslCheck = () => {
  return (
    <div className={styles.wrap}>
      <p>Only check this if you&apos;re experiencing problems and understand the risks. SSL certificates are a very important part of the internet. These certificates allow encrypted communication between partners and zapier.com.</p>

      <CheckboxGroup style={{ marginTop: '20px' }}>
        <Checkbox id="dsc" />
        <label htmlFor="dsc">Disable SSL Certificate Checks</label>
      </CheckboxGroup>
    </div>
  );
};

export default SslCheck;
