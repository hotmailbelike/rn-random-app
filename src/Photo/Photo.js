import {StyleSheet, Alert} from 'react-native';
import {
  Container,
  Heading,
  Button,
  Text,
  Image,
  View,
  Stack,
  Modal,
  Spinner,
} from 'native-base';
import React, {useState, useEffect, useContext} from 'react';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthContext} from '../Auth/AuthProvider';

const Photo = () => {
  const {user} = useContext(AuthContext);
  const isFocused = useIsFocused();

  const [photoFile, setPhotoFile] = React.useState(null);
  const [currentPhotoUrl, setCurrentPhotoUrl] = React.useState('');
  const [photoDocumentId, setPhotoDocumentId] = useState('');
  const [showImageOptionsModal, setShowImageOptionsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const photoCollection = firestore().collection('photos');

  const imagePickerCallback = imageResponse => {
    if (imageResponse && !imageResponse.didCancel) {
      if (imageResponse.assets[0].type.split('/')[0] !== 'image') {
        return Alert.alert(
          'Invalid File format',
          'Please select an Image only',
        );
      }
      setShowImageOptionsModal(false);

      if (imageResponse.assets[0].width && imageResponse.assets[0].width > 0) {
        setPhotoFile(imageResponse.assets[0]);
      }
    }
  };

  const imagePickerOptions = {
    noData: true,
    mediaType: 'photo',
  };

  const handleLaunchCamera = () => {
    launchCamera(imagePickerOptions, response => imagePickerCallback(response));
  };

  const handleLaunchGallery = () => {
    launchImageLibrary(imagePickerOptions, response =>
      imagePickerCallback(response),
    );
  };

  const uploadToFirebase = async () => {
    setUploading(true);
    try {
      if (photoFile && photoFile.fileName) {
        if (currentPhotoUrl && currentPhotoUrl !== '') {
          let oldMediaUrlRef = storage().refFromURL(currentPhotoUrl);
          let oldMedUrlFullRef = storage().ref(oldMediaUrlRef.fullPath);

          await oldMedUrlFullRef.delete();
        }

        let refName =
          'display_pictures/' +
          photoFile.fileName.split('.')[0] +
          '.' +
          photoFile.type.split('/')[1];

        const reference = storage().ref(refName);

        await reference.putFile(
          Platform.OS === 'ios'
            ? photoFile.uri.replace('file://', '')
            : photoFile.uri,
          {cacheControl: 'max-age=31536000', contentType: photoFile.type},
        );

        const url = await storage().ref(refName).getDownloadURL();

        let timestamp = firestore.FieldValue.serverTimestamp();

        var photoDocument = null;

        if (photoDocumentId !== '') {
          await photoCollection.doc(photoDocumentId).update({
            photoUrl: url,
            updatedAt: timestamp,
          });
        } else {
          photoDocument = await photoCollection.add({
            photoUrl: url,
            photoOfUser: user.uid,
            createdAt: timestamp,
          });

          setPhotoDocumentId(photoDocument.id);
        }

        setCurrentPhotoUrl(url);

        setUploading(false);
        setPhotoFile(null);
      }
    } catch (error) {
      console.error('uploadToFirebase -> error', error);
      setUploading(false);
    }
  };

  const handleDeletePhoto = async () => {
    try {
      let photoDocumentIdCopy = photoDocumentId;
      let currentPhotoUrlCopy = currentPhotoUrl;

      setCurrentPhotoUrl('');
      setPhotoDocumentId('');
      setPhotoFile(null);

      await photoCollection.doc(photoDocumentIdCopy).delete();

      if (currentPhotoUrlCopy && currentPhotoUrlCopy !== '') {
        let oldMediaUrlRef = storage().refFromURL(currentPhotoUrlCopy);
        let oldMedUrlFullRef = storage().ref(oldMediaUrlRef.fullPath);

        await oldMedUrlFullRef.delete();
      }
    } catch (error) {
      console.error(
        '🚀 -> file: Text.js -> line 71 -> handleDeletePhoto -> error',
        error,
      );
    }
  };

  useEffect(() => {
    if (isFocused === true) {
      setLoading(true);
      photoCollection
        .where('photoOfUser', '==', user.uid)
        .limit(1)
        .get()
        .then(data => {
          if (data.docs.length > 0) {
            let document = {...data.docs[0].data(), id: data.docs[0].id};

            setCurrentPhotoUrl(document?.photoUrl);
            setPhotoDocumentId(document?.id);
          }
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);

          console.error(
            '🚀 -> file: Photo.js -> line 113 -> useEffect -> error',
            error,
          );
        });
    }
  }, [isFocused]);

  if (uploading) {
    return (
      <Stack space={2} marginY={'auto'} alignItems={'center'}>
        <Spinner size="lg" accessibilityLabel="Uploading Image" />
        <Text color="primary.500" fontSize="md">
          Uploading...
        </Text>
      </Stack>
    );
  }

  if (loading) {
    return (
      <Stack space={2} marginY={'auto'} alignItems={'center'}>
        <Spinner size="lg" accessibilityLabel="Fetching Data" />
        <Text color="primary.500" fontSize="md">
          Fetching Profile Data...
        </Text>
      </Stack>
    );
  }

  return (
    <Container
      mt={20}
      alignSelf={'center'}
      width={'100%'}
      alignItems={'center'}>
      <Heading textAlign={'center'} fontSize={'xl'}>
        {currentPhotoUrl !== ''
          ? 'Your Display Picture'
          : 'Upload Your Display Picture'}
      </Heading>

      {photoFile == null && currentPhotoUrl === '' && (
        <View
          marginTop={5}
          width={300}
          height={300}
          borderRadius={150}
          backgroundColor="gray.500"
          justifyContent={'center'}>
          <Text fontSize={'xl'} color={'white'} textAlign="center">
            Preferred dimensions
          </Text>
          <Text fontSize={'xl'} color={'white'} textAlign="center">
            250 x 250
          </Text>
        </View>
      )}

      {(photoFile != null || currentPhotoUrl !== '') && (
        <Image
          marginTop={5}
          width={300}
          height={300}
          resizeMode={'cover'}
          borderRadius={150}
          source={{
            uri: photoFile?.uri || photoFile?.path || currentPhotoUrl,
          }}
          alt={photoFile?.fileName || 'Firebase Image'}></Image>
      )}

      <Stack direction={'row'} marginTop="5" space={3}>
        <Button
          borderRadius={30}
          leftIcon={
            <MaterialCommunityIcon
              name="camera-plus"
              color="white"
              size={20}></MaterialCommunityIcon>
          }
          onPress={() => setShowImageOptionsModal(true)}
          colorScheme={'darkBlue'}>
          {photoDocumentId !== '' || photoFile != null
            ? 'Change Photo'
            : 'Upload new Photo'}
        </Button>
        {photoFile != null && (
          <Button
            borderRadius={30}
            leftIcon={
              <MaterialCommunityIcon
                name="cloud-upload"
                color="white"
                size={20}></MaterialCommunityIcon>
            }
            onPress={uploadToFirebase}
            colorScheme={'success'}>
            Save Image
          </Button>
        )}
      </Stack>

      {photoDocumentId !== '' && (
        <Button
          borderRadius={30}
          leftIcon={
            <MaterialCommunityIcon
              name="trash-can-outline"
              color="white"
              size={20}></MaterialCommunityIcon>
          }
          colorScheme={'danger'}
          onPress={() =>
            Alert.alert(
              'Are you sure?',
              'Photo will be permanently deleted',
              [
                {
                  text: 'Yes',
                  onPress: handleDeletePhoto,
                  style: 'cancel',
                },
                {
                  text: 'No',
                  style: 'cancel',
                },
              ],
              {
                cancelable: true,
                onDismiss: () => null,
              },
            )
          }
          marginTop={3}>
          Delete Photo
        </Button>
      )}

      {/*  */}
      <Modal
        size={'md'}
        isOpen={showImageOptionsModal}
        onClose={() => setShowImageOptionsModal(false)}>
        <Modal.Content maxWidth={400}>
          <Modal.Header
            borderBottomColor={'transparent'}
            alignItems={'center'}
            marginBottom={-3}
            paddingBottom={-10}>
            Select an Upload Option{' '}
          </Modal.Header>
          <Modal.Body>
            <Stack direction={'column'} space={4}>
              <Button
                borderRadius={30}
                onPress={handleLaunchCamera}
                colorScheme={'info'}>
                Launch Camera
              </Button>
              <Button
                borderRadius={30}
                onPress={handleLaunchGallery}
                colorScheme={'primary'}>
                Select from Gallery
              </Button>
            </Stack>
          </Modal.Body>
          <Modal.Footer
            marginTop={-2}
            paddingTop={-10}
            borderTopColor={'transparent'}>
            <Button.Group>
              <Button
                borderRadius={30}
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowImageOptionsModal(false);
                }}>
                Cancel
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Container>
  );
};

export default Photo;

const styles = StyleSheet.create({});
