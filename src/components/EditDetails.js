import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editUserDetails } from '../redux/user/userActions'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 20
    }
}))

function EditDetails() {
    return <div>Edit Details Component</div>
}

export default EditDetails
