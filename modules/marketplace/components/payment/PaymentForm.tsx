import React, {useState, useMemo} from 'react';
import {View, Text} from 'react-native';
import {Button, TextInput, DataTable} from 'react-native-paper';
import {Formik, FormikErrors, FormikValues} from 'formik';
import * as Yup from 'yup';

import {paymentFormStyles as styles} from '@/modules/marketplace/styles/paymentForm';
import StepProgress from './StepProgress';
import {CartItem} from '../../reducers/ShoppingCartReducer';

import validationSchemas from './orderValidation';
import {Colors} from '@/styles';
import ContentBox from './ContentBox';
import {useCreateMarketBookingMutation} from '../../services/api/BookingService';
import {CreateMarketBookingRequest} from '../../services/interfaces/bookingDetail';
import {useGetProfileQuery} from '@/services/api/AccountService';

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
  const {data: profile, isLoading} = useGetProfileQuery();

  console.log('profile data: ', profile);

  const initialValues = useMemo(
    () => ({
      client: {
        fullName: profile?.fullName ?? '',
        phone: profile?.phone ?? '',
        email: profile?.email ?? '',
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
    }),
    [profile],
  );

  console.log(initialValues);

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

  const [notesEnabled, setNotesEnabled] = useState(false);

  const notes = '';

  const [createMarketBookingAPI] = useCreateMarketBookingMutation();

  const createMarketBooking = async (values: FormikValues) => {
    try {
      const {client, beneficiary, notes} = values;

      const payload: CreateMarketBookingRequest = {
        client: {
          fullName: client.fullName || '',
          phone: client.phone || '',
          email: client.email || '',
        },
        beneficiary: {
          firstName: beneficiary.firstName || '',
          lastName: beneficiary.lastName || '',
          phone: beneficiary.phone || '',
          idDocument: beneficiary.idDocument || '',
          address: {
            line1: beneficiary.address?.line1 || '',
            line2: beneficiary.address?.line2 || '',
            city: beneficiary.address?.city || '',
            state: beneficiary.address?.state || '',
            zipCode: beneficiary.address?.zipCode || '',
          },
        },
        notes: notes,
        preview: true,
      };

      const response = await createMarketBookingAPI(payload).unwrap();

      if (response.success) {
        setStep(3);
      } else {
        console.error('Error en la reserva:', response.error);
      }
    } catch (error) {
      console.error('Error al crear la reserva:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        ...initialValues,
        notes,
      }}
      enableReinitialize={true}
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
                    error={
                      !!(touched.beneficiary?.address?.city && errors.beneficiary?.address?.city)
                    }
                  />
                  {touched.beneficiary?.address?.city && errors.beneficiary?.address?.city && (
                    <Text style={styles.tablet.error}>{errors.beneficiary?.address.city}</Text>
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
                error={
                  !!(touched.beneficiary?.address?.line1 && errors.beneficiary?.address?.line1)
                }
              />
              {touched.beneficiary?.address?.line1 && errors.beneficiary?.address?.line1 && (
                <Text style={styles.tablet.error}>{errors.beneficiary?.address?.line1}</Text>
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
                    error={
                      !!(
                        touched.beneficiary?.address?.zipCode &&
                        errors.beneficiary?.address?.zipCode
                      )
                    }
                  />
                  {touched.beneficiary?.address?.zipCode &&
                    errors.beneficiary?.address?.zipCode && (
                      <Text style={styles.tablet.error}>
                        {errors.beneficiary?.address?.zipCode}
                      </Text>
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
                error={
                  !!(touched.beneficiary?.address?.line2 && errors.beneficiary?.address?.line2)
                }
              />
              {touched.beneficiary?.address?.line2 && errors.beneficiary?.address?.line2 && (
                <Text style={styles.tablet.error}>{errors.beneficiary?.address?.line2}</Text>
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
                      fullName: values.client.fullName || '',
                      email: values.client.email || '',
                      phoneNumber: values.client.phone || '',
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
                    onPress={() => setNotesEnabled(!notesEnabled)}>
                    {notesEnabled ? 'Close note' : 'Open note'}
                  </Button>
                  {notesEnabled && (
                    <textarea
                      style={styles.tablet.commentsTextArea}
                      rows={3}
                      placeholder="Leave your comments here..."
                      color={Colors.black.primary}
                      onChange={handleChange('notes')}
                      onBlur={handleBlur('notes')}
                      value={values.notes}></textarea>
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
              <Text>Client</Text>
              <Text>Full Name: {values.client.fullName}</Text>
              <Text>Phone Number: {values.client.phone}</Text>
              <Text>Email: {values.client.email}</Text>
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
                onPress={() => (step === 2 ? createMarketBooking(values) : handleNextStep(errors))}
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
