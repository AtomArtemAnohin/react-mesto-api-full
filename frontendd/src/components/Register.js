import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegister }) {
   const [userData, setUserData] = useState({
      password: '',
      email: ''
   });

   function handleChange(evt) {
      const { name, value } = evt.target;
      setUserData({
         ...userData,
         [name]: value
      })
   }

   function handleSubmit(evt) {
      evt.preventDefault();
      const { password, email } = userData;
      handleRegister(evt, password, email);
   }



   return (
      <>
         <div className='auth'>
            <p className="auth-title">Регистрация</p>
            <form
               className="auth__form"
               name="register-form"
               onSubmit={handleSubmit}>
               <input
                  type="email"
                  name="email"
                  value={userData.email}
                  className="auth__input"
                  onChange={handleChange}
                  placeholder="Email"
                  required
               />
               <input
                  type="password"
                  name="password"
                  value={userData.password}
                  className="auth__input"
                  onChange={handleChange}
                  placeholder="Пароль"
                  required
               />
               <button className="auth__button" type="submit">Зарегестрироваться</button>
            </form>
            <Link to="./sign-in" className="auth-subtitle"><span>Уже зарегистрированы?</span> Войти</Link>
         </div>
      </>
   )
}
export default Register;