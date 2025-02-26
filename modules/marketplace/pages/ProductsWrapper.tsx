import DropdownSelect from "@/components/DropdownSelect";

import React, { useContext, useMemo, useState } from "react";
import { View, Text, ViewStyle } from "react-native";
import { Switch } from "react-native-paper";
import ProductItem from "../components/product/ProductItem";
import useSearchMarketOptions, {
  IAllFilters,
} from "../hooks/useSearchMarketOptions";
import Filters from "../components/filter/Filter";
import { useNavigation } from "@react-navigation/core";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import responsiveStyle from "../styles/productWrapper";
import PaginatedContent from "@/components/Pagination";
import Page from "@/components/layout/Page";
import { useRouter } from "expo-router";

const ProductsWrapper: React.FC = () => {
  const styles = useResponsiveStyles(responsiveStyle);

  const { data, items, stats, searchId, loading, fetchPage, updateFilter } =
    useSearchMarketOptions();
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);

  const [breadcrumb, setBeadCrumb] = useState<string>("All categories");
  const handleItemClick = (trace: any[]) => {
    //console.debug('Item Clicked', `Trace: ${trace.join(' / ')}`);
    setBeadCrumb(trace.map((t) => t.title).join(" / "));
  };
  const router = useRouter();

  const handleProductPress = (id: number) => {
    router.push(`./detail/${id}`);
  };

  return (
    <>
      <View
        style={{
          marginBottom: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>{breadcrumb}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <DropdownSelect
            buttonTitle="Sort by:"
            menuItems={[
              { label: "Best match", value: "best_match" },
              { label: "Lowest price", value: "lowest_price" },
              { label: "Highest price", value: "highest_price" },
            ]}
            value="best_match"
            onSelect={(value) => console.log("Selected value:", value)}
          />
          <View style={{ flexDirection: "row", paddingStart: 5 }}>
            <Text style={{ paddingHorizontal: 10 }}>Show Filters</Text>
            <Switch
              value={isSwitchOn}
              onValueChange={() => setIsSwitchOn(!isSwitchOn)}
            />
          </View>
        </View>
      </View>
      <View style={styles.wrapper}>
        {isSwitchOn && (
          <Filters
            onItemClick={handleItemClick}
            setFilter={updateFilter}
            stats={
              stats && searchId
                ? {
                    data: stats,
                    searchId: searchId,
                  }
                : undefined
            }
          />
        )}
        <PaginatedContent
          data={data}
          fetchItems={fetchPage}
          pageSize={20}
          loading={loading}
        >
          <View style={styles.products}>
            {items?.map((val) => (
              <ProductItem
                key={`prodI-${val.id}-${val.product.id}`}
                item={val}
                style={
                  (isSwitchOn
                    ? styles.productOpen
                    : styles.productClose)
                }
                onClick={() => handleProductPress(val.product.id)}
              />
            ))}
          </View>
        </PaginatedContent>
      </View>
    </>
  );
};

export default ProductsWrapper;
