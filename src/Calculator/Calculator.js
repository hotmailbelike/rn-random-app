import {StyleSheet, Dimensions, Alert} from 'react-native';
import {
  Container,
  Heading,
  Button,
  Text,
  Stack,
  Spinner,
  Input,
  ScrollView,
  KeyboardAvoidingView,
  Select,
  Divider,
  View,
} from 'native-base';

import React, {useState} from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const screenWidth = Dimensions.get('window').width;

const calculateAPIRoute =
  'https://omar-mern-calendar-backend.herokuapp.com/calculate';

const Calculator = () => {
  const [calculating, setCalculating] = useState(false);

  const [calculateObj, setCalculateObj] = useState({
    num1: '',
    num2: '',
    operation: '+',
  });

  const [result, setResult] = useState(null);

  const handleCalculateObj = (key, value) => {
    setCalculateObj({
      ...calculateObj,
      [key]: value,
    });
  };

  const handleClearNumbers = () => {
    setCalculateObj({...calculateObj, num1: 0, num2: 0});
  };

  const handleCalculate = async () => {
    try {
      let {num1, num2, operation} = {...calculateObj};

      if (num1 === '' || num2 === '') {
        return Alert.alert('No Input', 'Please fill both fields with numbers');
      }

      if (
        (!parseFloat(num1) && num1 != 0) ||
        (!parseFloat(num2) && num2 != 0)
      ) {
        return Alert.alert(
          'Invalid Input',
          'Please Enter numbers only',
          [
            {
              text: 'Ok',
              onPress: handleClearNumbers,
              style: 'cancel',
            },
            {
              text: 'Clear Input',
              onPress: handleClearNumbers,
              style: 'cancel',
            },
          ],
          {
            cancelable: true,
            onDismiss: () => null,
          },
        );
      }

      setCalculating(true);

      let res = await fetch(calculateAPIRoute, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          num1: parseFloat(num1),
          num2: parseFloat(num2),
          operation,
        }),
      });
      res = await res.json();

      if (res.error) {
        throw res.error;
        setCalculating(false);
      }

      setResult(res.result);
      setCalculating(false);
    } catch (error) {
      setCalculating(false);

      console.error(
        '🚀 -> file: Calculator.js -> line 43 -> handleCalculate -> error',
        error,
      );
    }
  };

  if (calculating) {
    return (
      <Stack Stack space={2} marginY={'auto'} alignItems={'center'}>
        <Spinner size="lg" accessibilityLabel="Calculating" />
        <Text color="primary.500" fontSize="md">
          Calculating...
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
            Make a quick Calculation!
          </Heading>
          <Stack marginTop={5} space={5} width={'100%'}>
            <Input
              textAlign={'right'}
              keyboardType="phone-pad"
              variant="unstyled"
              size={'2xl'}
              fontSize="4xl"
              backgroundColor={'gray.200'}
              defaultValue={0}
              value={calculateObj.num1}
              onChangeText={text => handleCalculateObj('num1', text)}
            />
            <Stack direction="row-reverse">
              <Input
                flex={5}
                textAlign={'right'}
                keyboardType="phone-pad"
                variant="unstyled"
                size={'2xl'}
                fontSize="4xl"
                backgroundColor={'gray.200'}
                value={calculateObj.num2}
                defaultValue={0}
                onChangeText={text => handleCalculateObj('num2', text)}></Input>
              <Select
                flex={1}
                textAlign={'right'}
                paddingRight={0}
                dropdownIcon={<></>}
                marginRight={5}
                fontSize="4xl"
                selectedValue={calculateObj.operation}
                accessibilityLabel="Operation"
                placeholder="Operation"
                _selectedItem={{
                  borderRadius: 50,
                  bg: 'blue.100',
                }}
                onValueChange={itemValue =>
                  handleCalculateObj('operation', itemValue)
                }>
                <Select.Item label="+" value="+" />
                <Select.Item label="—" value="-" />
                <Select.Item label="x" value="*" />
              </Select>
            </Stack>
            <Stack direction={'row'} space={3}>
              <Button
                borderRadius={30}
                leftIcon={
                  <MaterialCommunityIcon
                    name="close-circle"
                    color="white"
                    size={20}></MaterialCommunityIcon>
                }
                flex={1}
                colorScheme={'pink'}
                onPress={handleClearNumbers}>
                Clear
              </Button>
              <Button
                borderRadius={30}
                leftIcon={
                  <MaterialCommunityIcon
                    name="calculator"
                    color="white"
                    size={20}></MaterialCommunityIcon>
                }
                flex={2}
                colorScheme={'blue'}
                onPress={handleCalculate}>
                Calculate
              </Button>
            </Stack>

            <Divider
              width={screenWidth * 0.85}
              alignSelf="center"
              thickness={2}
              bg="gray.400"></Divider>
          </Stack>
          <View width={'100%'}>
            <Text textAlign={'right'} fontSize="4xl">
              {result}
            </Text>
          </View>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Calculator;

const styles = StyleSheet.create({});
