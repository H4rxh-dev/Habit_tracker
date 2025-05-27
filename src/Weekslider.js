import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

// Helper to get the start date of the week (Sunday)
const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0-6 (Sun-Sat)
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
};

// Generate array of 7 days starting from startOfWeek
const generateWeekDates = (startOfWeek) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    days.push(date);
  }
  return days;
};

const WeekSlider = ({ onDateSelect }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));
  const [weekDates, setWeekDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const days = generateWeekDates(currentWeekStart);
    setWeekDates(days);
  }, [currentWeekStart]);

  const goPrevWeek = () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeekStart(prevWeek);
  };

  const goNextWeek = () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeekStart(nextWeek);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date.toISOString().slice(0, 10));
    }
  };

  // Instead of a combined label, we extract parts separately for column layout
  const getDateParts = (date) => {
    return {
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }), // Mon, Tue
      dayNum: date.getDate(),
      monthName: date.toLocaleDateString('en-US', { month: 'short' }), // Jan, Feb
    };
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrowButton} onPress={goPrevWeek}>
        <Text style={styles.arrowText}>‹</Text>
      </TouchableOpacity>

      <FlatList
        horizontal
        data={weekDates}
        keyExtractor={(item) => item.toISOString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const { dayName, dayNum, monthName } = getDateParts(item);
          const isSelected = item.toDateString() === selectedDate.toDateString();

          return (
            <TouchableOpacity
              onPress={() => handleDateSelect(item)}
              style={[styles.dayBox, isSelected && styles.selectedDayBox]}
            >
              <Text style={[styles.dayLabel, isSelected && styles.selectedDayLabel]}>
                {dayName}
              </Text>
              <Text style={[styles.dateLabel, isSelected && styles.selectedDayLabel]}>
                {dayNum}
              </Text>
              <Text style={[styles.monthLabel, isSelected && styles.selectedDayLabel]}>
                {monthName.length>3?monthName.subSting(0,3):monthName}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity style={styles.arrowButton} onPress={goNextWeek}>
        <Text style={styles.arrowText}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  arrowButton: {
    padding: 12,
    backgroundColor: 'transparent',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  arrowText: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  dayBox: {
    marginHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
  },
  selectedDayBox: {
    backgroundColor: '#00acc1',
  },
  dayLabel: {
    fontSize: 14,
    color: '#00796b',
    fontWeight: '600',
    textAlign: 'center',
  },
  dateLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d40',
    marginVertical: 2,
    textAlign: 'center',
  },
  monthLabel: {
    fontSize: 14,
    color: '#00796b',
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedDayLabel: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default WeekSlider;
