import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editUserDetails } from '../redux/user/userActions'
import {
    Tooltip,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    CircularProgress
} from '@material-ui/core'
import { Edit as EditIcon, Add as AddIcon, Close as CloseIcon } from '@mui/icons-material'

import MyButton from '../util/MyButton'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    textField: {
        margin: '10px auto'
    },
    submitButton: {
        // position: 'relative'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        // position: '',
        // // left: '20%',
        // top: '10%'
    }
}))


function PostBroadcast() {
    const dispatch = useDispatch()
    const classes = useStyles()
    const loading = useSelector(state => state.ui.loading)

    const [isOpen, setIsOpen] = useState(false)
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState({})

    const handleOpen = () => {
        setIsOpen(() => true)
    }
    const handleClose = () => {
        setIsOpen(() => false)
    }
    const handleSubmit = () => {

    }
    const handleChange = () => {

    }


    return (
        <>
            <MyButton onClick={handleOpen} tip='Create a Broadcast!'>
                <AddIcon />
            </MyButton>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth='sm'>
                <DialogTitle>Post a new Broadcast</DialogTitle>
                <MyButton tip='Close' onClick={handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon />
                </MyButton>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name='body'
                            type='text'
                            label='BROADCAST!'
                            multiline
                            rows='3'
                            placeholder='What do you want to Broadcast?'
                            error={errors.body ? true : false}
                            helperText={errors.body}
                            className={classes.textField}
                            onChange={handleChange}
                            fullWidth
                        >
                        </TextField>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submitButton}
                        // disabled={loading}
                        >
                            Submit
                            {loading && <CircularProgress size={30} className={classes.progressSpinner} />}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default PostBroadcast