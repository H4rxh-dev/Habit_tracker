export const filterHabitsByDate = (habits, selectedDate = null) => {
  const today = new Date().toISOString().slice(0, 10);
  const dateToMatch = selectedDate || today;
  return habits.filter(habit => habit.createdAt === dateToMatch);
};
