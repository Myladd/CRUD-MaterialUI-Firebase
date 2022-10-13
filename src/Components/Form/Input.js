import React from 'react'
import {Field ,ErrorMessage} from "formik";
import TextError from "./TextError";
import TextField from "@mui/material/TextField";


const Input = (props) => {
    const {label, name, ...rest} = props
    return (
        <div className="form-control">
            <label htmlFor={name}>{name}</label>
            <Field id={name} name={name} {...rest}/>
            {/*<TextField id="outlined-basic" label="Username" variant="outlined"/>*/}
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}
export default Input