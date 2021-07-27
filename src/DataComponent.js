import React from 'react';
import staticdata from './staticdata';
import {
  Text,
  View,
  Switch,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Button,
  FlatList,
  ScrollView,
} from 'react-native';

class DataComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'en',
      switchValue: true,
      LangData: [],
    };
  }
  toggleSwitch = () => {
    this.setState({
      switchValue: !this.state.switchValue,
      language: this.state.switchValue ? 'tn' : 'en',
      LangData: this.state.language == 'en' ? staticdata.tn : staticdata.en,
    });
  };

  change = () => {
    this.props.navigation.navigate('Dynamic');
  };

  async componentDidMount() {
    this.setState({LangData: staticdata.en});
  }

  renderItem = ({item}) => <Item title={item.val} />;

  render() {
    console.log(this.state.LangData);
    return (
      <SafeAreaView style={{margin: 10}}>
        <ScrollView>
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
          <Button title="Check Dynamic" onPress={this.change} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mediaWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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

export default DataComponent;
