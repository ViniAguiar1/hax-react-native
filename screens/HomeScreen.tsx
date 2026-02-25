import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const dailyRevenue = 5250.75;
  const userName = 'Vinícius'; // Alterado para Vinícius

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dashboardContainer}>
        {/* Card de Boas-vindas */}
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <Text style={styles.welcomeTitle}>Olá, {userName}!</Text>
            <Text style={styles.welcomeSubtitle}>Boas-vindas ao seu Dashboard.</Text>
          </Card.Content>
        </Card>

        {/* Dashboard de Vendas */}
        <View style={styles.salesDashboard}>
          <Text style={styles.sectionTitle}>Dashboard de Vendas</Text>
          <Card style={styles.salesCard}>
            <Card.Content>
              <Text style={styles.cardTitle}>Faturamento do Dia</Text>
              <Text style={styles.revenueText}>R$ {dailyRevenue.toFixed(2)}</Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  dashboardContainer: {
    padding: 16,
  },
  welcomeCard: {
    marginBottom: 20,
    backgroundColor: '#4CAF50',
    elevation: 4,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  welcomeSubtitle: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  salesDashboard: {
    marginTop: 10,
  },
  salesCard: {
    elevation: 4,
    width: width - 32,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  revenueText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    marginTop: 10,
  },
});

export default HomeScreen;