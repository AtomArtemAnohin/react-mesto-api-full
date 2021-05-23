import PopupWithForm from './PopupWithForm';

function InfoTooltip({ isOpen, onClose, statusImage, statusMessage }) {
   return (
      <PopupWithForm
         isOpen={isOpen}
         onClose={onClose}
         name="sign-status"
         statusImage={statusImage}
         title={statusMessage}
      />
   )
}

export default InfoTooltip;