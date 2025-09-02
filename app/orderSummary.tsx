import { Text, View } from 'react-native';
import { Button } from "react-native-paper";
import { getSelectedItems } from './menu';


const data = getSelectedItems()

export default function TableList() {
  return (
    <View className="p-4">
      <View className="flex-row border-b border-black pb-2 mb-2">
        <Text className="flex-1 font-bold">#</Text>
        <Text className="flex-2 font-bold">Item</Text>
        <Text className="flex-1 font-bold">Qty</Text>
      </View>

      {data.map((item :any, index:number) => (
        <View key={index} className="flex-row mb-1">
          <Text className="flex-1">{index + 1}</Text>
          <Text className="flex-2">{item.name}</Text>
          <Text className="flex-1">{item.quantity}</Text>
        </View>
        
      ))}
      <View className='absolute bottom-24 items-center'>
              <Button className='ml-3 mr-3 w-80' style={{backgroundColor : '#EC0D6E'}}>
                    <Text className="text-white">Place order</Text>
              </Button>
        </View>
    </View>
  );
}

