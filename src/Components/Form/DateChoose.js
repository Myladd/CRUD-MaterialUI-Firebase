import React from 'react'
import {Field, ErrorMessage} from 'formik'
import DatePicker from "react-multi-date-picker"
import TextError from "./TextError";

const DateChoose = (props) => {
    const {label, name, ...rest} = props
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Field name={name}>
                {
                    ({form, field}) => {
                        const {setFieldValue} = form
                        const {value} = field
                        return <DatePicker id={name} {...field} {...rest} value={value} onChange={val => setFieldValue(name, val)}/>
                    }
                }
            </Field>
            <ErrorMessage name={TextError}/>
        </div>
    )
}
export default DateChoose