import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
   const inputAvatar = useRef();

   function handleSubmit(evt) {
      evt.preventDefault();
      onUpdateAvatar({
         avatar: inputAvatar.current.value
      });
      inputAvatar.current.value = '';
   }

   return (
      <PopupWithForm
         name='edit-avatar'
         title='Обновить аватар'
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit} >
         <input
            id="edit-avatar"
            name="avatar"
            required
            className="popup__input"
            placeholder="Введите ссылку на фото"
            type="url"
            ref={inputAvatar}
            autoComplete="off" />

         <span className="error" id="edit-avatar-error"></span>
         <button className="button popup__button" type="submit">Сохранить</button>
      </PopupWithForm>
   )
}

export default EditAvatarPopup;