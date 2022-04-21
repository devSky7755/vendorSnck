import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  CancelChooseReason,
  CancelUvSeltems,
  CancelUvChooseAction,
  CancelOther
} from './index';
interface IStep {
  value: number;
  payload: any;
}

const CancelOrderBoard = ({ handleClose }) => {
  const [step, setStep] = useState<IStep>({ value: 1, payload: {} });

  useEffect(() => {
    if (step.value === 5) {
      // TODO submit step.payload
      if (step.payload?.isOther) {
      } else {
      }
      handleClose({
        action: 'cancel',
        payload: step.payload
      });
    }
  }, [step]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1
      }}
    >
      {step.value === 1 && <CancelChooseReason setStep={setStep} />}
      {step.value === 2 && (
        <CancelUvSeltems
          setStep={setStep}
          selectedItems={step.payload?.selectedItems || []}
        />
      )}
      {step.value === 3 && (
        <CancelUvChooseAction
          setStep={setStep}
          selectedItems={step.payload?.selectedItems || []}
        />
      )}
      {step.value === 4 && <CancelOther setStep={setStep} />}
    </Box>
  );
};

export default CancelOrderBoard;
