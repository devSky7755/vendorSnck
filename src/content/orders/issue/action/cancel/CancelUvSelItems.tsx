import {
  Box,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  ButtonGroup,
  Button,
  styled
} from '@mui/material';
import { useEffect, useState } from 'react';
import { UV_ITEMS } from '../../contants';

const NexButtonWrapper = styled(Box)(
  ({ theme }) => `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 10px;
    `
);

/*-----Step 2-----*/
const CancelUvSelItems = ({ setStep, selectedItems }) => {
  const [uvObjs, setUvObjs] = useState(
    UV_ITEMS.map((uv) => {
      if (
        selectedItems.find((si) => {
          return si.value === uv.value;
        })
      ) {
        return {
          checked: true,
          ...uv
        };
      }
      return {
        checked: false,
        ...uv
      };
    })
  );

  const [selItems, setSelItems] = useState([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => {
    const value: boolean = (event.target as HTMLInputElement).checked;
    const nUvObjs = uvObjs.map((uv, index) => {
      if (index === key) {
        return {
          ...uv,
          checked: value
        };
      } else return { ...uv };
    });
    setUvObjs(nUvObjs);
  };

  useEffect(() => {
    setSelItems(
      uvObjs.filter((obj) => {
        return obj.checked;
      })
    );
  }, [uvObjs]);

  const goPrevStep = () => {
    setStep({
      value: 1,
      payload: {}
    });
  };

  const goNextStep = () => {
    setStep({
      value: 3,
      payload: {
        selectedItems: selItems
      }
    });
  };

  return (
    <>
      <FormControl>
        <FormLabel id="choose-uv-group">Select unavailable item(s)</FormLabel>
        {uvObjs.map((uvObj, key) => {
          return (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={uvObj.checked}
                  onChange={(e) => handleChange(e, key)}
                />
              }
              label={uvObj.label}
            />
          );
        })}
      </FormControl>
      <ButtonGroup
        variant="contained"
        aria-label="contained button group"
        fullWidth
      >
        <Button onClick={goPrevStep}>Prev</Button>
        <Button onClick={goNextStep} disabled={selItems.length === 0}>
          Next
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CancelUvSelItems;
