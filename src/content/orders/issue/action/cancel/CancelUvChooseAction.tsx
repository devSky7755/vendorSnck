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
import { UV_ITEMS, UV_SEL_ITEMS_CHOOSE_ACTION } from '../../contants';

const NexButtonWrapper = styled(Box)(
  ({ theme }) => `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 10px;
    `
);

const CancelUvChooseAction = ({ setStep, selectedItems }) => {
  const [uvActionObjs, setUvActionObjs] = useState(
    UV_SEL_ITEMS_CHOOSE_ACTION.map((uva) => {
      return {
        checked: false,
        ...uva
      };
    })
  );
  const [selectedActions, setSelectedActions] = useState([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => {
    const value: boolean = (event.target as HTMLInputElement).checked;
    const nUvAObjs = uvActionObjs.map((uva, index) => {
      if (index === key) {
        return {
          ...uva,
          checked: value
        };
      } else return { ...uva };
    });
    setUvActionObjs(nUvAObjs);
  };

  useEffect(() => {
    setSelectedActions(
      uvActionObjs.filter((obj) => {
        return obj.checked;
      })
    );
  }, [uvActionObjs]);

  const submit = () => {
    setStep({
      value: 5,
      payload: {
        selectedItems,
        selectedActions
      }
    });
  };

  return (
    <>
      <FormControl>
        <FormLabel id="choose-uv-group">Select unavailable item(s)</FormLabel>
        {uvActionObjs.map((uvObj, key) => {
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
          onClick={submit}
          disabled={selectedItems.length === 0 || selectedActions.length === 0}
        >
          Submit
        </Button>
      </NexButtonWrapper>
    </>
  );
};

export default CancelUvChooseAction;
