import { Grid, Select, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { SportEvent } from 'src/models/sports_event';

const tempEvents: SportEvent[] = [
    {
        id: 0,
        starttime: 0,
        endtime: 0,
        name: 'Basketball AU vs SV',
        description: '02/02/2021 11:15 AM - 2:00 PM Basketball AU vs SV',
    },
    {
        id: 1,
        starttime: 0,
        endtime: 0,
        name: 'Basketball Round 1',
        description: '02/02/2021 11:15 AM - 2:00 PM Basketball Round 1',
    },
    {
        id: 2,
        starttime: 0,
        endtime: 0,
        name: 'Basketball Round 2',
        description: '02/02/2021 11:15 AM - 2:00 PM Basketball Round 2',
    }
];

function EventSelector() {
    const [selected, setSelected] = useState(0);

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    return (
        <Grid container alignItems="center">
            <Grid item>
                <Typography sx={{ mr: 1 }} variant='body2' color={'rgba(0, 0, 0, 0.6)'}>Event:</Typography>
            </Grid>
            <Grid item>
                <Select
                    variant='standard'
                    value={selected}
                    disableUnderline
                    onChange={handleChange}
                >
                    {
                        tempEvents.map(ev => {
                            return (
                                <MenuItem key={ev.id} value={ev.id}>{ev.description}</MenuItem>
                            )
                        })
                    }
                </Select>
            </Grid>
        </Grid>
    );
}

export default EventSelector;
