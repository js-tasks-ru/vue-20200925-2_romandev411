import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    rawMeetup: [],
    agendaIcons: agendaItemIcons,
    titles: agendaItemTitles,
  },

  async mounted() {
    await this.fetchMeetup();
  },

  computed: {
    meetup() {
      if (!this.rawMeetup) {
        return [];
      }
      return Object.assign({}, this.rawMeetup, {
        img: this.setImg(),
        newDate: this.setDate(this.rawMeetup.date)
      });
    },
  },

  methods: {
    async fetchMeetup() {
      await fetch(`${API_URL}/meetups/${MEETUP_ID}`)
        .then(response => response.json())
        .then((result) => {
          this.rawMeetup = result;
        });
    },
    setImg() {
      return getMeetupCoverLink(this.rawMeetup);
    },
    setDate(time) {
      const date = new Date(time);
      const months = [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Ноя',
        'Дек',
      ];

      const day = date.getUTCDate();
      const month = months[date.getMonth()+1];
      const year = date.getUTCFullYear();

      return {
        dateMAchine: `${year}-${date.getMonth()+1}-${day}`,
        dateNormal: `${day} ${month}. ${year}`,
      }
    }
  },
});
