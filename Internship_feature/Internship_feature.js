import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';

const Internship_feature = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
          query: searchTerm,
          page: '1',
          num_pages: '1'
        },
        headers: {
          'X-RapidAPI-Key': 'c61f39fcebmshf48b9b28697df2ep11552ajsnf2995c2b3808',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      // console.log(response.data)
      setSearchResult(response.data);
      // console.log('Search result=',searchResult);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    
  };
  // Inside the component function
useEffect(() => {
  console.log('Search result=', searchResult);
}, [searchResult]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Shubham</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="What are you looking for?"
          />
        </View>
        <TouchableOpacity onPress={handleClick}>
          <EvilIcons name="search" size={35} color="black" style={styles.searchBtn} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={searchResult}
          renderItem={({ item }) => {

            console.log('Rendering item:', item); // Log the item here 

            <View style={styles.itemContainer}>
             <Text style={styles.itemTitle}>{item?.job_title || 'No title available'}</Text>
            </View>
          }}
          keyExtractor={(item) => item.job_id}
        />
        
      )}
    </View>
  );
};

export default Internship_feature;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    borderWidth: 0.5,
    borderRadius: 25,
  },
  searchWrapper: {
    flex: 1,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    height: '100%',
  },
  searchInput: {
    width: '100%',
    height: '100%',
    borderRadius: 1,
    marginLeft: 10,
  },
  searchBtn: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTitle: {
    fontSize: 16,
  },
});
