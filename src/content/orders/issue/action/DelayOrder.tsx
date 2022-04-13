import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {
  Grid,
  Container,
  Typography,
  Box,
  Button,
  Switch,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  styled
} from '@mui/material';
import Footer from 'src/components/Footer';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DELAYS } from '../contants';

const DelayOrder = ({}) => {
  const navigate = useNavigate();
  const [delay, setDelay] = useState();

  const handleChangeDelay = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: any = (event.target as HTMLInputElement).value;
    setDelay(value);
  };

  return (
    <>
      <FormControl>
        <FormLabel id="choose-delay-group">Choose delay time</FormLabel>
        <RadioGroup
          aria-labelledby="choose-delay-group"
          name="radio-delay-group"
          value={delay}
          onChange={handleChangeDelay}
        >
          {DELAYS.map((delayObj, key) => {
            return (
              <FormControlLabel
                key={key}
                value={delayObj.value}
                control={<Radio />}
                label={delayObj.label}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default DelayOrder;
