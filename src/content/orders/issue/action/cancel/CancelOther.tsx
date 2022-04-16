import { Button, TextField } from '@mui/material';
import { useState } from 'react';

/*-----Step 4-----*/
const CancelOther = ({ setStep }) => {
  const [reason, setReason] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
  };

  const submit = () => {
    setStep({
      value: 5,
      payload: {
        isOther: true,
        reason
      }
    });
  };

  return (
    <>
      <TextField
        id="reason-input"
        required
        label="Input reason to cancel"
        variant="standard"
        value={reason}
        onChange={handleChange}
      />
      <Button onClick={submit} variant="contained" disabled={!reason}>
        Submit
      </Button>
    </>
  );
};

export default CancelOther;
