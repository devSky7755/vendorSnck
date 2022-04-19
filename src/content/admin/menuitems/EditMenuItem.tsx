import { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { MenuItem as MenuItemModel } from 'src/models/menu_item';
import { styled, Box, Button, DialogActions, Grid, IconButton, Switch, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const DialogSubtitle = styled(Typography)(
    ({ theme }) => `
          color: #00000099;
  `
);

interface EditMenuItemInterface {
    onAction: Function;
    open: boolean;
    menuItem?: MenuItemModel;
};

const EditMenuItemDialog: React.FC<EditMenuItemInterface> = (props) => {
    const { onAction, menuItem, open } = props;
    const [editing, setEditingMenuItem] = useState(menuItem);
    const [showError, setShowError] = useState(false);

    const isNew = !menuItem.name

    const validateInput = () => {
        if (!editing.name || editing.name.trim().length === 0) return false;
        return true;
    }

    const handleSave = () => {
        if (validateInput()) {
            onAction('Save', editing);
        } else {
            setShowError(true);
        }
    }

    const tags = editing.tags || [];

    return (
        <Dialog onClose={() => {
            onAction('Close');
        }} open={open} PaperProps={{ style: { width: 1280, maxWidth: 1280 } }}>
            <DialogTitle className='border-bottom d-flex' sx={{ px: 2, py: 1 }}>
                <Typography component='span' variant='h6'>Edit Menu Item</Typography>
                <IconButton className='float-right' sx={{ p: 0 }} size='small' onClick={() => {
                    onAction('Close');
                }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Box>
                <Box sx={{ p: 1 }} style={{ background: '#0000000A' }}>
                    <Switch checked={editing.available || false} onChange={e => {
                        setEditingMenuItem({
                            ...editing,
                            available: e.target.checked
                        })
                    }} ></Switch> <Typography component='span' variant='subtitle1'>Available</Typography>
                </Box>
                <Box sx={{ px: 2, py: 2 }} className='border-bottom'>
                    <DialogSubtitle variant='subtitle1' sx={{ pb: 2 }}>Menu Item Details</DialogSubtitle>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                label="Menu Item Name"
                                size='small'
                                required
                                error={showError && (!editing.name || editing.name.trim().length === 0)}
                                fullWidth
                                value={editing.name || ''}
                                onChange={(e) => {
                                    setEditingMenuItem({
                                        ...editing,
                                        name: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Menu Item Description"
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                value={editing.description || ''}
                                onChange={(e) => {
                                    setEditingMenuItem({
                                        ...editing,
                                        description: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Menu Item Image"
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                InputProps={{
                                    endAdornment: <Button size='small' style={{ whiteSpace: 'nowrap' }}>UPDATE IMAGE</Button>,
                                }}
                                value={editing.imageUrl || ''}
                                onChange={(e) => {
                                    setEditingMenuItem({
                                        ...editing,
                                        imageUrl: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ px: 2, py: 2 }} className='border-bottom'>
                    <Box>
                        <DialogSubtitle variant='subtitle1' sx={{ pb: 2 }}>Menu Tags</DialogSubtitle>
                    </Box>
                    <Grid container spacing={2}>
                        {
                            tags.map((tag, index) => {
                                return (
                                    <Grid item xs={12} md={3} key={index}>
                                        <TextField
                                            label={"Menu Tag " + (index + 1)}
                                            size='small'
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            InputProps={
                                                index === tags.length - 1 ? (
                                                    {
                                                        endAdornment: <IconButton onClick={e => {
                                                            let newTags = [...tags];
                                                            newTags.pop();
                                                            setEditingMenuItem({
                                                                ...editing,
                                                                tags: newTags
                                                            });
                                                        }} size='small' style={{ whiteSpace: 'nowrap' }}>
                                                            <DeleteForeverOutlinedIcon fontSize='small' htmlColor='black' />
                                                        </IconButton>,
                                                    }
                                                ) : ({})
                                            }
                                            value={tag}
                                            onChange={(e) => {
                                                let newTags = [...tags];
                                                newTags[index] = e.target.value;
                                                setEditingMenuItem({
                                                    ...editing,
                                                    tags: newTags
                                                });
                                            }}
                                        >
                                        </TextField>
                                    </Grid>
                                )
                            })
                        }
                        <Grid item xs={12}>
                            <Button color='primary' size='small' onClick={e => {
                                setEditingMenuItem({
                                    ...editing,
                                    tags: [...tags, '']
                                });
                            }}>+ Add Tag</Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ px: 2, py: 2 }} className='border-bottom'>
                    <Box>
                        <DialogSubtitle variant='subtitle1' sx={{ pb: 2 }}>Other Settings</DialogSubtitle>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                            <Switch checked={editing.containsAlcohol || false} onChange={e => {
                                setEditingMenuItem({
                                    ...editing,
                                    containsAlcohol: e.target.checked
                                })
                            }}></Switch>Alcohol
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <Switch checked={editing.mostPopular || false} onChange={e => {
                                setEditingMenuItem({
                                    ...editing,
                                    mostPopular: e.target.checked
                                })
                            }}></Switch>
                            Featured
                        </Grid>
                    </Grid>
                </Box>
            </Box >
            <DialogActions sx={{ py: 2 }}>
                {
                    !isNew &&
                    <Button color='primary' size='small' variant='outlined' style={{ width: 200, height: 40 }} onClick={() => {
                        onAction('Delete', menuItem);
                    }}>
                        <InfoOutlinedIcon sx={{ mr: 2 }} fontSize='small'></InfoOutlinedIcon>
                        Delete
                    </Button>
                }
                <Button color='primary' variant='contained' style={{ width: 200, height: 40 }} onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog >
    );
}

export default EditMenuItemDialog;
