import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Card, Avatar } from 'react-native-paper';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            <Avatar.Icon size={80} icon="account" style={styles.avatar} />
            <Text style={styles.name}>Vinícius</Text>
            <Text style={styles.email}>vinicius@example.com</Text>
          </Card.Content>
        </Card>
        <Text style={styles.sectionTitle}>Configurações</Text>
        {/* Adicionar opções de configuração aqui */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileContainer: {
    padding: 16,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    marginTop: 20,
    elevation: 4,
  },
  content: {
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#888',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
});

export default ProfileScreen;