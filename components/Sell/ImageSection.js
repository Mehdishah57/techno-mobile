import { FlatList } from 'react-native'
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import getFileExtension from "../../utils/getFileExtension";
import ErrorText from '../ErrorText';
import ImagePicker from './ImagePicker';

const ImageSection = ({setFieldValue, pictures, error, touched}) => {
  const [images, setImages] = useState({});

  const handlePress = async (name) => {
    const { didCancel, assets } = await launchImageLibrary({ mediaType: 'photo', includeBase64: true });
    if (didCancel) return;
    const extension = getFileExtension(assets[0].fileName);
    let imageBase64 = `data:image/${extension};base64,` + assets[0].base64;
    setImages({...images, [name]:imageBase64});
    setFieldValue("picture", {...pictures, [name]:imageBase64});
  }

  return <>
  <FlatList 
    data={["image1","image2","image3","image4","image5","image6"]}
    renderItem={({item}) => <ImagePicker
      onPress={handlePress}
      name={item}
      uri={images[item]}
      key={item}
    />}
    keyExtractor={(item, index)=>index}
    horizontal
  />
  <ErrorText touched={touched} error={error?.image1} />
  </>
}

export default ImageSection;