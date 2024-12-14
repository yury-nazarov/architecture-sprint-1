import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";

import { Route, useHistory, Switch, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import ProtectedRoute from "./components/ProtectedRoute";


// Получаем состояние из Redux Store для передачи в App
// TODO

// при монтировании App описан эффект, проверяющий наличие токена и его валидности
React.useEffect(() => {
  const token = localStorage.getItem("jwt");
  if (token) {
    auth
      .checkToken(token)
      .then((res) => {
        setEmail(res.data.email);
        setIsLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        localStorage.removeItem("jwt");
        console.log(err);
      });
  }
}, [history]);



// Собираем приложение
const App = () => {

  return (
    
  <CurrentUserContext.Provider value={currentUser}>
      <BrowserRouter>
      <div className="page__content">
        <Header email={email} onSignOut={onSignOut} />
        <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={isLoggedIn}
          />
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>
        </Switch>
    
        <Footer />
        </Suspense>
      </div>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
  
}
export default App;

// Монтируем в страницу
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")
const root = ReactDOM.createRoot(rootElement)
root.render(<App />)


// Импорт WMF модулей
const Profile = lazy(() => import('profile/ProfileExport').catch(() => {
  return { default: () => <div className='error'>Profile component is not available!!</div> };
})
); 

const EditProfilePopup = lazy(() => import('profile/EditProfilePopup').catch(() => {
return { default: () => <div className='error'>EditProfilePopup component is not available!!</div> };
})
); 

const EditAvatarPopup = lazy(() => import('profile/EditAvatarPopup').catch(() => {
  return { default: () => <div className='error'>EditAvatarPopup component is not available!!</div> };
})
); 


const Register = lazy(() => import('profile/Register').catch(() => {
  return { default: () => <div className='error'>Register component is not available!!</div> };
})
); 

const Login = lazy(() => import('profile/Login').catch(() => {
  return { default: () => <div className='error'>Login component is not available!!</div> };
})
); 

const InfoTooltip = lazy(() => import('profile/InfoTooltip').catch(() => {
  return { default: () => <div className='error'>InfoTooltip component is not available!!</div> };
})
); 

const CurrentUserContext = lazy(() => import('profile/CurrentUserContext').catch(() => {
  return { default: () => <div className='error'>CurrentUserContext component is not available!!</div> };
})
); 

