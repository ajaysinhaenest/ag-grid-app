import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'

interface Idata {
    name: string
    email: string
    phone: string
    dob: string
    id: string
}

interface Props {
    open: boolean
    handleClose: () => void
    data: Idata
    onChange: (e: any) => void
    handleFormSubmit: () => void
}

export default function FormDialog({
    open,
    handleClose,
    data,
    onChange,
    handleFormSubmit,
}: Props) {
    const { id, name, email, phone, dob } = data

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {id ? 'Update user' : 'Create new user'}
                </DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            id='name'
                            value={name}
                            onChange={(e) => onChange(e)}
                            placeholder='Enter name'
                            label='Name'
                            variant='outlined'
                            margin='dense'
                            fullWidth
                        />
                        <TextField
                            id='email'
                            value={email}
                            onChange={(e) => onChange(e)}
                            placeholder='Enter email'
                            label='Email'
                            variant='outlined'
                            margin='dense'
                            fullWidth
                        />
                        <TextField
                            id='phone'
                            value={phone}
                            onChange={(e) => onChange(e)}
                            placeholder='Enter phone number'
                            label='Phone Number'
                            variant='outlined'
                            margin='dense'
                            fullWidth
                        />
                        <TextField
                            id='dob'
                            value={dob}
                            onChange={(e) => onChange(e)}
                            placeholder='Enter Date of birth'
                            label='Date of Birth'
                            variant='outlined'
                            margin='dense'
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color='secondary'
                        variant='outlined'
                    >
                        Cancel
                    </Button>
                    <Button
                        color='primary'
                        onClick={() => handleFormSubmit()}
                        variant='contained'
                    >
                        {id ? 'Update' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
