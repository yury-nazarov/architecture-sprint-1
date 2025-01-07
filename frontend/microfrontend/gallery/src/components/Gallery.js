import api from "./utils/api";
import * as auth from "./utils/auth.js";

const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
const [selectedCard, setSelectedCard] = React.useState(null);
const [cards, setCards] = React.useState([]);

const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
const [tooltipStatus, setTooltipStatus] = React.useState("");

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



function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
}


function handleCardClick(card) {
    setSelectedCard(card);
}

function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
        .changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
        setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
        );
        })
        .catch((err) => console.log(err));
}

function handleCardDelete(card) {
    api
        .removeCard(card._id)
        .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        })
        .catch((err) => console.log(err));
}

function handleAddPlaceSubmit(newCard) {
api
    .addCard(newCard)
    .then((newCardFull) => {
    setCards([newCardFull, ...cards]);
    closeAllPopups();
    })
    .catch((err) => console.log(err));
}

