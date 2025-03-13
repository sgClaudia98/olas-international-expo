import DropdownSelect from "@/components/DropdownSelect";

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Button, Switch } from "react-native-paper";
import ProductItem from "../components/product/ProductItem";
import useSearchMarketOptions, {
  IAllFilters,
} from "../hooks/useSearchMarketOptions";
import Filters from "../components/filter/Filter";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import responsiveStyle from "../styles/productWrapper";
import PaginatedContent from "@/components/Pagination";
import { useRouter } from "expo-router";
import ProductItemVertical from "../components/product/ProductItemVertical";
import FilterDrawer from "../components/filter/FilterDrawer";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/styles";

const ProductsWrapper: React.FC = () => {
  const styles = useResponsiveStyles(responsiveStyle);

  const { data, items, stats, searchId, loading, fetchPage, updateFilter } =
    useSearchMarketOptions();

  const [showDesktopFilters, setShowDesktopFilters] = React.useState(true);
  const [showMobileDrawer, setShowMobileDrawer] = React.useState(false);

  const [breadcrumb, setBeadCrumb] = useState<string>("All categories");
  const handleItemClick = (trace: any[]) => {
    //console.debug('Item Clicked', `Trace: ${trace.join(' / ')}`);
    setBeadCrumb(trace.map((t) => t.title).join(" / "));
  };
  const router = useRouter();

  const { width: screenWidth } = useWindowDimensions();
  const isMobile = screenWidth < 768;

  const handleProductPress = (id: number) => {
    router.push(`./detail/${id}`);
  };

  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    if (data) setTotalProducts(data.totals);
  }, [data]);

  const toggleDesktopFilters = () => {
    setShowDesktopFilters(!showDesktopFilters);
  };

  const openMobileDrawer = () => {
    setShowMobileDrawer(true);
  };

  const closeMobileDrawer = () => {
    setShowMobileDrawer(false);
  };

  return (
    <>
      <View
        style={{
          marginBottom: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          padding: 10,
        }}
      >
        <Text>{breadcrumb}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: isMobile ? "space-between" : "center",
            width: isMobile ? "100%" : "auto",
            marginTop: isMobile ? 10 : 0,
          }}
        >
          <Text style={styles.productsQtyText}>
            {totalProducts != 1
              ? `${totalProducts} products`
              : `${totalProducts} product`}
          </Text>
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
          {/* Renderizado condicional: Switch en desktop, botón de texto en móvil */}
          {isMobile ? (
            <TouchableOpacity onPress={openMobileDrawer}>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  fontWeight: 400,
                  color: Colors.blue.second,
                }}
              >
                Filters
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                flexDirection: "row",
                paddingStart: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ paddingHorizontal: 10 }}>Show Filters</Text>
              <Switch
                value={showDesktopFilters}
                onValueChange={toggleDesktopFilters}
              />
            </View>
          )}
        </View>
      </View>
      <View style={styles.wrapper}>
        {!isMobile && showDesktopFilters && (
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

        {isMobile && (
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
            isDrawerOpen={showMobileDrawer}
            onCloseDrawer={closeMobileDrawer}
          />
        )}
        <PaginatedContent
          data={data}
          fetchItems={fetchPage}
          pageSize={20}
          loading={loading}
        >
          <View style={styles.products}>
            {items?.map((val) =>
              !isMobile ? (
                <ProductItem
                  key={`prodI-${val.id}-${val.product.id}`}
                  item={val}
                  style={
                    showDesktopFilters
                      ? styles.productOpen
                      : styles.productClose
                  }
                  onClick={() => handleProductPress(val.product.id)}
                />
              ) : (
                <ProductItemVertical
                  key={`prodI-${val.id}-${val.product.id}`}
                  item={val}
                  style={styles.productOpen}
                  onClick={() => handleProductPress(val.product.id)}
                />
              )
            )}
          </View>
        </PaginatedContent>
      </View>
    </>
  );
};

export default ProductsWrapper;
