// El componente de la navegación. Como es un componente el nombre del archivo va con la primera letra en mayuscula

// Un stack para navegacion
import {createNativeStackNavigator} from "@react-navigation/native-stack";
// El contenedor de la navegacion que tendrá las pantallas
import {NavigationContainer} from "@react-navigation/native";

// Se importan las pantallas
import Home from "./screens/Home";
import Add from "./screens/Add";

// Variable del stack
const Stack = createNativeStackNavigator();

// Función asociada a mi stack
function MyStack(){
    
    return (
        // Se especifica al stack cuales seran las pantallas
        <Stack.Navigator> 
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen 
                name="Add" 
                component={Add}
                options={{presentation:'modal'}}    
            />
        </Stack.Navigator>
    )
}

// Se exporta nuestra navegacion usando el contenedor
export default function Navigation (){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}