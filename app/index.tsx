import { Image } from 'expo-image';
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import "./global.css";


const navigate = () =>{
 router.push("/menu");
}

export default function StartPage() {
  return (
    <View className="bg-[#F47FAA] flex-1 justify-center items-center flex-column gap-8 ">
        <View className="justify-center align-top items-center absolute top-24">
              <Image
                style={styles.image}
                source={require("../assets/images/food-bg.png")}
                placeholder="Order Food"
                transition={1000}
              />
              <Text className="text-white font-bold justify-center text-6xl">Welcome!!</Text>
        </View>
        <View className='absolute items-center'>
              <Text className="text-white font-poppins justify-center text-2xl" >Craving something tasty?</Text>
              <Text className="text-white font-poppins justify-center text-2xl"> Let’s get your order started.</Text>
        </View>
        <View className='absolute bottom-24 items-center'>
              <Text className="text-white italic font-bold justify-center mb-2">Browse , order and enjoy !</Text>
      
              <Button className='ml-3 mr-3 w-80' style={{backgroundColor : '#EC0D6E'}} onPress={navigate}>
                    <Text className="text-white">Start Ordering</Text>
              </Button>
        </View>
    
    
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    
    width: 25,
    height: 25, // set height explicitly
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    marginBottom : 0,
    
  },
});
