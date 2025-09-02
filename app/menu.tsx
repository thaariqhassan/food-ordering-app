import { router } from "expo-router";
import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { getMenuData } from '../db/firebase';


const Styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    margin: 37,
    width: 200,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
});


// dataStore.js
let selectedItems : any = [];

const setSelectedItems = (items : any) => {
  selectedItems = items;
};

export const getSelectedItems = () => {
  return selectedItems;
};



const navigate = (exportItems :any) =>{
 router.push("/orderSummary");
}


const Menu = () => {

  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const getSelectedItems = () => {
  return foodItems
    .map((item, index) => ({
      ...item,
      quantity: quantities[index] || 0,
    }))
    .filter(item => item.quantity > 0);
};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const menuItems = await getMenuData();
      setFoodItems(menuItems);
      setLoading(false);
    };

    fetchData();
  }, []);


  const getTotalPrice = () => {
  return foodItems.reduce((total, item, index) => {
    const quantity = quantities[index] || 0;
    return total + quantity * item.price;
  }, 0);
};


  const increment = (index: number) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1,
    }));
    setCount(count + 1);
  };

  const decrement = (index: number) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: Math.max((prev[index] || 0) - 1, 0),
    }));
    setCount(count - 1);
  };

  

  return (
  <SafeAreaView>
    {loading ? (
      <View className="flex-1 justify-center items-center mt-20">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2 text-gray-600">Loading menu...</Text>
      </View>
    ) : (
      <>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }} scrollEnabled={true}>
          {foodItems.map((item, index) => {
            const quantity = quantities[index] || 0;
            return (
              <Card key={index} style={Styles.container}>
                <Card.Cover source={{ uri: item.image }} />
                <Card.Content>
                  <Title style={{ textAlign: 'center' }}>{item.name}</Title>
                </Card.Content>
                <Card.Content>
                  <Paragraph style={{ textAlign: 'center' }}>₹ {item.price}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  {quantity === 0 ? (
                    <Button onPress={() => increment(index)}>
                      <Title>Add</Title>
                    </Button>
                  ) : (
                    <View style={Styles.row}>
                      <Button onPress={() => decrement(index)}>
                        <Title className="text-4xl">-</Title>
                      </Button>
                      <Title style={Styles.quantityText}>{quantity}</Title>
                      <Button onPress={() => increment(index)}>
                        <Title className="text-3xl">+</Title>
                      </Button>
                    </View>
                  )}
                </Card.Actions>
              </Card>
            );
          })}
        </ScrollView>

        <SafeAreaView className="absolute bottom-16 left-0 right-0 bg-white border-t border-gray-200">
          <View className="flex-row justify-between items-center px-4 py-3">
            <View>
              <Text className="text-lg font-semibold text-black">{count} item(s)</Text>
              <Text className="text-sm text-gray-500">Total: ₹{getTotalPrice()}</Text>
            </View>
            <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded-lg" onPress={() =>{
               const exportItems = getSelectedItems();
               setSelectedItems(exportItems);
              navigate}}>
              <Text className="text-white font-bold">Checkout</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    )}
  </SafeAreaView>
);

}
export default Menu;
