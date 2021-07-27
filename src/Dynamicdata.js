import React from 'react';
import staticdata from './staticdata';
import {
  Text,
  View,
  Switch,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';

class DynamicData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'en',
      switchValue: true,
      dynamicData: [],
      LangData: [],
    };
  }
  toggleSwitch = () => {
    this.setState({
      switchValue: !this.state.switchValue,
      language: this.state.switchValue ? 'tn' : 'en',
      LangData:
        this.state.language == 'en'
          ? this.state.dynamicData.tn
          : this.state.dynamicData.en,
    });
  };

  async componentDidMount() {
    try {
      let response = await fetch(
        // 'https://api.jsonbin.io/b/60ff00a1a263d14a297cf160',
        'https://springboot-lang-trans.herokuapp.com/getrecords',
      );
      let json = await response.json();
      this.setState({dynamicData: json, LangData: json.en});
    } catch (error) {
      console.error(error);
      this.setState({LangData: staticdata.en});
    }
  }
  renderItem = ({item}) => <Item title={item.val} />;

  render() {
    return (
      <SafeAreaView style={{margin: 10}}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle="default"
        />
        <View style={styles.mediaWrapper}>
          <Text>Tamil</Text>
          <Switch
            value={this.state.switchValue}
            onValueChange={this.toggleSwitch}
          />
          <Text>English</Text>
        </View>

        <FlatList
          data={this.state.LangData}
          renderItem={this.renderItem}
          keyExtractor={item => item.val}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  mediaWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
export default DynamicData;
