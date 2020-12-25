import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity, Dimensions, StatusBar, ScrollView, ImageBackground, TextInput, TouchableWithoutFeedback, FlatList} from 'react-native';

export default function Api () {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=NYOaIqGhVlM9LAW2vWTLMY5OvhLPGYwO')
      .then((response) => response.json())
      .then((json) => setData(json.results.books))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);


  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item}) => (
            <Text>{item.title}</Text>
           // <Image source={ item.url}  style={{ width: 75, height: 75, borderRadius: 37.5 }} />
          )}
        />
        // <SectionList
        //   sections={[data]}
        //   renderItem={({ item }) => <Text>{item.title}</Text>}
        //   renderSectionHeader={({ section }) => (
        //     <Text >{section.title}</Text>
        //   )}
        //   keyExtractor={(item, index) => index}
        // />
     
      )}
      
    </View>
  );
};
