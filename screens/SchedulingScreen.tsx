import React, { useState, useMemo } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Alert, StatusBar, Platform, Text } from 'react-native';
import { useTheme, Appbar, Title, Button, Paragraph, useTheme as usePaperTheme } from 'react-native-paper';
import { Calendar, DateData, MarkingProps } from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// New Airbnb-inspired Rosé Palette
const primaryRose = '#E30B5C';
const lightBackground = '#F7A6B6';
const backgroundColor = '#FFFFFF';
const textColor = '#333333';
const placeholderColor = '#888888';

const SchedulingScreen = ({ navigation }) => {
  const paperTheme = usePaperTheme();
  const [selectedDates, setSelectedDates] = useState({});
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);

  const onDayPress = (day: DateData) => {
    // Enhanced Airbnb UX: Selection logic
    if (!checkIn) {
      setCheckIn(day.dateString);
      setCheckOut(null);
      setSelectedDates({
        [day.dateString]: { selected: true, color: primaryRose, textColor: backgroundColor, startingDay: true, endingDay: true, customContainerStyle: styles.roundedSelection },
      });
    } else if (checkIn && !checkOut && day.dateString > checkIn) {
      setCheckOut(day.dateString);
      const newDates: { [key: string]: MarkingProps } = {};
      let currentDate = new Date(checkIn);
      
      while (currentDate <= new Date(day.dateString)) {
        const dateString = currentDate.toISOString().split('T')[0];
        newDates[dateString] = { 
            selected: true, 
            color: primaryRose, 
            textColor: backgroundColor,
            ...(dateString === checkIn && { startingDay: true, customContainerStyle: styles.roundedStart }),
            ...(dateString === day.dateString && { endingDay: true, customContainerStyle: styles.roundedEnd }),
            ...(dateString !== checkIn && dateString !== day.dateString && { color: lightBackground, withinPeriod: true, customContainerStyle: styles.inPeriod }),
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setSelectedDates(newDates);
    } else {
      setCheckIn(day.dateString);
      setCheckOut(null);
      setSelectedDates({
        [day.dateString]: { selected: true, color: primaryRose, textColor: backgroundColor, startingDay: true, endingDay: true, customContainerStyle: styles.roundedSelection },
      });
    }
  };

  const handleBooking = () => {
    if (checkIn && checkOut) {
        Alert.alert('Reserva Confirmada', `Check-in: ${checkIn}\nCheck-out: ${checkOut}`, [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
    } else {
        Alert.alert('Selecione as datas', 'Por favor, selecione as datas de check-in e check-out para continuar.');
    }
  };

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  return (
    <SafeAreaView style={styles.container}>
      {/* FIX: Ensure StatusBar is visible and correctly configured */}
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={textColor} />
        <Title style={styles.title}>Agendar Viagem</Title>
      </Appbar.Header>
      <View style={styles.content}>
        <Calendar
          current={today}
          onDayPress={onDayPress}
          markedDates={selectedDates}
          markingType="custom"
          theme={{
            selectedDayBackgroundColor: primaryRose,
            selectedDayTextColor: backgroundColor,
            todayTextColor: primaryRose,
            arrowColor: primaryRose,
            dotColor: primaryRose,
            calendarBackground: backgroundColor,
            textSectionTitleColor: placeholderColor,
            textDisabledColor: '#d9e1e8',
          }}
        />
        <View style={styles.summary}>
            <Paragraph>Check-in: {checkIn || 'Selecione'}</Paragraph>
            <Paragraph>Check-out: {checkOut || 'Selecione'}</Paragraph>
        </View>
      </View>
      {/* FIX: Floating button container */}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity 
            style={styles.bookingButton} 
            onPress={handleBooking}
            disabled={!checkIn || !checkOut}
        >
            <Title style={styles.buttonLabel}>RESERVAR</Title> 
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    // FIX: Remove paddingTop that might cause white box if SafeAreaView is already handling it or conflicting with Appbar
    paddingTop: 0, 
  },
  appBar: {
    backgroundColor: backgroundColor,
    elevation: 0,
    margin: 0,
    padding: 0,
    // borderWidth: 1, // Diagnostic border
    // borderColor: 'red', // Diagnostic border
  },
  title: {
    color: textColor,
    fontSize: 20,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  summary: {
    marginTop: 20,
    padding: 16,
    backgroundColor: lightBackground,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  floatingButtonContainer: {
    padding: 16,
    backgroundColor: backgroundColor,
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
  },
  bookingButton: {
    backgroundColor: primaryRose,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8, // FIX: Border radius for floating effect
    elevation: 5, // FIX: Android shadow
    shadowColor: primaryRose, // FIX: iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonLabel: {
    color: backgroundColor,
    fontWeight: 'bold',
    fontSize: 18,
  },
  roundedSelection: {
    borderRadius: 15,
  },
  roundedStart: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    marginRight: 0, 
    paddingRight: 0,
  },
  roundedEnd: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    marginLeft: 0,
    paddingLeft: 0,
  },
  inPeriod: {
    borderRadius: 0,
    marginHorizontal: 0,
    paddingHorizontal: 0,
  }
});

export default SchedulingScreen;
