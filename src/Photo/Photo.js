import {StyleSheet} from 'react-native';
import {Container, Heading, Button, Text} from 'native-base';
import React from 'react';

const Photo = () => {
  return (
    <Container
      mt={20}
      alignSelf={'center'}
      width={'100%'}
      alignItems={'center'}>
      <Heading textAlign={'center'} fontSize={'xl'}>
        Upload a Photo
      </Heading>

      <Button
        marginTop={5}
        width={200}
        height={200}
        colorScheme={'red'}
        borderRadius={100}>
        <Text fontSize={'3xl'} color={'white'}>
          Press Here!
        </Text>
      </Button>
    </Container>
  );
};

export default Photo;

const styles = StyleSheet.create({});
