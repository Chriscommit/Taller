import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

const Register = () => {

    const submit = (values,actions) =>{
        alert(JSON.stringify(values, null, 2))
        actions.resetForm();
    }

    const registerSchema = Yup.object().shape({
        name: Yup.string().min(2,"Votre nom doit faire minimum de 2 caractères").required("Le nom est requis"),
        email: Yup.string().email("Email invalide").required("L'email est requis"),
        password: Yup.string().min(8,"Le mot de passe doit contenir au moins 8 caractères").required("Mot de passe obligatoire"),
        password2: Yup.string().min(8,"Le mot de passe doit contenir au moins 8 caractères").required("Mot de passe obligatoire")
    })

    return (
        <section className="register-section">
            <Formik
                onSubmit={ submit }
                initialValues= {{name:"",email:"",password:"",password2:""}}
                validationSchema= { registerSchema }
            >
                {({
                    values,
                    handleSubmit,
                    handleBlur,
                    handleChange,
                    errors,
                    touched
                }) => (
                    <form onSubmit = { handleSubmit }>
                        <h1>Inscription</h1>
                        <div className="container-input">
                            <label htmlFor="name">Nom</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={ values.name }
                                onChange = { handleChange }
                                onBlur = { handleBlur }
                            />
                                {errors.name && touched.name &&
                                    <span className="display-errors">{errors.name}</span>
                                }
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={values.email}
                                onChange = { handleChange }
                                onBlur = { handleBlur }
                            />
                                {errors.email && touched.email &&
                                    <span className="display-errors">{errors.email}</span>
                                }
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={ values.password }
                                onChange = { handleChange }
                                onBlur = { handleBlur }
                            />
                                {errors.password && touched.password &&
                                    <span className="display-errors">{errors.password}</span>
                                }
                            <label htmlFor="password2">Confirmer le mot de passe</label>
                            <input
                                type="password"
                                id="password2"
                                name="password2"
                                value={ values.password2 }
                                onChange = { handleChange }
                                onBlur = { handleBlur }
                            />
                                {errors.password2 && touched.password2 &&
                                    <span className="display-errors">{errors.password2}</span>
                                }
                            <button type="submit" className="btn-submit">S'enregistrer</button>
                        </div>
                    </form>
                )}
            </Formik>
        </section>
    )
}

export default Register