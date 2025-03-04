import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useFormikContext } from 'formik';
import { Colors } from '@/styles';
import { paymentFormStyles as styles } from '@/modules/marketplace/styles/paymentForm';
import { PaymentFormValues } from '../PaymentFormHelper';

const Step1 = () => {
  const { handleChange, handleBlur, values, errors, touched } = useFormikContext<PaymentFormValues>();

  return (
    <>
      <Text style={styles.tablet.label}>Full Name</Text>
      <TextInput
        style={styles.tablet.input}
        onChangeText={handleChange('client.fullName')}
        onBlur={handleBlur('client.fullName')}
        value={values.client.fullName || ''}
        textColor={Colors.black.primary}
        placeholderTextColor={Colors.black.primary}
        error={!!(touched.client?.fullName && errors.client?.fullName)}
      />
      {touched.client?.fullName && errors.client?.fullName && (
        <Text style={styles.tablet.error}>{errors.client?.fullName}</Text>
      )}

      <View style={styles.tablet.twoColumnContainer}>
        <View style={styles.tablet.columnLeft}>
          <Text style={styles.tablet.label}>Phone Number</Text>
          <TextInput
            style={styles.tablet.input}
            inputMode="tel"
            onChangeText={handleChange('client.phone')}
            onBlur={handleBlur('client.phone')}
            value={values.client.phone || ''}
            textColor={Colors.black.primary}
            placeholderTextColor={Colors.black.primary}
            error={!!(touched.client?.phone && errors.client?.phone)}
          />
          {touched.client?.phone && errors.client?.phone && (
            <Text style={styles.tablet.error}>{errors.client?.phone}</Text>
          )}
        </View>
        <View style={styles.tablet.columnRight}>
          <Text style={styles.tablet.label}>Email</Text>
          <TextInput
            style={styles.tablet.input}
            inputMode="email"
            onChangeText={handleChange('client.email')}
            onBlur={handleBlur('client.email')}
            value={values.client.email || ''}
            textColor={Colors.black.primary}
            placeholderTextColor={Colors.black.primary}
            error={!!(touched.client?.email && errors.client?.email)}
          />
          {touched.client?.email && errors.client?.email && (
            <Text style={styles.tablet.error}>{errors.client?.email}</Text>
          )}
        </View>
      </View>
    </>
  );
};

export default Step1;