import React, { useState } from 'react';
import {Text, View, StyleSheet, TextInput, Image, Alert } from 'react-native';
import Button from '../../../components/Button';
import Colors from '../../../constants/Colors';
const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'; // The import is not working so This will do.
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from "expo-router";

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const {id} = useLocalSearchParams();
    const isUpdating = !!id;

    const onDelete = () => {
        console.warn("Delete!!");
    };

    const confirmDelete = () => {
        Alert.alert("Confirm", 'Are you sure?', [
            {
                text: 'Cancel'
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete,
            }
        ])
    };

    const onSubmit = () => {
        if (isUpdating) {
            onUpdateCreate();
        } else {
            onCreate();
        }
    }

    const onUpdateCreate = () => {
        if (!validateInput()) {
            return;
        }
        console.warn('Updating product');
        resetFields();
    };

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }
        console.warn('Creating product');
        resetFields();
    };

    const resetFields = () => {
        setName('');
        setPrice('');
    };

    const validateInput = () => {
        setErrors('');
        if (!name) {
            setErrors('Name is required');
            return false;
        }
        if (!name) {
            setErrors('Price is required');
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setErrors('Price is not a number');
            return false;
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: isUpdating ? "Update Product": 'Create Product'}}/>
            
            <Image source={{ uri : image || defaultPizzaImage }} style={styles.image}/>
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
            value={name} 
            onChangeText={setName}
            placeholder='Name' 
            style={styles.input}
            />

            <Text style={styles.label}>Price ($)</Text>
            <TextInput
            value={price}
            onChangeText={setPrice} 
            placeholder='9.99' 
            style={styles.input} 
            keyboardType='numeric'
            />

            <Text style={{color : 'red'}}>{errors}</Text>
            <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Create'}/>
            {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    }
});

export default CreateProductScreen;