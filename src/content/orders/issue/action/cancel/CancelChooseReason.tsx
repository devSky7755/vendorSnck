import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material';
import { useState } from 'react';
import { REASONS } from '../../contants';

const CancelChooseReason = ({ setStep }) => {
  const [reason, setReason] = useState('');

  const handleChangeReason = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: any = (event.target as HTMLInputElement).value;
    setReason(value);
    let stepVal = 2;
    if (value === REASONS[1].value) {
      stepVal = 4;
    }
    setStep({
      value: stepVal,
      payload: {}
    });
  };

  return (
    <>
      <FormControl>
        <FormLabel id="choose-reason-group">Choose reason</FormLabel>
        <RadioGroup
          aria-labelledby="choose-reason-group"
          name="radio-reason-group"
          value={reason}
          onChange={handleChangeReason}
        >
          {REASONS.map((reasonObj, key) => {
            return (
              <FormControlLabel
                key={key}
                value={reasonObj.value}
                control={<Radio />}
                label={reasonObj.label}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default CancelChooseReason;
