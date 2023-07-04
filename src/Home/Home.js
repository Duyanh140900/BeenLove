import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component, useCallback, useMemo } from 'react';
import { RecyclerListView, LayoutProvider, DataProvider } from "recyclerlistview";
import FlightData from "./FlightData";
import FlightCard from "./FlightCard";
import HotelCard from "./HotelCard";
import TopWidget from "./TopWidget";
import {
  LogoFaceBook, Plus,
  Search,
  Message
} from '../components/LoadIconSvg'


let { height, width } = Dimensions.get('window');

const Home = () => {

  const dataProvider = useMemo(() => {
    return new DataProvider((r1, r2) => {
      return r1 !== r2
    }).cloneWithRows(FlightData)
  }, [])
  const _layoutProvider = useMemo(() => {
    return new LayoutProvider((i) => {
      return dataProvider.getDataForIndex(i).type;
    }, (type, dim) => {
      switch (type) {
        case "HOTEL_ITEM":
          dim.width = width;
          dim.height = 83;
          break;
        case "FL_ITEM":
          dim.width = width;
          dim.height = 80;
          break;
        case "HEADER":
          dim.width = width;
          dim.height = 100;
          break;
        default:
          dim.width = width;
          dim.height = 0;

      }
    });
  }, [])

  const _renderRow = useCallback((type, data) => {
    switch (type) {
      case "HOTEL_ITEM":
        return <HotelCard />
      case "FL_ITEM":
        return <FlightCard data={data} />;
      case "HEADER":
        return <TopWidget data={data} />;
      default:
        return null;

    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <LogoFaceBook width={150} height={150} />
        </View>
        <View style={styles.view_icons}>
          <TouchableOpacity style={styles.icon}>
            <Plus width={25} height={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Search width={30} height={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <  Message
              width={25} height={25} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <RecyclerListView rowRenderer={_renderRow} dataProvider={dataProvider}
          layoutProvider={_layoutProvider} />
      </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 60,
    flexDirection: "row",
    // alignItems: "flex-end"
  },
  logo: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    // paddingLeft: 10
    marginLeft: 10,
    // backgroundColor: "red",
  },
  view_icons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "red",
    flex: 1,
    // marginBottom: 10
  },
  icon: {
    backgroundColor: "#f5f5f5",
    marginHorizontal: 5,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  }
})
export default Home