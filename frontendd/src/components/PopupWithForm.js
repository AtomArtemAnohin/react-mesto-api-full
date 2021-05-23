import React from 'react';


function PopupWithForm(props) {
   return (
      <>
         <div className={`popup popup_${props.name} ${props.isOpen && 'popup_visible'}`}>
            <div className="popup__container">
               <button className="button popup__close popup__close_cards" aria-label="Закрыть" type="button" onClick={props.onClose}></button>

               <form className="popup__form" action="#" name={props.name} onSubmit={props.onSubmit} noValidate>
                  {props.statusImage &&
                     <img src={props.statusImage} alt="Статус запроса" className="popup-modal__image popup__image_type_status" />}
                  <h2 className="popup__title">{props.title}</h2>
                  {props.children}

               </form>

            </div>
         </div>
      </>
   )
};
export default PopupWithForm;