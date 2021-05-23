import PopupWithForm from "./PopupWithForm";
import { useState } from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
   const [name, setName] = useState('');
   const [link, setLink] = useState('');

   function handleCardNameChange(evt) {
      setName(evt.target.value);
   }

   function handleCardLinkChange(evt) {
      setLink(evt.target.value);
   }

   function handleSubmit(evt) {
      evt.preventDefault();
      onAddPlace({
         name,
         link
      });
      setName('');
      setLink('');
   }

   return (
      <PopupWithForm
         name='cards'
         title='Новое место'
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit} >

         <input
            className="popup__input"
            id="name-title"
            placeholder="Название"
            name="name"
            type="text"
            minLength={2}
            maxLength={30}
            required
            value={name}
            onChange={handleCardNameChange}
            autoComplete="off" />

         <span id="name-title-error" className="error"></span>
         <input
            className="popup__input"
            id="url-image"
            placeholder="Ссылка на картинку"
            type="url"
            name="link"
            value={link}
            onChange={handleCardLinkChange}
            required
            autoComplete="off" />
         <span className="error" id="url-image-error"></span>
         <button className="button popup__button" type="submit">Создать</button>
      </PopupWithForm>
   )
}
export default AddPlacePopup;