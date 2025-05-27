// utils/habitStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@habit_progress';

// Save or update progress for a habit on a specific date
export const saveHabitProgress = async (habitId, date, progress) => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : {};

    if (!parsed[habitId]) parsed[habitId] = {};

    parsed[habitId][date] = progress;

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch (error) {
    console.error('Error saving habit progress:', error);
  }
};

// Get full progress map for a habit
export const getHabitProgress = async (habitId, date) => {
  try {

    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : {};
    return parsed[habitId]?.[date] ?? 0;
  } catch (error) {
    console.error('Error retrieving habit progress:', error);
    return 0;
  }

  
};


// ✅ Get progress for a specific habit on a specific date
export const getHabitProgressForDate = async (habitId, date) => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : {};
    return parsed[habitId]?.[date] ?? 0;
  } catch (error) {
    console.error('Error retrieving date-specific progress:', error);
    return 0;
  }
};

// ✅ Get all habit progress with 0 default if none found
export const getAllProgressForHabitWithZeroDefault = async (habitId) => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : {};
    return parsed[habitId] || {};
  } catch (error) {
    console.error('Error retrieving full habit progress:', error);
    return {};
  }
};

// Get all habits and their progress
export const getAllHabitsProgress = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error getting all progress:', error);
    return {};
  }
};



/**
 * Calculates progress percentage based on selected value and habit options
 * 
 */
// AsynHelper.js
export const calculateProgress = (selectedValue, habitKey, habitDetailsOptions) => {
  const options = habitDetailsOptions[habitKey];

  if (!options || !Array.isArray(options)) {
    console.warn("Invalid habit key or options not found");
    return 0;
  }

  const index = options.indexOf(selectedValue);

  if (index === -1) {
    console.warn("Selected value not found in options");
    return 0;
  }

  const selectedCount = index + 1;
  const total = options.length;

  const percentage = Math.round((selectedCount / total) * 100);
  return percentage;
};
