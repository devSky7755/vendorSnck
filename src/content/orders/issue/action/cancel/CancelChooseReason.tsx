import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material';
import { useState } from 'react';
import { REASONS } from '../../contants';

/*-----Step 1-----*/
const CancelChooseReason = ({ setStep }) => {
  const [reason, setReason] = useState('');

  const handleChangeReason = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: any = (event.target as HTMLInputElement).value;
    setReason(value);
    setStep({
      value: value === REASONS[0].value ? 2 : 4,
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
