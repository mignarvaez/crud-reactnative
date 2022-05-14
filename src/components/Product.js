// Componente para los productos de la ventana del home

// Se importa react y react native
import * as React from 'react';
import * as RN from 'react-native'

// Se importa la conexion a firebase
import {database} from '../config/fb'

// Se importa lo necesario para eliminar, actualizar y trabajar con documentos
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

// Un icono
import {AntDesign} from '@expo/vector-icons'

// Los productos 
export default function Product({
    id, // Este id es unico y generado por firebase
    emoji,
    name,
    price,
    isSold,
}) {

    // Funcion onEdit para cuando se vende el producto
    const onEdit = () =>{

        // Se obtiene referencia al documento a modificar con la id del producto a modificar
        const docRef = doc(database,'products',id);
        // Se actualiza el campo del producto        
        updateDoc(docRef,{
            isSold:true,
        })
    }

    // Funcion para eliminar
    const onDelete = () =>{
        // Obtiene la referencia al producto
        const docRef = doc(database,'products',id);
        // Elimina el producto
        deleteDoc(docRef)
    }

    return(
        <RN.View style={styles.productContainer}>
            
            {/* Vista con la opción eliminar */}
            <RN.View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <RN.Text style={styles.emoji}>{emoji}</RN.Text>
                <AntDesign onPress={onDelete} name='delete' size={24} color='black'/>
            </RN.View>

            <RN.Text style={styles.name}>{name}</RN.Text>
            <RN.Text style={styles.price}>{price}</RN.Text>
            
            {/* Se verifica si esta vendido, el fondo es gris y no hace nada */}
            {isSold ?(            
            <RN.TouchableOpacity style={[styles.button,{backgroundColor:'gray'}]}>
                <RN.Text style={styles.buttonText}>Comprar</RN.Text>
            </RN.TouchableOpacity>
            ):(
            // Si no está vendido se habilita el on press            
            <RN.TouchableOpacity style={styles.button}
                onPress={onEdit}
                >
                <RN.Text style={styles.buttonText}>Comprar</RN.Text>
            </RN.TouchableOpacity>
            )}


        </RN.View>
    )
} 

// Los estilos del componente
const styles = RN.StyleSheet.create({
    productContainer:{
        padding:16,
        backgroundColor: '#fff',
        margin:16,
        borderRadius: 8,
    },
    emoji:{
        fontSize:100,
    },
    name:{
        fontSize:32,
        fontWeight:'bold',
    },
    price:{
        fontSize:24,
        fontWeight:'bold',
        color:'gray',
    },
    button:{
        backgroundColor: '#0FA5E9',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems:'center'
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color:'#fff',
    },
})