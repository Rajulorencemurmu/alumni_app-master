import {React,useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Image } from 'react-native';

const JobList = [
 {
    title: 'Recruitment Internship',
    company: 'google',
    location: 'Bangalore, Karnataka',
    date: '18 days ago',
 },
 {
    title: 'Human Resources Internship',
    company: 'Exotel',
    location: 'Gurgaon',
    date: '00 Networks',
 },
 {
    title: 'Human Resources Internship',
    company: 'MasterChow',
    location: 'Delhi',
    date: 'Spaces 0',
 },
 {
    title: 'xyz Internship',
    company: 'xyz',
    location: 'mnbholh',
    date: 'Spaces 0',
 },
];



const Internships = () => {


      const onPress = () => console.log("Account Icon pressed");
      const JobPress=()=>{console.log("jobs pressed");}
      const InternPress=()=>{console.log("Intern pressed");}
      // const [JobPress, setJobPress] = useState(console.log('job pressed'))
      // const [InternPress, setInternPress] = useState(console.log('Intern pressed'))
 return (
    <ScrollView style={styles.container}>
     <Text style={styles.boardhead}>Job Board</Text>

     <TouchableOpacity style={styles.icon} onPress={onPress}><Image style={styles.acclogo} source={require('../assets/account1.png')} />
      </TouchableOpacity>

      <TouchableOpacity>
      <View style={styles.subheading}>
      {/* <Text style={styles.jobheading} onPress={JobPress}>Show All Jobs</Text>
      <Text style={styles.internshipheading} onPress={InternPress}>Show All Internships</Text> */}
      </View>
      </TouchableOpacity>
      

      {JobList.map((job, index) => (
        <TouchableOpacity key={index} style={styles.jobItem}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.jobCompany}>{job.company}</Text>
          <Text style={styles.jobLocation}>{job.location}</Text>
          <Text style={styles.jobDate}>{job.date}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    padding: 10,
    paddingTop:60,
 },
 boardhead:{
    fontWeight:'800',
    fontSize:40,
 },
 icon:{

 },

 subheading:{
 flex: 1,
 flexDirection:"row",
 justifyContent: 'space-evenly',
 marginTop:30,
 marginRight:100,
//  paddingRight:70,
 },
 jobheading:{
   fontSize:15,
   borderColor:'black',
   borderWidth:1,
   borderRadius:15,
   padding:5,
 },
 internshipheading:{
   fontSize:15,
   borderColor:'black',
   borderWidth:1,
   borderRadius:15,
   padding:5,
   // marginLeft:40,
 },
 acclogo:{
   width:40,
   height:40,
   position:'absolute',
   left:290,
   top: -40,
   
 },
 jobItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
    marginTop:15,
 },
 jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
 },
 jobCompany: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
 },
 jobLocation: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
 },
 jobDate: {
    fontSize: 12,
    color: '#999',
 },
});

export default Internships;