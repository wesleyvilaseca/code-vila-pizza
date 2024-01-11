import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SigIn from "../pages/SigIn";

const Stack = createNativeStackNavigator();


function AuthRoutes() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="SigIn" component={SigIn} options={{ headerShown: false}} />
        </Stack.Navigator>
    )
}

export default AuthRoutes;