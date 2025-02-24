import React, {useState, useMemo} from 'react';
import {View, Text} from 'react-native';
import {Button, TextInput, DataTable} from 'react-native-paper';
import {Formik, FormikErrors} from 'formik';
import * as Yup from 'yup';

import {paymentFormStyles as styles} from '@/modules/marketplace/styles/paymentForm';
import StepProgress from './StepProgress';
import {CartItem} from '../../reducers/ShoppingCartReducer';

import validationSchemas from './orderValidation';
import {Colors} from '@/styles';
import ContentBox from './ContentBox';
import {Address, AgencyClient} from '../../services/interfaces/bookingDetail';

type ValidationSchemas = {
  [key: number]: Yup.ObjectSchema<any>;
};

const PaymentForm = ({
  cartItems,
  province,
  destinationCountry,
}: {
  cartItems: CartItem<any>[];
  province: string;
  destinationCountry: string;
}) => {
  const [step, setStep] = useState(1);

  const initialValues: {
    person: Partial<AgencyClient>;
    beneficiary: Partial<AgencyClient> & {address?: Partial<Address>};
  } = {
    person: {
      fullName: '',
      phone: '',
      email: '',
    },
    beneficiary: {
      firstName: '',
      lastName: '',
      phone: '',
      idDocument: '',
      address: {
        state: province,
        city: '',
        line1: '',
        line2: '',
        zipCode: destinationCountry !== 'CU' ? '' : 'CU',
      },
    },
  };

  const validationSchema = useMemo(
    () => (validationSchemas as ValidationSchemas)[step] || Yup.object(),
    [step],
  );

  const handleNextStep = (errors: FormikErrors<any>) => {
    console.log('Errors:', errors);

    if (Object.keys(errors).length === 0) {
      setStep(step + 1);
    }
  };

  const [commentsEnabled, setCommentsEnabled] = useState(false);

  const comments = '';

  return (
    <Formik
      initialValues={{
        ...initialValues,
        comments,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, {setSubmitting}) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={styles.tablet.formContainer}>
          <Text style={styles.tablet.title}>Booking steps</Text>
          <StepProgress step={step - 1} />

          {step === 1 && (
            <>
              <Text style={styles.tablet.label}>Full Name</Text>
              <TextInput
                style={styles.tablet.input}
                onChangeText={handleChange('person.fullName')}
                onBlur={handleBlur('person.fullName')}
                value={values.person.fullName || ''}
                textColor={Colors.black.primary}
                placeholderTextColor={Colors.black.primary}
                error={!!(touched.person?.fullName && errors.person?.fullName)}
              />
              {touched.person?.fullName && errors.person?.fullName && (
                <Text style={styles.tablet.error}>{errors.person?.fullName}</Text>
              )}

              <View style={styles.tablet.twoColumnContainer}>
                <View style={styles.tablet.columnLeft}>
                  <Text style={styles.tablet.label}>Phone Number</Text>
                  <TextInput
                    style={styles.tablet.input}
                    inputMode="tel"
                    onChangeText={handleChange('person.phone')}
                    onBlur={handleBlur('person.phone')}
                    value={values.person.phone || ''}
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                    error={!!(touched.person?.phone && errors.person?.phone)}
                  />
                  {touched.person?.phone && errors.person?.phone && (
                    <Text style={styles.tablet.error}>{errors.person?.phone}</Text>
                  )}
                </View>
                <View style={styles.tablet.columnRight}>
                  <Text style={styles.tablet.label}>Email</Text>
                  <TextInput
                    style={styles.tablet.input}
                    inputMode="email"
                    onChangeText={handleChange('person.email')}
                    onBlur={handleBlur('person.email')}
                    value={values.person.email || ''}
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                    error={!!(touched.person?.email && errors.person?.email)}
                  />
                  {touched.person?.email && errors.person?.email && (
                    <Text style={styles.tablet.error}>{errors.person?.email}</Text>
                  )}
                </View>
              </View>
            </>
          )}

          {step === 2 && (
            <>
              <View style={styles.tablet.twoColumnContainer}>
                <View style={styles.tablet.columnLeft}>
                  <Text style={styles.tablet.label}>First name</Text>
                  <TextInput
                    style={styles.tablet.input}
                    onChangeText={handleChange('beneficiary.firstName')}
                    onBlur={handleBlur('beneficiary.firstName')}
                    value={values.beneficiary.firstName || ''}
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                    error={!!(touched.beneficiary?.firstName && errors.beneficiary?.firstName)}
                  />
                  {touched.beneficiary?.firstName && errors.beneficiary?.firstName && (
                    <Text style={styles.tablet.error}>{errors.beneficiary?.firstName}</Text>
                  )}
                </View>

                <View style={styles.tablet.columnRight}>
                  <Text style={styles.tablet.label}>Last names</Text>
                  <TextInput
                    style={styles.tablet.input}
                    onChangeText={handleChange('beneficiary.lastName')}
                    onBlur={handleBlur('beneficiary.lastName')}
                    value={values.beneficiary.lastName || ''}
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                    error={!!(touched.beneficiary?.lastName && errors.beneficiary?.lastName)}
                  />
                  {touched.beneficiary?.lastName && errors.beneficiary?.lastName && (
                    <Text style={styles.tablet.error}>{errors.beneficiary.lastName}</Text>
                  )}
                </View>
              </View>

              <View style={styles.tablet.twoColumnContainer}>
                <View style={styles.tablet.columnLeft}>
                  <Text style={styles.tablet.label}>Phone number</Text>
                  <TextInput
                    style={styles.tablet.input}
                    inputMode="tel"
                    onChangeText={handleChange('beneficiary.phone')}
                    onBlur={handleBlur('beneficiary,phone')}
                    value={values.beneficiary.phone || ''}
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                    error={!!(touched.beneficiary?.phone && errors.beneficiary?.phone)}
                  />
                  {touched.beneficiary?.phone && errors.beneficiary?.phone && (
                    <Text style={styles.tablet.error}>{errors.beneficiary?.phone}</Text>
                  )}
                </View>

                <View style={styles.tablet.columnRight}>
                  <Text style={styles.tablet.label}>CI/DNI*</Text>
                  <TextInput
                    style={styles.tablet.input}
                    onChangeText={handleChange('beneficiary.idDocument')}
                    onBlur={handleBlur('beneficiary.idDocument')}
                    value={values.beneficiary.idDocument || ''}
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                    error={!!(touched.beneficiary?.idDocument && errors.beneficiary?.idDocument)}
                  />
                  {touched.beneficiary?.idDocument && errors.beneficiary?.idDocument && (
                    <Text style={styles.tablet.error}>{errors.beneficiary.idDocument}</Text>
                  )}
                </View>
              </View>

              <View style={styles.tablet.twoColumnContainer}>
                <View style={styles.tablet.columnLeft}>
                  <Text style={styles.tablet.label}>State (Provincia)</Text>
                  <TextInput
                    style={styles.tablet.input}
                    value={values.beneficiary.address?.state || ''}
                    disabled
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                  />
                </View>

                <View style={styles.tablet.columnRight}>
                  <Text style={styles.tablet.label}>City (Municipio)</Text>
                  <TextInput
                    style={styles.tablet.input}
                    onChangeText={handleChange('beneficiary.address.city')}
                    onBlur={handleBlur('beneficiary.address.city')}
                    value={values.beneficiary.address?.city || ''}
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                    error={!!(touched.beneficiary?.address && errors.beneficiary?.address)}
                  />
                  {touched.beneficiary?.address && errors.beneficiary?.address && (
                    <Text style={styles.tablet.error}>{errors.beneficiary?.address}</Text>
                  )}
                </View>
              </View>

              <Text style={styles.tablet.label}>Address</Text>
              <TextInput
                style={styles.tablet.input}
                onChangeText={handleChange('beneficiary.address.line1')}
                onBlur={handleBlur('beneficiary.address.line1')}
                value={values.beneficiary.address?.line1 || ''}
                textColor={Colors.black.primary}
                placeholderTextColor={Colors.black.primary}
                error={!!(touched.beneficiary?.address && errors.beneficiary?.address)}
              />
              {touched.beneficiary?.address && errors.beneficiary?.address && (
                <Text style={styles.tablet.error}>{errors.beneficiary?.address}</Text>
              )}
              {destinationCountry !== 'CU' && (
                <>
                  <Text style={styles.tablet.label}>Zip Code</Text>
                  <TextInput
                    style={styles.tablet.input}
                    onChangeText={handleChange('beneficiary.address.zipcode')}
                    onBlur={handleBlur('beneficiary.address.zipcode')}
                    value={values.beneficiary.address?.zipCode || ''}
                    textColor={Colors.black.primary}
                    placeholderTextColor={Colors.black.primary}
                    error={!!(touched.beneficiary?.address && errors.beneficiary?.address)}
                  />
                  {touched.beneficiary?.address && errors.beneficiary?.address && (
                    <Text style={styles.tablet.error}>{errors.beneficiary?.address}</Text>
                  )}
                </>
              )}
              <Text style={styles.tablet.label}>Neighborhood (Reparto)</Text>
              <TextInput
                style={styles.tablet.input}
                onChangeText={handleChange('beneficiary.address.line2')}
                onBlur={handleBlur('beneficiary.address.line2')}
                value={values.beneficiary.address?.line2 || ''}
                textColor={Colors.black.primary}
                placeholderTextColor={Colors.black.primary}
                error={!!(touched.beneficiary?.address && errors.beneficiary?.address)}
              />
              {touched.beneficiary?.address && errors.beneficiary?.address && (
                <Text style={styles.tablet.error}>{errors.beneficiary?.address}</Text>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <View style={styles.tablet.twoColumnContainer}>
                <View style={styles.tablet.column}>
                  <ContentBox
                    title="Client"
                    data={{
                      fullName: values.person.fullName || '',
                      email: values.person.email || '',
                      phoneNumber: values.person.phone || '',
                    }}
                    backgroundColor={Colors.black.fifth}
                  />
                </View>
                <View style={styles.tablet.column}>
                  <ContentBox
                    title="Beneficiary"
                    data={{
                      name: values.beneficiary.firstName + ' ' + values.beneficiary.lastName,
                      identification: values.beneficiary.idDocument || '',
                      phoneNumber: values.beneficiary.phone || '',
                      address: values.beneficiary.address?.line1 || '',
                    }}
                    backgroundColor={Colors.blue.fifth}
                  />
                </View>
              </View>
              <View style={styles.tablet.productTableContainer}>
                <Text style={styles.tablet.orderText}>Order</Text>
                <DataTable>
                  <DataTable.Header style={styles.tablet.tableHeader}>
                    <DataTable.Title>
                      <Text style={styles.tablet.label}>Product</Text>
                    </DataTable.Title>
                    <DataTable.Title numeric>
                      <Text style={styles.tablet.label}>Quantity</Text>
                    </DataTable.Title>
                    <DataTable.Title numeric>
                      <Text style={styles.tablet.label}>Price</Text>
                    </DataTable.Title>
                  </DataTable.Header>
                </DataTable>
                {cartItems.map(item => (
                  <DataTable.Row
                    key={`${item.data.id}-${item.data.product.id}`}
                    style={styles.tablet.tableRow}>
                    <DataTable.Cell>
                      <Text style={styles.tablet.text}>{item.data.product.name}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <Text style={styles.tablet.text}>{item.data.quantity}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <Text style={styles.tablet.text}>${item.data.price}</Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
                <View style={styles.tablet.separator}></View>
                <View style={styles.tablet.commentsContainer}>
                  <Button
                    style={styles.tablet.commentsButton}
                    onPress={() => setCommentsEnabled(!commentsEnabled)}>
                    {commentsEnabled ? 'Close note' : 'Open note'}
                  </Button>
                  {commentsEnabled && (
                    <textarea
                      style={styles.tablet.commentsTextArea}
                      rows={3}
                      placeholder="Leave your comments here..."
                      color={Colors.black.primary}
                      onChange={handleChange('comments')}
                      onBlur={handleBlur('comments')}
                      value={values.comments}></textarea>
                  )}
                  <Text style={styles.tablet.totalPrice}>
                    Total ${cartItems.reduce((acc, item) => acc + item.data.price, 0).toFixed(2)}
                  </Text>
                </View>
              </View>
            </>
          )}

          {step === 4 && (
            <>
              <Text>Person</Text>
              <Text>Full Name: {values.person.fullName}</Text>
              <Text>Phone Number: {values.person.phone}</Text>
              <Text>Email: {values.person.email}</Text>
              <Text>Beneficiary</Text>
              <Text>First Name: {values.beneficiary.firstName}</Text>
              <Text>Last Name: {values.beneficiary.lastName}</Text>
              <Text>Phone Number: {values.beneficiary.phone}</Text>
              <Text>Identification: {values.beneficiary.idDocument}</Text>
              <Text>State: {values.beneficiary.address?.state}</Text>
              <Text>City: {values.beneficiary.address?.city}</Text>
              <Text>Address: {values.beneficiary.address?.line1}</Text>
              <Text>Neighborhood: {values.beneficiary.address?.line2}</Text>
              <Text>Zip Code: {values.beneficiary.address?.zipCode}</Text>
            </>
          )}

          <View style={styles.tablet.buttonContainer}>
            {step > 1 && (
              <Button
                mode="outlined"
                onPress={() => setStep(step - 1)}
                style={styles.tablet.button}>
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button
                mode="contained"
                onPress={() => handleNextStep(errors)}
                style={styles.tablet.button}>
                Next
              </Button>
            ) : (
              <Button
                mode="contained"
                onPress={() => handleSubmit()}
                style={styles.tablet.button}>
                Submit
              </Button>
            )}
          </View>
        </View>
      )}
    </Formik>
  );
};

export default PaymentForm;
