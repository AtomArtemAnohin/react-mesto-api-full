function ImagePopup(props) {
   return (
      <>
         <div className={`popup popup_${props.name} ${props.card && 'popup_visible'}`}>
            <div className="popup__container-modal">
               <img className="popup__image popup__image_modal" src={`${props.card && props.card.link}`} alt="Изображение" />
               <p className="popup__name popup__name_modal">{props.card && props.card.name}</p>
               <button className="button popup__close popup__close-modal" aria-label="Закрыть" type="button" onClick={props.onClose}></button>
            </div>
         </div>
      </>
   )
};
export default ImagePopup;