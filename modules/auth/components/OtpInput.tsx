import { inputStyles } from '@/styles/input';
import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import * as Colors from '@/styles/colors'


interface OtpInputProps {
  value: string; // Valor completo del OTP recibido externamente
  onChange?: (value: string) => void; // Callback para devolver el valor actualizado
  size?: number;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange, size = 6 }) => {
  const [otp, setOtp] = useState(Array(size).fill(''));  
  const inputs = useRef<Array<TextInput | null>>([]); // Define refs como un array de TextInput o null

  // Actualizar los inputs cuando cambia el valor externo
  useEffect(() => {
    const valueArray = value.split('').slice(0, otp.length); // Convertir el string en un array limitado al tamaño del OTP
    setOtp((prevOtp) => {
      // Solo actualiza si el valor es diferente
      if (prevOtp.join('') !== valueArray.join('')) {
        return [...valueArray, ...Array(otp.length - valueArray.length).fill('')]; // Rellena el resto con strings vacíos
      }
      return prevOtp;
    });
  }, [value]);

  // Manejar cambios en los inputs
  const handleOtpChange = (digit: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Devolver el valor completo al padre
    onChange?.(newOtp.join(''));

    // Mover el foco al siguiente input si existe y hay un valor
    if (digit && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

 

  // Manejar retroceso
  const handleBackspace = (index: number) => {
    if (index > 0 && !otp[index]) {
      inputs.current[index - 1]?.focus();
    }
  };

  

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
         <TextInput
         key={`otp-${index}`}
         style={styles.box}
         maxLength={1}
         keyboardType="number-pad"
         value={digit}
         onChangeText={(value) => handleOtpChange(value, index)}
         onKeyPress={({ nativeEvent }) => {
           if (nativeEvent.key === 'Backspace') {
             handleBackspace(index);
           }
         }}
         ref={(ref) => (inputs.current[index] = ref)} // Asignar el ref al array
       />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    borderColor: Colors.blue.primary,
    backgroundColor: Colors.white.default,
    borderWidth: 2,
    borderRadius: 4,
    width: 40,
    height: 50,
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
  },
});export default OtpInput;