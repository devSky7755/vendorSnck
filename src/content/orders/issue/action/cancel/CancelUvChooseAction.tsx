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
import { UV_SEL_ITEMS_CHOOSE_ACTION } from '../../contants';

/*-----Step 3-----*/
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

  const prev = () => {
    setStep({
      value: 2,
      payload: {
        selectedItems
      }
    });
  };

  const submit = () => {
    setStep({
      value: 5,
      payload: {
        isOther: false,
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
      <ButtonGroup
        variant="contained"
        aria-label="contained button group"
        fullWidth
      >
        <Button onClick={prev}>Prev</Button>
        <Button
          onClick={submit}
          disabled={selectedItems.length === 0 || selectedActions.length === 0}
        >
          Submit
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CancelUvChooseAction;
