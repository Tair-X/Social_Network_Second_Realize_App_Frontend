import React from 'react';
import {Field, Form, Formik} from "formik";
import s from "../../components/Users/users.module.css"

const usersSearchFormValidate=(values)=>{
    const errors={}
    return errors
}

let UsersSearchForm=(props)=>{

    const submit=(values,{setSubmitting})=>{
        let filter={
            term:values.term,
            friend:values.friend=="null"?null:values.friend=="false"?false:true
        }

                props.onFilterChanged(filter);
                setSubmitting(false)


    };


    return(<div className={s.usersSearchForm}>
        <Formik initialValues={{term: '',friend:null}}
                validate={usersSearchFormValidate} onSubmit={submit}
        >
            {({isSubmitting})=>(
                <Form >
                    <Field className={s.searchFormData} type="text" name="term"/>
                    <Field className={s.searchFormData} as="select" name="friend">
                        <option value="null">All</option>
                        <option value="true">Followed</option>
                        <option value="false">Unfollowed</option>
                    </Field>

                    <div className={s.searchFormDataButton}>
                    <button className={"button1"} type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                    </div>
                </Form>

            )}

        </Formik>
    </div>)
}

export default UsersSearchForm;