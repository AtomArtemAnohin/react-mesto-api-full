import { useState, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from '././Header';
import Main from '././Main';
import Footer from '././Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from '../contexts/AppContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import statusSuccessImage from './../images/success.svg';
import statusErrorImage from './../images/error.svg';
import { statusErrors, statusSuccessMessage } from '../utils/constants';
// import '../index.css';
// import '../vendor/normalize.css';
import { auth } from "../utils/auth";


function App(callback, deps) {
  const history = useHistory();
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);            // Стейт попап редактирования аватара открыт
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);          // Стейт попап редактирования профиля открыт
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);                // Стейт попап добавить карточку открыт
  const [selectedCard, setSelectedCard] = useState(null);                             // Стейт выбранная карточка для передачи картинки карточки в попап
  const [currentUser, setCurrentUser] = useState({                                    // Стейт данные текущего пользователя
    name: '',
    about: '',
    email: '',
    avatar: ''
  });
  const [cards, setCards] = useState([]);                                             // Стейт массив карточек
  const [loggedIn, setLoggedIn] = useState(false);                                    // Стейт-переменная статус пользователя, вход в систему
  const [infoTooltip, setInfoTooltip] = useState({                                    // Стейт информационного попапа статуса
    isOpen: false,
    image: statusSuccessImage,
    message: statusSuccessMessage
  });
  const [isNavOpened, setIsNavOpened] = useState(false);                              // Стейт мобильная навигация открыта
  const [userEmail, setUserEmail] = useState('');                                     // Стейт email пользователя

  // Обработчик клика по аватару
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }

  // Обработчик клика по кнопке редактирования профиля
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  }

  // Обработчик клика по кнопке добавить карточку
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }

  // Обработчик клика по картинке карточки
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  // Функция закрытия всех попапов
  const closeAllPopups = useCallback(() => {
    setInfoTooltip({
      ...infoTooltip,
      isOpen: false
    });
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  }, [infoTooltip])

  // Обработчик обновления информации пользователя
  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
      .then(data => {
        setCurrentUser({ ...data });
        closeAllPopups();
      })
      .catch(err => console.error(err))
  }

  // Обработчик обновления аватара
  function handleUpdateAvatar({ avatar }) {
    api.setAvatar(avatar)
      .then(data => {
        setCurrentUser({ ...data });
        closeAllPopups();
      })
      .catch(err => console.error(err))
  }

  // Обработчик подтверждения лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(cards => cards.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => console.error(err));
  }

  // Обработчик удаления карточки
  function handleCardDelete(cardId) {
    api.delCard(cardId)
      .then(() => {
        setCards(cards.filter(c => c._id !== cardId._id));
      })
      .catch(err => console.error(err))
  }

  // Обработчик добавления карточки
  function handleAddPlaceSubmit(cardInfo) {
    api.setNewCard(cardInfo)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.error(err))
  }

  // Обработчик по кнопке Войти
  function handleLogin(evt, password, email) {
    auth.authorize(password, email)
      .then(() => {
        setLoggedIn(true);
        setUserEmail(email);
        history.push('/');
      })
      .catch(err => handleError(evt.target, err));       //Проверьте введенные данные и повторите попытку.
  }

  // Обработчик по кнопке Зарегистрироваться
  function handleRegister(evt, password, email) {
    auth.register(password, email)
      .then(() => {
        setInfoTooltip(prevState => ({
          ...prevState,
          isOpen: true,
          image: statusSuccessImage,
          message: statusSuccessMessage
        }));
        history.push('./sign-in');
      })
      .catch(err => handleError(evt.target, err));                                          // Обработка ошибки handleError();
  }

  // Обработчик ошибки по кнопке Войти
  function handleError(form, statusError) {
    const errors = statusErrors.filter(error => error.name === form.name)[0].errors;
    const statusErrorMessage = errors.filter(error => {
      return `Error: ${error.status}` === statusError
    })[0].message;
    console.log(statusErrorMessage)
    setInfoTooltip(prevState => ({
      ...prevState,
      isOpen: true,
      image: statusErrorImage,
      message: statusErrorMessage
    }));
  }

  // Обработчик клика по меню
  function handleNavClick() {
    setIsNavOpened(!isNavOpened);
  }

  // Выход из аккаунта
  function signOut() {
    setLoggedIn(false);
    setIsNavOpened(false);
    localStorage.removeItem('token');
    history.push('./sign-in');
  }

  // Проверка токена при повторном посещении сайта
  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then(res => {
          if (res) {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch(err => {
          console.log(err)
          localStorage.removeItem('token')
        })
    } else {
      setLoggedIn(false);
    }
  }, [history])

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  // Загрузка карточек по умолчанию
  useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        setCards(initialCards);
      })
      .catch(err => console.error(err))
  }, []);

  // Загрузка данных пользователя
  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser({ ...data });
      })
      .catch(err => console.error(err))
  }, []);

  return (
    <AppContext.Provider value={{ loggedIn, userEmail, handleLogin, signOut }}>
      <CurrentUserContext.Provider value={currentUser}>

        <div className="page">

          <div className="page__container">

            <Header
              isNavOpened={isNavOpened}
              onClickNav={handleNavClick}
            />

            <Switch>

              <Route path="/sign-up">
                <Register
                  handleRegister={handleRegister}
                  handleError={handleError}
                />
              </Route>

              <Route path="/sign-in">
                <Login
                  handleLogin={handleLogin}
                  handleError={handleError}
                />
              </Route>

              <ProtectedRoute
                exact path="/"
                component={Main}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete} />

              <Route path="/">
                <Redirect to="/" />
              </Route>

            </Switch>

            {loggedIn && <Footer />}

            {/*Попап обновить аватар*/}
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

            {/*Попап редактировать профиль*/}
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

            {/*Попап добавить карточку*/}
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

            {/*Попап посмотреть картинку поближе*/}
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />

            {/* <!-- Попап статус подтверждение --> */}
            <InfoTooltip
              isOpen={infoTooltip.isOpen}
              onClose={closeAllPopups}
              statusImage={infoTooltip.image}
              statusMessage={infoTooltip.message}
            />
          </div>

        </div>

      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
