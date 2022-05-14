// Ventana que permitirá ver los elementos

//Importa todas las librerias necesarias de react y react-native.
import * as React from 'react';
import * as RN from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';

// Importa la configuración para la conexion a la base de datos
import {database} from '../config/fb'

// Importa funcionalidades para guardar los items en firebase
import {collection,addDoc} from 'firebase/firestore'

import { useNavigation } from '@react-navigation/native';

export default function Add(){

    // Se usa la navegacion para redireccionar
    const navigation = useNavigation();

    const[isOpen,setIsOpen] = React.useState(false); // Maneja el estado de si está abierto o no el emoji picker

    // El item o articulo a agregar
    const[newItem, setNewItem]= React.useState({
        emoji: '😊',
        name: '',
        price: 0,
        isSold: false,
        createdAt: new Date(),
    }); //Use state para gestionar las variables de items

    /**
     * Función para gestionar la seleccion de items
     * @param {*} emojiObject 
     */
    const handlePick = (emojiObject)=>{
        setNewItem({
            ...newItem,
            emoji: emojiObject.emoji,
        })
    }

    const onSend = async() => {
        // Indica que agregará con addDoc el objeto item como documento asociado a la colección de productos
        await addDoc(collection(database,'products'),newItem)

        // Después de agregar el objeto regresa a la pantalla anterior
        navigation.goBack();
    }

    return(
        <>
        <RN.View style={styles.container}>
            <RN.Text style={styles.title}>Agregar</RN.Text>
            <RN.Text style={styles.emoji}onPress={()=>setIsOpen(true)}> {newItem.emoji}</RN.Text>
            {/* Configuracion para el emoji picker que permitira seleccionar los emojis */}
            <EmojiPicker
                onEmojiSelected={handlePick}
                open={isOpen}
                onClose={()=> setIsOpen(false)}
            />
        
            <RN.TextInput
                // Con el operador spread indica que conserve los valores que ya tenia el objeto item salvo el texto
                // que se obtiene de la promesa.
                onChangeText={(text)=>setNewItem({...newItem, name:text})}
                placeholder='Nombre del producto'
                style = {styles.inputContainer}
            />

            <RN.TextInput
                // Con el operador spread indica que conserve los valores que ya tenia el objeto item salvo el texto
                // que se obtiene de la promesa.
                onChangeText={(text)=>setNewItem({...newItem, price:text})}
                placeholder='$ Precio'
                style = {styles.inputContainer}
                keyboardType="number-pad"
            />
            <RN.Button title='Publicar' onPress={onSend}/>
        </RN.View>  

        </>
    )
}

// Estilos del componente
const styles = RN.StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center'
    },
    title:{
        fontSize:32,
        fontWeight:'700',
    },
    inputContainer:{
        width: '90%',
        padding: 13,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6
    },
    emoji:{
        fontSize: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        paddingRight: '7%',
        marginVertical: 6,

    }
})