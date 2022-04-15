import {
  Box,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
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

const CancelUvSelItems = ({ setStep }) => {
  const [uvObjs, setUvObjs] = useState(
    UV_ITEMS.map((uv) => {
      return {
        checked: false,
        ...uv
      };
    })
  );

  const [selectedItems, setSelectedItems] = useState([]);

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
    setSelectedItems(
      uvObjs.filter((obj) => {
        return obj.checked;
      })
    );
  }, [uvObjs]);

  const goNextStep = () => {
    setStep({
      value: 3,
      payload: {
        selectedItems
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
      <NexButtonWrapper>
        <Button
          fullWidth
          variant="contained"
          onClick={goNextStep}
          disabled={selectedItems.length === 0}
        >
          Next
        </Button>
      </NexButtonWrapper>
    </>
  );
};

export default CancelUvSelItems;
