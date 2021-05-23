import { useState } from 'react';

function Login({ handleLogin }) {
   const [userData, setUserData] = useState({
      password: '',
      email: ''
   })

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
      if (!password || !email) {
         return;
      }
      handleLogin(evt, password, email);
   }


   return (
      <>
         <div className='auth'>
            <p className="auth-title">Вход</p>
            <form
               className="auth__form"
               name="login-form"
               onSubmit={handleSubmit}>
               <fieldset className="auth__fieldset">
                  <input
                     type="email"
                     name="email"
                     value={userData.email}
                     className="auth__input"
                     onChange={handleChange}
                     placeholder="Email"
                  />
                  <input
                     type="password"
                     name="password"
                     value={userData.password}
                     className="auth__input"
                     onChange={handleChange}
                     placeholder="Пароль"
                  />
               </fieldset>
               <button className="auth__button" type="submit">Войти</button>
            </form>
         </div>
      </>
   )
}
export default Login;