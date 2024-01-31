/* eslint-disable react/prop-types */
import React from 'react';
import { Collapse } from '@mui/material';
import { uiStyles } from './styles';

export default function Hero({ checked }) {
  return (
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedHeight={50}>
      <div style={uiStyles.container}>
        <h3 style={uiStyles.title}>
          JUNTOS HACIA LA CONSTRUCCIÓN
          <br />
          <br />
          <br />
          <span style={uiStyles.colorText}> DE UN MEJOR FUTURO</span>
        </h3>
      </div>
    </Collapse>
  );
}
