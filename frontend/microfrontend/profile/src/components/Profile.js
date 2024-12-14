import api from "./utils/api";
import * as auth from "./utils/auth.js";

// В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
const [currentUser, setCurrentUser] = React.useState({});

const [isLoggedIn, setIsLoggedIn] = React.useState(false);
//В компоненты добавлены новые стейт-переменные: email — в компонент App
const [email, setEmail] = React.useState("");


  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleUpdateUser(userUpdate) {
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarUpdate) {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function onRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        setTooltipStatus("success");
        setIsInfoToolTipOpen(true);
        history.push("/signin");
      })
      .catch((err) => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }

function onLogin({ email, password }) {
auth
    .login(email, password)
    .then((res) => {
    setIsLoggedIn(true);
    setEmail(email);
    history.push("/");
    })
    .catch((err) => {
    setTooltipStatus("fail");
    setIsInfoToolTipOpen(true);
    });
}

function onSignOut() {
// при вызове обработчика onSignOut происходит удаление jwt
localStorage.removeItem("jwt");
setIsLoggedIn(false);
// После успешного вызова обработчика onSignOut происходит редирект на /signin
history.push("/signin");
}