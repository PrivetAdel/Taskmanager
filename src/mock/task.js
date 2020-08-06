import {COLORS} from '../const';
import {getRandomInteger} from '../utils';

const generateDescription = () => {
  const descriptions = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateDate = () => {
  const isDate = !!getRandomInteger(0, 1);

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: !!getRandomInteger(0, 1),
    th: false,
    fr: !!getRandomInteger(0, 1),
    sa: false,
    su: false
  };
};

const getRandomColor = () => {
  const randomIndex = getRandomInteger(0, COLORS.length - 1);
  return COLORS[randomIndex];
};

export const generateTask = () => {
  const dueDate = generateDate();
  const repeating = dueDate === null ? generateRepeating() : {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false
  };

  return {
    description: generateDescription(),
    dueDate,
    repeating,
    color: getRandomColor(),
    isArchive: !!getRandomInteger(0, 1),
    isFavorite: !!getRandomInteger(0, 1)
  };
};
