import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface CheckboxMultiSelectProps {
    names: string[],
    label?: string,
    onChange?: Function
}

const CheckboxMultiSelect: React.FC<CheckboxMultiSelectProps> = (props) => {
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl fullWidth size='small'>
                {
                    props.label &&
                    <InputLabel id="demo-multiple-checkbox-label">{props.label}</InputLabel>
                }
                <Select
                    multiple
                    fullWidth
                    size='small'
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput size='small' fullWidth label={props.label} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {props.names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox size='small' checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default CheckboxMultiSelect;