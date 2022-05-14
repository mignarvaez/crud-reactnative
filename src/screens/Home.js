// Ventana que permitirá ver los elementos

//Importa todas las librerias necesarias de react y react-native.
import * as React from 'react';
import * as RN from 'react-native';

// Hook para navegacion
import { useNavigation } from '@react-navigation/native';

// Se importa la configuración para acceder a firestore
import { database } from '../config/fb';

// Métodos necesarios para trabajar con firestore
// onSnapshot trae datos cada que se agrega un nuevo elemento en la colección
import { collection,onSnapshot,orderBy,query } from 'firebase/firestore';

// El componente product para mostrar los items
import Product from '../components/Product';

export default function Home(){
    // El hook de navegacion
    const navigation = useNavigation();

    // Los productos a visualizar
    const[products,setProducts] = React.useState([]);

    // LayoutEffet permite hacer cambios en el UI antes de que se renderice toda la pantalla
    React.useLayoutEffect(()=>{

        // Se colocara el boton de agregar en el header right
        navigation.setOptions({
            headerRight: () => <RN.Button title='Agregar' onPress={()=>navigation.navigate('Add')}/>
        })
    },[])

    // Efecto que se ejecuta cada que ocurre algo en la base de datos  
    // Se pasa un arreglo vacio como segundo parametro para evitar peticiones duplicadas
    React.useEffect(()=>{

        const collectionRef = collection(database,'products') // Se hace referencia a la coleccion de productos
    
        // Se hace un query o consulta a la coleccion de productos, ordenandolos por fecha de creación descendentemente
        const q = query(collectionRef, orderBy('createdAt','desc'))

        // Realiza la configuración para actualizar este componente al momento de modificarse la base de datos
        const unsuscribe = onSnapshot(q, querySnapshot =>{
            // Lo asigna a los objetos productos
            setProducts(
      
                // Trae el documento, como es un arreglo se mapea y se itera para cada elemento
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    emoji: doc.data().emoji,
                    name: doc.data().name,
                    price: doc.data().price,
                    isSold: doc.data().isSold,
                    createdAt: doc.data().createdAt,
                })
                )
            )})

        // Retorna el efecto
        
        return unsuscribe;
 
    },[])
 
    return(
       
        <RN.ScrollView style={styles.container}>
            <RN.Text style={styles.title}>Productos</RN.Text>
            
            {/* Se recorren los productos uno a uno con map 
            usando la id como key y recibiendo todo lo que venga de ese objeto
            con el operador spread*/}
            {products.map(product=><Product key={product.id}{...product}/>)}

            {/* Boton que redirecciona a la pantalla de add */}
        </RN.ScrollView>
    )
}

// Estilos del componente
const styles = RN.StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F5F3F9'
    },
    title:{
        fontSize:32,
        fontWeight: 'bold',
        margin:16,
        textAlign:'center'
    },
})