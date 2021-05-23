import React from 'react';
import Card from "././Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main({
   cards,
   onEditAvatar,
   onEditProfile,
   onAddPlace,
   onCardClick,
   onCardLike,
   onCardDelete
}) {

   const currentUser = React.useContext(CurrentUserContext);

   return (
      <main className="main">
         <section className="profile">
            <div className="profile__avatar" >
               <div className="profile__avatar-container">
                  <img className="profile__user" src={currentUser.avatar} alt={currentUser.name} />
                  <button className="button button_edit-avatar" onClick={onEditAvatar}></button>
               </div>
            </div>
            <div className="profile__info" >
               <div className="profile__edit-user">
                  <h1 className="profile__user-name">{currentUser.name}</h1>
                  <button
                     className="button profile__button-edit-profile"
                     onClick={onEditProfile}
                     type="button"
                     aria-label="Редактировать" />
               </div>
               <p className="profile__user-data">{currentUser.about}</p>
            </div>
            <button className="button profile__button-add-element" onClick={onAddPlace} type="button" aria-label="Добавить фото"></button>

         </section>
         <section className="cards-list">
            {cards.map(card => (
               <Card
                  key={card._id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
               />))}
         </section>
      </main>
   )
};
export default Main;