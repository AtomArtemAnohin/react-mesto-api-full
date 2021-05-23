import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect, useState } from "react";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
   const currentUser = useContext(CurrentUserContext);
   const [name, setName] = useState(currentUser.name);
   const [description, setDescription] = useState(currentUser.about);

   function handleChangeName(evt) {
      setName(evt.target.value);
   }

   function handleChangeDescription(evt) {
      setDescription(evt.target.value);
   }

   function handleSubmit(evt) {
      evt.preventDefault();
      onUpdateUser({
         name,
         about: description
      });
   }

   useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
   }, [currentUser]);

   return (
      <PopupWithForm title='Редактировать профиль' name='type_edit'
         isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>

         <input
            className="popup__input popup__input_type_title"
            placeholder="Имя"
            id="name-user"
            name="name"
            type="text"
            value={name}
            minLength={2}
            maxLength={40}
            required
            autoComplete="off"
            onChange={handleChangeName} />

         <span className="error" id="name-user-error"></span>
         <input
            className="popup__input popup__input_type_image"
            placeholder="Ваша деятельность"
            id="job-user"
            name="feature"
            type="text"
            value={description}
            minLength={2}
            maxLength={200}
            required
            autoComplete="off"
            onChange={handleChangeDescription} />

         <span className="error" id="job-user-error"></span>
         <button className="button popup__button" type="submit">Сохранить</button>
      </PopupWithForm>
   )
}
export default EditProfilePopup;