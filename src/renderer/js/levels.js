const LEVELS = {
  1: {
    name: 'EGB',
    fullName: 'Nivel 1 · EGB',
    accentColor: '#F44336',
    cardColors: ['rojo', 'blanco'],
    boardColors: {
      operador: '#F44336',
      estrella: '#FFE082',
      estrellaBorder: '#FFC107',
      penalizacion: '#BBDEFB',
      penalizacionBorder: '#2196F3',
      meta: '#FFCDD2',
      metaBorder: '#F44336'
    }
  },
  2: {
    name: 'Básica Sup.',
    fullName: 'Nivel 2 · Básica Sup.',
    accentColor: '#4CAF50',
    cardColors: ['verde', 'amarillo', 'rojo'],
    boardColors: {
      operador: '#4CAF50',
      estrella: '#FFE082',
      estrellaBorder: '#FFC107',
      penalizacion: '#BBDEFB',
      penalizacionBorder: '#2196F3',
      meta: '#C8E6C9',
      metaBorder: '#4CAF50'
    }
  },
  3: {
    name: 'Bachillerato',
    fullName: 'Nivel 3 · Bachillerato',
    accentColor: '#2196F3',
    cardColors: ['azul', 'amarillo', 'naranja'],
    boardColors: {
      operador: '#2196F3',
      estrella: '#FFE082',
      estrellaBorder: '#FFC107',
      penalizacion: '#BBDEFB',
      penalizacionBorder: '#2196F3',
      meta: '#BBDEFB',
      metaBorder: '#2196F3'
    }
  }
};

const CARD_POINTS = {
  basica: 10,
  media: 20,
  alta: 30
};

const CARD_TIME = 120;
const GAME_TIME_CONCURSO = 180;
