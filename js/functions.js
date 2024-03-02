const isLengthString = (string, length) => string.length <= length;

const isPalindrome = (string) => {
  let reverseString = '';

  for (let i = 0; i < string.length; i++) {
    reverseString += string.at(-i - 1);
  }
  return reverseString.toLowerCase().replaceAll(' ', '') === string.toLowerCase().replaceAll(' ', '');
};

const getNumber = (data) => {
  let result = '';

  if (typeof (data) === 'number') {
    return Math.abs(data.toString().replace('.', ''));
  }

  for (let i = 0; i < data.length; i++) {
    if (!Number.isNaN(parseInt(data[i], 10))) {
      result += data[i];
    }
  }

  return parseInt(result, 10);
};

const isMeeting = (startDay, endDay, startMeeting, duration) => {
  const getMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startDayMinutes = getMinutes(startDay);
  const endDayMinutes = getMinutes(endDay);
  const startMeetingMinutes = getMinutes(startMeeting);

  return startDayMinutes <= startMeetingMinutes && (startMeetingMinutes + duration) <= endDayMinutes;
};

isLengthString('проверяемая строка', 20);
isPalindrome('Лёша на полке клопа нашёл ');
getNumber(-1.5);
isMeeting('08:00', '17:30', '14:00', 90);
isMeeting('8:00', '17:30', '08:00', 900);
