import {Pipe, PipeTransform} from '@angular/core';
import {TranslationSet} from './translation-set';


@Pipe({
  name: 'dateAgo',
  pure: true
})


export class DateAgoPipe implements PipeTransform {

  private dictionary: { [key: string]: TranslationSet } = {
    en: {
      languange: 'en',
      values: {
        now: 'Just now',
        second: 'second ago',
        minute: 'minute ago',
        hour: 'hour ago',
        day: 'day ago',
        week: 'week ago',
        month: 'month ago',
        year: 'year ago',
        secondPlural: 'seconds ago',
        minutePlural: 'minutes ago',
        hourPlural: 'hours ago',
        dayPlural: 'days ago',
        weekPlural: 'weeks ago',
        monthPlural: 'months ago',
        yearPlural: 'years ago'
      },
    },
    ru: {
      languange: 'ru',
      values: {
        now: 'Только что',
        second: 'секунду назад',
        minute: 'минуту назад',
        hour: 'час назад',
        day: 'вчера',
        week: 'неделю назад',
        month: 'месяц назад',
        year: 'год назад',
        secondPlural: 'секунд назад',
        minutePlural: 'минут назад',
        hourPlural: 'часов назад',
        dayPlural: 'дней назад',
        weekPlural: 'недель назад',
        monthPlural: 'месяцев назад',
        yearPlural: 'лет назад'
      },
    },
    uk: {
      languange: 'uk',
      values: {
        now: 'щойно',
        second: 'секунду тому',
        minute: 'хвилину тому',
        hour: 'годину тому',
        day: 'вчора',
        week: 'тиждень тому',
        month: 'місяць тому',
        year: 'рік тому',
        secondPlural: 'секунд тому',
        minutePlural: 'хвилин тому',
        hourPlural: 'годин тому',
        dayPlural: 'днів тому',
        weekPlural: 'тижнів тому',
        monthPlural: 'місяців тому',
        yearPlural: 'років тому'
      },
    },
  };

  transform(value: any, args?: any): any {
    if (!args) {
      args = 'en';
    }

    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value.toString() + 'Z')) / 1000);
      if (seconds < 29 && seconds >= 0) {
        return this.dictionary[args].values['now'];
      } // less than 30 seconds ago will show as 'Just now'

      if (seconds > 86400 || seconds < 0) {
        return new Date(value.toString() + 'Z').toLocaleDateString(args, {timeZone: 'UTC'});

      }
      const intervals = {
        'year': 31536000,
        'month': 2592000,
        'week': 604800,
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (counter === 1) {
            return counter + ' ' + this.dictionary[args].values[i];
          } else {
            return counter + ' ' + this.dictionary[args].values[i + 'Plural']; // plural (2 days ago)
          }
        }
      }
    }
    return value;
  }

}
