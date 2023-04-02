from datetime import datetime, timedelta
from icalendar import Calendar, Event
# from recurring_ical_events import generate_recurrences


class ICS:
    def __init__(self, hobby):
        self.hobby = hobby

    def create_ics_cal(self):
        event = Event()

        print(self.hobby.final_date_time)

        event.add('summary', self.hobby.name)
        event.add('dtstart', self.hobby.final_date_time)

        rule = self._determine_rule()
        if rule:
            event.add('rrule', rule)

        cal = Calendar()
        cal.add_component(event)

        return cal

    def _determine_rule(self):
        if self.hobby.recurrence == 0:
            return None
        elif self.hobby.recurrence == 1:
            return {
                'freq': 'DAILY',
                'count': 365
            }
        elif self.hobby.recurrence == 2:
            return {
                'freq': 'WEEKLY',
                'count': 52
            }
        elif self.hobby.recurrence == 3:
            return {
                freq: 'MONTHLY',
                'count': 12
            }

