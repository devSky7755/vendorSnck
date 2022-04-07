import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 42px;
`;

interface InputSliderProps {
    label?: string,
    defaultValue?: number,
    maxValue?: number,
    onChange?: Function
}

const InputSlider: React.FC<InputSliderProps> = (props) => {
    const [value, setValue] = React.useState<number | string | Array<number | string>>(
        props.defaultValue || 20,
    );

    useEffect(() => {
        if (props.onChange) {
            props.onChange(value);
        }
    }, [value])

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        const maxValue = props.maxValue || 100;
        if (value < 0) {
            setValue(0);
        } else if (value > maxValue) {
            setValue(maxValue);
        }
    };

    return (
        <Box>
            {
                props.label &&
                <Typography id="input-slider" gutterBottom>
                    {props.label}
                </Typography>
            }
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        max={props.maxValue || 100}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={value}
                        disableUnderline
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: props.maxValue || 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default InputSlider;