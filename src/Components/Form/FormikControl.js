import React from 'react'
import Input from "./Input"
import Textarea from "./Textarea";
import Select from "./Select";
import Radio from "./Radio";
import CheckboxGroup from "./CheckboxGroup";
import DateChoose from "./DateChoose";

const FormikControl = (props) => {
    const {control, ...rest} = props
    switch (control) {
        case 'input':
            return <Input {...rest}/>
        case 'textarea':
            return <Textarea {...rest}/>
        case 'select':
            return <Select {...rest}/>
        case 'radio':
            return <Radio {...rest}/>
        case 'checkbox ':
            return <CheckboxGroup {...rest}/>
        case 'date':
            return <DateChoose {...rest}/>
        default: return null
    }
}
export default FormikControl