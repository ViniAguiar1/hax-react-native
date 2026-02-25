import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const DetailScreen = ({ route, navigation }) => {
  const { placeId } = route.params;
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Detalhes do Local" />
      </Appbar.Header>
      <View style={styles.container}>
        <Text style={{ color: theme.colors.text }}>ID do Local: {placeId}</Text>
        {/* Aqui você adicionará mais detalhes sobre o local */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default DetailScreen;
