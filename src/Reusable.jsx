// Dynamic generators for habit details

const generateTimeDurations = (start, end, step) => {
  const durations = [];
  for (let i = start; i <= end; i += step) {
    durations.push(i >= 60 ? `${i / 60} hr` : `${i} min`);
  }
  return durations;
};

const generateWaterOptions = (start, end) => {
  const options = [];
  for (let i = start; i <= end; i++) {
    options.push(`${i} litre${i > 1 ? 's' : ''}`);
  }
  return options;
};

const generateTimeOptions = (startHour, endHour, intervalMinutes) => {
  const times = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let min = 0; min < 60; min += intervalMinutes) {
      if (hour === endHour && min > 0) break;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      let displayHour = hour % 12 || 12;
      const displayMin = min === 0 ? '00' : min;
      times.push(`${displayHour}:${displayMin} ${ampm}`);
    }
  }
  return times;
};

const generateStepsOptions = (stepsArray) => {
  return stepsArray.map(step => `${step} steps a day`);
};

export const habitDetailsOptions = {
  exercise: generateTimeDurations(15, 120, 15),
  read_book: generateTimeDurations(15, 180, 15),
  drink_water: generateWaterOptions(1, 4),
  wake_up_early: generateTimeOptions(5, 8, 30),
  sleep_on_time: generateTimeOptions(21, 23, 30),
  no_junk_food: ['Full Day', '1 Meal Only', 'No Snacks'],
  daily_walk: generateStepsOptions([50, 100, 200, 1000, 2000, 3000]),
  meditate: generateTimeDurations(5, 60, 10),
  limit_phone: ['30 min', '1 hr', '2 hr', 'whole day'],
};
