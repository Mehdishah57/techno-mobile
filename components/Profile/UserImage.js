import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import { Colors, TouchableRipple } from 'react-native-paper';
import { UserContext } from '../../global/UserContext';
import { launchImageLibrary } from 'react-native-image-picker';
import getFileExtension from "../../utils/getFileExtension";
import uploadProfilePicture from "../../services/uploadProfilePicture";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { ThemeContext } from '../../global/ThemeContext';

const UserImage = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const [theme] = useContext(ThemeContext);

    const handleImagePress = async () => {
        const { didCancel, assets } = await launchImageLibrary({ mediaType: 'photo', includeBase64: true });
        if (didCancel) return;
        const extension = getFileExtension(assets[0].fileName);
        setLoading(true);
        const [data, error] = await uploadProfilePicture({ image: `data:image/${extension};base64,` + assets[0].base64 });
        if (error) return alert("We couldn't upload your image");
        setUser({ ...user, image: { url: data.url, public_id: data.public_id } })
        setLoading(false);
    }


    return (
        <View style={styles.container}>
            {!loading && user?.image?.url && <Image
                style={styles.image}
                source={{ uri: user.image.url }}
            />}
            {loading && <View style={styles.container}>
                <ActivityIndicator animating size={70} color={Colors.black} />
            </View>}
            <TouchableRipple 
                borderless 
                style={[styles.upload,backgroundStyles[theme]]} 
                onPress={handleImagePress}>
                <FontAwesome5 
                    name='camera' 
                    size={20} 
                    color={textStyles[theme].color} 
                />
            </TouchableRipple>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 200,
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 250
    },
    upload: {
        position: 'absolute',
        width: 50,
        height: 50,
        backgroundColor:'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        bottom: 10,
        right: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10
    }
})

const backgroundStyles = StyleSheet.create({
    dark: { backgroundColor: '#333333' },
    light: { backgroundColor: 'white' }
})

const textStyles = StyleSheet.create({
    dark: { color: 'white' },
    light: { color: 'black' }
})

export default UserImage;
