import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";

const Stack = createNativeStackNavigator();

export type StackPramsList = {
    Dashboard: undefined;
    Order: {
      number: number | string;
      order_id: string;
    };
    FinishOrder: {
      number: number | string;
      order_id: string;
    };
  };  

function AppRoutes() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Dashboard" 
                component={Dashboard} 
                options={{ headerShown: false }}
            />
            
            <Stack.Screen
                name="Order"
                component={Order}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}


export default AppRoutes;