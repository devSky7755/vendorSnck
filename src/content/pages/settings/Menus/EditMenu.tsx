import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { MenuItem as MenuItemModel } from 'src/models/menu_item';
import { Box, Button, Checkbox, DialogActions, Grid, IconButton, MenuItem, Switch, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MuiPhoneNumber from 'material-ui-phone-number';
import CheckboxMultiSelect from 'src/components/MultiSelect/CheckboxSelect';


interface EditMenuInterface {
    onClose: Function,
    open: boolean,
    menu?: MenuItemModel,
};

const MenuCategories = [
    {
        value: 'Hot Dog',
        label: 'Hot Dog',
    },
    {
        value: 'Soft Drinks',
        label: 'Soft Drinks',
    }
];

const tags = [
    'Gluten Free',
    'Favorite',
    'Spicy'
];

const addons = [
    'Napkins',
    'Ketchup'
];

const EditMenuDialog: React.FC<EditMenuInterface> = (props) => {
    const { onClose, menu, open } = props;
    const [editing, setEditingMenu] = useState(menu)

    const handleClose = () => {
        onClose(editing);
    };

    return (
        <Dialog onClose={() => {
            onClose(null);
        }} open={open} PaperProps={{ style: { maxWidth: 400 } }}>
            <DialogTitle className='border-bottom d-flex font-bold' sx={{ px: 2, py: 1 }}>
                Edit Menu
                <IconButton className='float-right' sx={{ p: 0 }} size='small' onClick={() => {
                    onClose(null);
                }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Box>
                <Box sx={{ p: 1 }} style={{ background: '#0000000A' }}>
                    <Switch ></Switch> <b>Available</b>
                </Box>

                <Box sx={{ px: 2, py: 2 }} className='border-bottom'>
                    <Typography variant='h5' sx={{ pb: 2 }}>Menu Details</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                size='small'
                                fullWidth
                                value={editing.name}
                                onChange={(e) => {
                                    setEditingMenu({
                                        ...editing,
                                        name: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="Category"
                                size='small'
                                fullWidth
                                value={editing.category}
                                onChange={(e) => {
                                    setEditingMenu({
                                        ...editing,
                                        category: e.target.value
                                    });

                                }}
                            >
                                {MenuCategories.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Price"
                                type={'number'}
                                size='small'
                                fullWidth
                                value={editing.price}
                                inputMode='decimal'
                                InputProps={{ inputProps: { min: 0, max: 100 } }}
                                onChange={(e) => {
                                    if (Number(e.target.value)) {
                                        setEditingMenu({
                                            ...editing,
                                            price: Number(e.target.value)
                                        });
                                    }
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <CheckboxMultiSelect
                                label="Addons"
                                names={addons}
                            >
                            </CheckboxMultiSelect>
                        </Grid>
                        <Grid item xs={12}>
                            <CheckboxMultiSelect
                                label="Tags"
                                names={tags}
                            >
                            </CheckboxMultiSelect>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                size='small'
                                fullWidth
                                value={editing.description}
                                onChange={(e) => {
                                    setEditingMenu({
                                        ...editing,
                                        description: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ px: 1, py: 1 }} className='border-bottom'>
                    <Grid container>
                        <Grid item xs={12}>
                            <Checkbox size='small'></Checkbox>Alchol
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <DialogActions sx={{ py: 2 }}>
                <Button color='primary' variant='contained' fullWidth onClick={handleClose}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditMenuDialog;
