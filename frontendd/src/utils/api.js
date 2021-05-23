import handleOriginalResponse from './utils.js';

class Api {
   constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
   }

   getInitialData() {
      return Promise.all([this.getUserInfo(), this.getInitialCards()]);
   }

   _checkRepsonse(res) {
      if (res.ok) {
         return res.json();
      } else {
         return Promise.reject(`Ошибка: ${res.status}`);
      }
   }

   getUserInfo() {
      return fetch(`${this._baseUrl}users/me`, {
         headers: this._headers,
      })
         .then(res => {
            return this._checkRepsonse(res);
         });
   }

   getInitialCards() {
      return fetch(`${this._baseUrl}cards`, {
         headers: this._headers,
      })
         .then(res =>
            this._checkRepsonse(res)
         );
   }

   setUserInfo(item) {
      return fetch(`${this._baseUrl}users/me`, {
         headers: this._headers,
         method: 'PATCH',
         body: JSON.stringify({
            name: item.name,
            about: item.about,
         }),
      })
         .then(res =>
            this._checkRepsonse(res)
         );
   }

   setNewCard(item) {
      return fetch(`${this._baseUrl}cards`, {
         headers: this._headers,
         method: 'POST',
         body: JSON.stringify({
            name: item.name,
            link: item.link,
         }),
      })
         .then(res => {
            return this._checkRepsonse(res)
         });
   }

   delCard(item) {
      return fetch(`${this._baseUrl}cards/${item._id}`, {
         headers: this._headers,
         method: 'DELETE',
      })
         .then(res =>
            this._checkRepsonse(res)
         );
   }

   setLike(item) {
      return fetch(`${this._baseUrl}cards/likes/${item._id}`, {
         headers: this._headers,
         method: 'PUT',
      })
         .then(res =>
            this._checkRepsonse(res)
         );
   }

   changeLikeCardStatus(cardId, setLike) {
      if (setLike) {
         return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
            headers: this._headers,
            method: 'PUT',

         })
            .then(handleOriginalResponse);
      } else {
         return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',

         })
            .then(handleOriginalResponse);
      }
   }


   delLike(item) {
      return fetch(`${this._baseUrl}cards/likes/${item._id}`, {
         headers: this._headers,
         method: 'DELETE',
      })
         .then(res =>
            this._checkRepsonse(res)
         );
   }

   setAvatar(avatarLink) {
      return fetch(`${this._baseUrl}users/me/avatar`, {
         headers: this._headers,
         method: 'PATCH',
         body: JSON.stringify({
            avatar: avatarLink

         })
      })
         .then(res =>
            this._checkRepsonse(res)
         );
   }
}


export const api = new Api({
   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20/',
   headers: {
      authorization: '343faef2-9f9d-45f2-bd75-f5911b02bd56',
      'Content-Type': 'application/json'
   }
});