import { View, Text, Button, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories')
      .then(res => {
        setCategories(res.data);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Categories</Text>
      {loading ? <ActivityIndicator size="large" color="blue" /> : (
        <ScrollView>
          {categories.map((cat, idx) => (
            <View style={styles.button} key={idx}>
              <Button title={cat} onPress={() => router.push(`/products/${cat}`)} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 12 
  },
  button: { 
    marginVertical: 8 
  }
});
