import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar} from 'react-native';
import React, {useState, FC} from 'react';

const StudentListRow: FC<{name: string, id: string, imgUrl: string}> = ({name, id, imgUrl}) => {
  return(
    <View style={styles.listrow}>
      <Image style={styles.avatar} source={require('./assets/man_4140048.png')} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.id}>{id}</Text>
        </View>
    </View>
  )
}
export default function App() {

  return (
    <View style={styles.container}>
      <StudentListRow name = "Shira Tzvi" id = "211777834" imgUrl="https://www.flaticon.com/free-icon/woman_4042422" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: 'column',
  },
  listrow: {
    marginHorizontal: 5,
    flexDirection: 'row',
    elevation: 1,
    borderRadius: 5,
  },
  avatar: {
    margin: 10,
    height: 100,
    width: 100,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  name: {
    marginBottom: 5,
    fontSize: 25,
    fontWeight: 'bold'
  },
  id: {
    marginBottom: 5,
    fontSize: 20,
  }

 
});
