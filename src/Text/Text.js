import {StyleSheet, Alert} from 'react-native';
import {
  Container,
  Heading,
  Button,
  Text,
  View,
  Stack,
  Spinner,
  TextArea,
  ScrollView,
  KeyboardAvoidingView,
} from 'native-base';

import React, {useState, useEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthContext} from '../Auth/AuthProvider';

const TextScreen = () => {
  const {user} = useContext(AuthContext);
  const isFocused = useIsFocused();

  const [note, setNote] = React.useState('');
  const [noteDocumentId, setNoteDocumentId] = useState('');

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const noteCollection = firestore().collection('notes');

  const handleSaveNote = async () => {
    setSaving(true);
    try {
      let timestamp = firestore.FieldValue.serverTimestamp();

      let noteDocument = null;

      if (noteDocumentId !== '') {
        await noteCollection.doc(noteDocumentId).update({
          note,
          updatedAt: timestamp,
        });
      } else {
        noteDocument = await noteCollection.add({
          note,
          noteOfUser: user.uid,
          createdAt: timestamp,
        });

        setNoteDocumentId(noteDocument.id);
      }

      setSaving(false);
    } catch (error) {
      setSaving(false);

      console.error(
        '🚀 -> file: Text.js -> line 37 -> handleSaveNote -> error',
        error,
      );
    }
  };

  const handleDeleteNote = async () => {
    try {
      setNote('');
      setNoteDocumentId('');

      await noteCollection.doc(noteDocumentId).delete();
    } catch (error) {
      console.error(
        '🚀 -> file: Text.js -> line 71 -> handleDeleteNote -> error',
        error,
      );
    }
  };

  useEffect(() => {
    if (isFocused === true) {
      setLoading(true);

      noteCollection
        .where('noteOfUser', '==', user.uid)
        .limit(1)
        .get()
        .then(data => {
          if (data.docs.length > 0) {
            let document = {...data.docs[0].data(), id: data.docs[0].id};

            setNote(document?.note);
            setNoteDocumentId(document?.id);
          }
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);

          console.error(
            '🚀 -> file: Text.js -> line 60 -> useEffect -> error',
            error,
          );
        });
    }
  }, [isFocused]);

  if (saving) {
    return (
      <Stack space={2} marginY={'auto'} alignItems={'center'}>
        <Spinner size="lg" accessibilityLabel="Saving Note" />
        <Text color="primary.500" fontSize="md">
          Saving Notes...
        </Text>
      </Stack>
    );
  }

  if (loading) {
    return (
      <Stack space={2} marginY={'auto'} alignItems={'center'}>
        <Spinner size="lg" accessibilityLabel="Fetching Notes" />
        <Text color="primary.500" fontSize="md">
          Fetching Notes...
        </Text>
      </Stack>
    );
  }

  return (
    <KeyboardAvoidingView
      paddingBottom={10}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <Container
          mt={20}
          alignSelf={'center'}
          width={'100%'}
          alignItems={'center'}>
          <Heading textAlign={'center'} fontSize={'xl'}>
            {noteDocumentId === '' ? 'Save your Notes' : 'Update your Notes'}
          </Heading>
          <TextArea
            marginTop={5}
            h={200}
            placeholder="Jot down your notes here..."
            value={note}
            onChangeText={text => setNote(text)}
          />
          <Stack direction={'row'} space={3}>
            {noteDocumentId !== '' && (
              <Button
                borderRadius={30}
                leftIcon={
                  <MaterialCommunityIcon
                    name="trash-can-outline"
                    color="white"
                    size={20}></MaterialCommunityIcon>
                }
                isDisabled={note === ''}
                colorScheme={'danger'}
                onPress={() =>
                  Alert.alert(
                    'Are you sure?',
                    'All data will be lost',
                    [
                      {
                        text: 'Yes',
                        onPress: handleDeleteNote,
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
                marginTop={5}>
                Delete Note
              </Button>
            )}
            <Button
              borderRadius={30}
              leftIcon={
                <MaterialCommunityIcon
                  name="text-box-plus-outline"
                  color="white"
                  size={20}></MaterialCommunityIcon>
              }
              isDisabled={note === ''}
              colorScheme={'darkBlue'}
              onPress={handleSaveNote}
              marginTop={5}>
              {noteDocumentId === '' ? 'Save Note' : 'Update Changes'}
            </Button>
          </Stack>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TextScreen;

const styles = StyleSheet.create({});
