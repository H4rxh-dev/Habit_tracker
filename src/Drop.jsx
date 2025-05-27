import React from "react";
import Icon from 'react-native-vector-icons/Ionicons'; 

// export const habitDetailsOptions = {
//   exercise: ['15 min' , '30 min', '45 min', '1hr',"2 hr"],        // Dropdown for duration
//   read_book: ['15 min', '30 min', '1 hr', '2 hr',"3 hr"],       // Dropdown for duration
//   drink_water:["1 litre","2 litre","3 litre","4 litre"],                                         // TextInput for number of glasses
//   wake_up_early: ['5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM',"7:00 AM","7:30 Am","8:00 Am"], // Dropdown for wake-up times
//   sleep_on_time: ['9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM',"11:30pm"], // Dropdown for bedtime
//   no_junk_food: ['Full Day', '1 Meal Only', 'No Snacks'],    // Dropdown for goal type
//   daily_walk:["50 steps a day","100 steps a day","200 steps a day","1000 steps a day","2000 steps a day","3000 steps a day"],                                          // TextInput for steps or minutes
//   meditate: ['5 min', '15 min', '30 min', '1 hr'],         // Dropdown for duration
//   limit_phone: ['30 min', '1 hr', '2 hr', 'whole day'],           // Dropdown for max usage
// };
// export const habitDetailsOptions = {
//   exercise: ['Started (25%)', 'Halfway (50%)', 'Almost Done (75%)', 'Completed (100%)'],
//   read_book: ['Started (25%)', 'Halfway (50%)', 'Almost Done (75%)', 'Completed (100%)'],
//   drink_water: ['Started (25%)', 'Halfway (50%)', 'Almost Done (75%)', 'Completed (100%)'],
//   wake_up_early: ['Started (25%)', 'Halfway (50%)', 'Almost Done (75%)', 'Completed (100%)'],
//   sleep_on_time: ['Started (25%)', 'Halfway (50%)', 'Almost Done (75%)', 'Completed (100%)'],
//   no_junk_food: ['Started (25%)', 'Halfway (50%)', 'Almost Done (75%)', 'Completed (100%)'],
//   daily_walk: ['Started (25%)', 'Halfway (50%)', 'Almost Done (75%)', 'Completed (100%)'],
//   meditate: ['Started (25%)', 'Halfway (50%)', 'Almost Done (75%)', 'Completed (100%)'],
//   limit_phone: ['Started (25%)', 'Halfway (50%)', 'Almost Done (75%)', 'Completed (100%)'],
// };





export const colors = [
  "#3B82F6", // Blue (primary, calming)
  "#10B981", // Green (success, positive)
  "#F59E0B", // Amber (warning, cheerful)
  "#EF4444", // Red (alert, intense)
  "#8B5CF6", // Violet (focus, spiritual)
  "#14B8A6", // Teal (balanced, energetic)
  "#F43F5E", // Rose (fun, playful)
  "#6366F1", // Indigo (productive, elegant)
  "#F97316", // Orange (energetic, attention-grabbing)
  "#0EA5E9"  // Sky Blue (light, fresh)
];

export  const habititem=[
  { label: 'Exercise', value: 'exercise', icon: ()=><Icon name="barbell-outline" size={18} color="#900" />, key: 'exercise' },
  { label: 'Read Book', value: 'read_book', icon:()=><Icon name="book-outline" size={18} color="#900" />, key: 'read_book' },
  { label: 'Drink Water', value: 'drink_water',icon:()=><Icon name="water" size={18} color="#900" />, key: 'drink_water' },
  { label: 'Wake Up Early', value: 'wake_up_early', icon:()=><Icon name="sunny" size={18} color="#900" />, key: 'wake_up_early' },
  { label: 'Sleep on Time', value: 'sleep_on_time', icon:()=><Icon name="bed" size={18} color="#900" />, key: 'sleep_on_time' },
  { label: 'No Junk Food', value: 'no_junk_food', icon:()=><Icon name="fast-food" size={18} color="#900" />, key: 'no_junk_food' },
  { label: 'Daily Walk', value: 'daily_walk', icon:()=><Icon name="walk" size={18} color="#900" />, key: 'daily_walk' },
  { label: 'Meditate', value: 'meditate', icon:()=><Icon name="leaf" size={18} color="#900" />, key: 'meditate' },
  { label: 'Limit Phone Use', value: 'limit_phone', icon:()=><Icon name="phone-portrait" size={18} color="#900" />, key: 'limit_phone' },
];

