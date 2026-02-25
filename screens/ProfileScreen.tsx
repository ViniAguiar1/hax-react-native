import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Avatar, useTheme, Divider, Button, Title, Paragraph, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  
  // Mock user data for remodeling
  const user = {
    name: 'Vinícius',
    email: 'vinicius@example.com',
    isSuperHost: true,
  };

  const settingsOptions = [
    { id: '1', name: 'Informações Pessoais', icon: 'account-outline' },
    { id: '2', name: 'Configurações da Conta', icon: 'cog-outline' },
    { id: '3', name: 'Pagamentos e Recebimentos', icon: 'credit-card-outline' },
    { id: '4', name: 'Notificações', icon: 'bell-outline' },
  ];

  const renderSettingItem = (item) => (
    <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
        <MaterialCommunityIcons name={item.icon} size={24} color={theme.colors.primary} />
        <Text style={styles.settingText}>{item.name}</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.placeholder} style={styles.chevron} />
    </TouchableOpacity>
  );

  // Airbnb-style remodeling: Clean profile header, clear sections, and host toggle
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ScrollView>
            <View style={styles.profileHeader}>
                {/* Profile Picture and Name */}
                <Avatar.Text size={100} label={user.name.charAt(0)} style={[styles.avatar, { backgroundColor: theme.colors.primary }]} />
                <Title style={styles.name}>{user.name}</Title>
                <Paragraph style={styles.email}>{user.email}</Paragraph>
                
                {/* Host Status Chip */}
                {user.isSuperHost && (
                    <Chip icon="star" style={styles.hostChip} textStyle={{ color: theme.colors.surface }}>
                        Superhost
                    </Chip>
                )}
            </View>

            <Divider style={styles.divider} />

            {/* Settings Sections */}
            <View style={styles.section}>
                <Title style={styles.sectionTitle}>Configurações</Title>
                {settingsOptions.map(renderSettingItem)}
            </View>

            <Divider style={styles.divider} />

            {/* Host Section */}
            <View style={styles.section}>
                <Title style={styles.sectionTitle}>Modo Anfitrião</Title>
                <Card style={styles.hostCard} onPress={() => {}}>
                    <Card.Content>
                        <View style={styles.hostContent}>
                            <MaterialCommunityIcons name="home-outline" size={24} color={theme.colors.onSurface} />
                            <Text style={styles.hostText}>Gerencie seus anúncios e reservas</Text>
                            <MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.placeholder} />
                        </View>
                    </Card.Content>
                </Card>
            </View>

            <Button mode="outlined" onPress={() => {}} style={styles.logoutButton}>
                Sair
            </Button>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff', // Clean background for header
  },
  avatar: {
    marginBottom: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  hostChip: {
    marginTop: 12,
    backgroundColor: '#ff5a5f', // Airbnb red
    paddingHorizontal: 4,
  },
  divider: {
    marginVertical: 0,
    backgroundColor: '#f5f5f5',
    height: 8,
  },
  section: {
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
    fontSize: 16,
  },
  chevron: {
    opacity: 0.6,
  },
  hostCard: {
    elevation: 2,
  },
  hostContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  hostText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  logoutButton: {
    margin: 16,
    borderColor: '#ff5a5f',
  }
});

export default ProfileScreen;