import React, {useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const WelcomeToast = (props) => {

    const [open, setOpen] = useState(true);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical:'bottom', horizontal: 'center'} } key={'top' + 'center'}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}
export default WelcomeToast