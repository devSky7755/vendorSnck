import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const CancelOrder = ({}) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<IStep>({ value: 1, payload: {} });

  useEffect(() => {
    if (step.value === 5) {
      navigate(-2);
    }
  }, [step]);
  return (
    <>
      {step.value === 1 && <CancelChooseReason setStep={setStep} />}
      {step.value === 2 && <CancelUvSeltems setStep={setStep} />}
      {step.value === 3 && (
        <CancelUvChooseAction
          setStep={setStep}
          selectedItems={step.payload?.selectedItems}
        />
      )}
      {step.value === 4 && <CancelOther setStep={setStep} />}
    </>
  );
};

export default CancelOrder;
