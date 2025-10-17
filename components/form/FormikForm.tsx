import React from "react";
import { Formik, FormikConfig, FormikValues } from "formik";
import { PropsWithChildren } from "react";

export const FormikForm = <Values extends FormikValues>(
  props: PropsWithChildren<FormikConfig<Values>>
) => {
  const { children, ...formikProps } = props;
  return <Formik {...formikProps}>{children}</Formik>;
};
