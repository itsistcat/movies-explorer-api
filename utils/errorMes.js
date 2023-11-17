const ERROR_MESSAGES = {
  200: {
    movies: {
      deletionFilms: 'Фильм удален',
    },
  },

  201: {
    users: {
      registrationUsers: 'Пользователь зарегистрирован',
    },

    movies: {
      savingFavourite: 'Фильм сохранен',
    },
  },

  400: {
    users: {
      cast: 'Передан некорректный id пользователя',
      passwordValidate: 'Некорректный пароль - мин. 8 симв., 1 лат. буква, цифра и спецсимвол',
      dataValidate: 'Переданы некорректные данные',
    },

    movies: {
      savingValidate: 'Переданы некорректные данные',
    },
  },

  401: {
    users: {
      passIncorrect: 'Неправильный пароль',
    },
  },

  403: {
    movies: {
      lackOfAccess: 'Нет прав доступа',
    },
  },

  404: {
    users: {
      idNotFound: 'Пользователь с таким id не найден',
      emailNotFound: 'Пользователь с таким email не существует',
    },

    movies: {
      userIdNotFound: 'Фильмы для указанного пользователя не найдены',
      filmNotFound: 'Фильм с таким id не найден',
    },
  },

  409: {
    users: {
      emailDuplication: 'Пользователь с таким email уже существует',
    },
  },
};

module.exports = ERROR_MESSAGES;
