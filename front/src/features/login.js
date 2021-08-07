import React from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'

const Login = () => {

    const submit = (values,actions) =>{
        alert(JSON.stringify(values, null, 2))
        actions.resetForm();
    }

    const loginSchema = Yup.object().shape({
        email: Yup.string().email("Email invalide").required("Email obligatoire"),
        password: Yup.string().required("Mot de passe obligatoire").min(8,"Le mot de passe doit contenir au moins 8 caractères")
    })

    return (
        <section className="login-section">
            <Formik
                onSubmit = { submit }
                initialValues = {{ email:'', password:''}}
                validationSchema = { loginSchema }
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
                        <h1>Connexion</h1>
                        <div className="container-input">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                value={values.email}
                                onChange = { handleChange }
                                onBlur={ handleBlur }
                            />
                            {errors.email && touched.email &&
                                <span className="display-errors">{errors.email}</span>
                            }
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={values.password}
                                onChange = { handleChange }
                                onBlur={ handleBlur}
                            />
                            {errors.password && touched.password &&
                                <span className="display-errors">{errors.password}</span>
                            }
                            <button type="submit" className="btn-submit">Se connecter</button>
                        </div>
                        <Link to="/resetpassword" className="reset-password">Mot de passe oublié ?</Link>
                    </form>
            )}
            </Formik>
        </section>
    )
}

export default Login