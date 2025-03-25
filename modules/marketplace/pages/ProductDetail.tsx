import { StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import ProductInfo from "../components/product/ProductInfo";
import { useGetProductsQuery } from "../services/api/BookingService";
import { useLocationContext } from "@/contexts/locationContext";
import Page from "@/components/layout/Page";
import BackArrow from "@/components/layout/BackArrow";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/styles";
import Breadcrumb from "@/components/Breadcrumb";
import { useTranslation } from "react-i18next";
import { buildBreadcrumb } from "../utils/breadcrumbBuild";

const ProductDetail: FC<{ id: string }> = ({ id }) => {
  const { t } = useTranslation();
  const { activeDestination } = useLocationContext();

  const { data, error, isLoading } = useGetProductsQuery({
    productId: +id,
    destinationId: activeDestination?.id,
  });

  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    if (data)
      setBreadcrumb(
        buildBreadcrumb(
          undefined,
          data.option.product.category,
          data.option.product
        )
      );
  }, [data]);

  return (
    <Page>
      {isLoading ? (
        <ThemedText>Loading...</ThemedText>
      ) : (
        <>
          <View style={styles.row}>
            <Breadcrumb items={breadcrumb} />
          </View>
          {data && (
            <ProductInfo
              item={{
                ...data.option,
                description:
                  "Lorem ipsum dolor sit amet consectetur. Sit in sed rutrum ultrices egestas. Neque leo praesent odio diam. Lorem ipsum dolor sit amet consectetur. Sit in sed rutrum ultrices egestas. Neque leo praesent odio diam.",
                discount: 15,
              }}
            />
          )}
        </>
      )}
    </Page>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
