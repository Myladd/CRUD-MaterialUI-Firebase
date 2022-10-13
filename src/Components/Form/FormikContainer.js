import React from "react"
import {Formik, Form} from "formik";
import * as Yup from 'yup'
import FormikControl from "./FormikControl";
import Button from "@mui/material/Button";
import { format } from 'date-fns'

const FormikContainer = () => {
    const dropdownOptions = [
        {key: 'Select an option', value: ''},
        {key: 'Option 1', value: 'option1'},
        {key: 'Option 2', value: 'option2'},
        {key: 'Option 3', value: 'option3'},
    ]

    const radioOptions = [
        {key: 'Select an option', value: ''},
        {key: 'Option 1', value: 'rOption1'},
        {key: 'Option 2', value: 'rOption2'},
        {key: 'Option 3', value: 'rOption3'},
    ]

    const checkboxOptions = [
        {key: 'Select an option', value: ''},
        {key: 'Option 1', value: 'cOption1'},
        {key: 'Option 2', value: 'cOption2'},
        {key: 'Option 3', value: 'cOption3'},
    ]

    const initialValues = {
        email: "",
        description: "",
        selectOption: "",
        radioOption: "",
        checkboxOption: [],
        birthDate: null
    }
    const validationSchema = Yup.object({
        email: Yup.string().required("required"),
        description: Yup.string().required("required"),
        selectOption: Yup.string().required("required"),
        radioOption: Yup.string().required("required"),
        checkboxOption: Yup.array().required("required"),
        birthDate: Yup.date().required("required").nullable()
    })
    const onSubmit = values => {
        const {birthDate} = values
        console.log(format(birthDate.toDate(), 'dd/mm/yyyy'))
        // console.log(birthDate.toDate(), )
        console.log("form data", values)
        console.log("saved data", JSON.parse(JSON.stringify(values)))
    }
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {formik => (
                    <Form>
                        <FormikControl control='input' type='email' label='Email' name='email'/>
                        <FormikControl control='textarea' label='description' name='description'/>
                        <FormikControl control='select' label='Select a topic' name='selectOption' options={dropdownOptions}/>
                        <FormikControl control='radio' label='Radio topic' name='radioOption' options={radioOptions}/>
                        <FormikControl control='checkbox' label='Checkbox topics' name='checkboxOption' options={checkboxOptions}/>
                        <FormikControl control='date' label='Pick a date' name='birthDate'/>
                        <Button type='submit' variant="contained">Submit</Button>
                    </Form>
                )}
        </Formik>
    )
}
export default FormikContainer