import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

const Card = (props) => {
   const currentUser = useContext(CurrentUserContext);

   // Определяем, являемся ли мы владельцем текущей карточки
   const isOwn = props.card.owner._id === currentUser._id;
   const cardDeleteButtonClassName = (
      `button ${isOwn ? 'button_trash' : 'button_hidden'}`
   );

   // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
   const isLiked = props.card.likes.some(i => i._id === currentUser._id);
   const cardLikeButtonClassName = (
      `button ${isLiked ? 'button_active' : 'button_like'}`
   );

   function handleImageClick() {
      props.onCardClick(props.card);
   }

   function handleLikeClick() {
      props.onCardLike(props.card);
   }

   function handleDeleteClick() {
      props.onCardDelete(props.card)

   }


   return (
      <div className="cards" >
         <div className="cards__card">
            <img className="cards__card-img" src={props.card.link} alt={props.card.name} onClick={handleImageClick} />
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" ></button>
            <div className="cards__card-name">
               <h2 className="cards__card-text">{props.card.name}</h2>
               <div className="cards__likes">
                  <button className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Лайк" type="button" ></button>
                  <span className="cards__like-counter">{props.card.likes.length ? props.card.likes.length : ''}</span>
               </div>
            </div>
         </div>
      </div>
   );
}
export default Card;