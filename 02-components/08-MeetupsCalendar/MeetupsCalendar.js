/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

function daysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getMonthArray(date) {
  let monthArray = [],
      daysInCurMonth = daysInMonth(date);

  for (let day = 1; day <= daysInCurMonth; ++day) {
    monthArray.push((new Date(date.getFullYear(), date.getMonth(), day)));
  }

  if (monthArray[0].getDay() !== 1) {
    let prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 1),
        prevDaysCounter = daysInMonth(prevMonthDate);
    while (monthArray[0].getDay() > 1) {
      monthArray.unshift(new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), prevDaysCounter));
      prevDaysCounter = prevDaysCounter - 1;
    }
  }

  if (monthArray[monthArray.length - 1].getDay() !== 0) {
    let nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 1),
        nextDaysCounter = daysInMonth(nextMonthDate);
    while (monthArray[monthArray.length - 1].getDay() !== 0) {
      monthArray.push(new Date(date.getFullYear(), date.getMonth(), nextDaysCounter));
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
      date: null
    }
  },
  computed: {
    monthArray() {
      return getMonthArray(this.date)
    },
    formatMonth() {
      return this.date.toLocaleString(navigator.language, {
        month: 'long',
      }) + ' ' + this.date.getFullYear();
    }
  },
  created() {
    let currDate = new Date();
    this.date = new Date(currDate.getFullYear(), currDate.getMonth(), 1)
  },
  methods: {
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
    getMeetupsTonight(date) {
      return this.meetups.filter((meetup) => {
        let mdate = new Date(meetup.date);
        return mdate.getMonth() === date.getMonth()
          && mdate.getDate() === date.getDate()
          && mdate.getFullYear() === date.getFullYear()
      })
    },
  },
  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="substrMonth"></button>
          <div>{{ formatMonth }}</div>
          <button class="rangepicker__selector-control-right" @click="addMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <template v-for="curDay in monthArray">
          <div class="rangepicker__cell"
               :class="{ rangepicker__cell_inactive: curDay.getMonth() !== date.getMonth()}">
            {{ curDay.getDate() }}
            <template v-if="getMeetupsTonight(curDay).length">
              <a class="rangepicker__event" v-for="meetup in getMeetupsTonight(curDay)">
                {{ meetup.title }}
              </a>

            </template>
          </div>
        </template>
      </div>
    </div>
  </div>`,
};

export default MeetupsCalendar;
