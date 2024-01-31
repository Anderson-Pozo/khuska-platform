/* eslint-disable react/prop-types */
import React from 'react';
import { Collapse, IconButton } from '@mui/material';
import { uiStyles } from './styles';
import { Link as Scroll } from 'react-scroll';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
        <Scroll to="about" smooth={true}>
          <IconButton>
            <ExpandMoreIcon style={uiStyles.goDown} />
          </IconButton>
        </Scroll>
      </div>
    </Collapse>
  );
}
