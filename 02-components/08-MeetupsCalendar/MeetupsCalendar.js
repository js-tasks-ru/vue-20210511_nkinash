/*
 * Соотносим митапы с календарем по дате в формате ISO
 */

function daysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function dateIndex(date) {
  return  date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
}

function getMonthArray(date) {
  let monthArray = [],
    daysInCurMonth = daysInMonth(date);

  for (let day = 1; day <= daysInCurMonth; ++day) {
    monthArray.push((new Date(date.getFullYear(), date.getMonth(), day)));
  }

  if (monthArray[0].getDay() !== 1) {
    let prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 15),
      prevDaysCounter = daysInMonth(prevMonthDate);
    while (monthArray[0].getDay() > 1) {
      monthArray.unshift(new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), prevDaysCounter));
      prevDaysCounter = prevDaysCounter - 1;
    }
  }

  if (monthArray[monthArray.length - 1].getDay() !== 0) {
    let nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 15),
      nextDaysCounter = 1;
    while (monthArray[monthArray.length - 1].getDay() > 0) {
      monthArray.push(new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), nextDaysCounter));
      nextDaysCounter++;
    }
  }

  return monthArray;
}

const MeetupsCalendar = {
  name: 'MeetupsCalendar',
  props: {
    meetups: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      date: new Date(),
      meetupsByDate: null
    }
  },
  mounted() {
    this.setMeetupsByDate()
  },
  computed: {
    formatMonth() {
      return this.date.toLocaleString(navigator.language, {
        month: 'long',
      }) + ' ' + this.date.getFullYear();
    },
    monthArray() {
      let month = getMonthArray(this.date),
          finalArray = [],
          meetupsByDate = this.meetupsByDate;

      month.forEach(day => {
        let meetupsThisDay = meetupsByDate && meetupsByDate[dateIndex(day)] ?
              meetupsByDate[dateIndex(day)].meetups : [];

        finalArray.push({
          date: day,
          meetups: meetupsThisDay
        })
      });

      return finalArray;
    }
  },
  methods: {
    setMeetupsByDate() {
      let meetupsByDate = {};

      this.meetups.forEach(meetup => {
        let mdate = new Date(meetup.date);
          if (meetupsByDate[dateIndex(mdate)]) {
            meetupsByDate[dateIndex(mdate)].meetups.push(meetup);
          } else {
            meetupsByDate[dateIndex(mdate)] = { meetups: [meetup] };
          }
      });

      this.meetupsByDate = meetupsByDate;
    },
    addMonth() {
      let month = this.date.getMonth() + 1;
      this.date.setDate(3)
      this.date = new Date(this.date.setMonth(month))
    },
    substrMonth() {
      let month = this.date.getMonth() - 1;
      this.date.setDate(3)
      this.date = new Date(this.date.setMonth(month))
    },
  },
  template: `
    <div class="rangepicker">
      <div class="rangepicker__calendar">
        <div class="rangepicker__month-indicator">
          <div class="rangepicker__selector-controls">
            <button class="rangepicker__selector-control-left" @click="substrMonth"></button>
            <div>{{ formatMonth }}</div>
            <button class="rangepicker__selector-control-right" @click="addMonth"></button>
          </div>
        </div>
        <div class="rangepicker__date-grid">
          <div class="rangepicker__cell"
               v-for="(day, index) in monthArray"
               :class="{ rangepicker__cell_inactive: day.date.getMonth() !== date.getMonth()}"
               :key="index"
               >
            {{ day.date.getDate() }}
            <a class="rangepicker__event" v-for="meetup in day.meetups">
              {{ meetup.title }}
            </a>
          </div>
        </div>
      </div>
    </div>`,
};

export default MeetupsCalendar;
