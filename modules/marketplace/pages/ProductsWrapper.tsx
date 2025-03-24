import React, { useEffect, useId, useState } from "react";
import {
  View
} from "react-native";
import ProductItem from "../components/product/ProductItem";
import useSearchMarketOptions, {
  IAllFilters,
} from "../hooks/useSearchMarketOptions";
import Filters from "../components/filter/Filter";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import responsiveStyle from "../styles/productWrapper";
import PaginatedContent from "@/components/Pagination";
import { useRouter } from "expo-router";
import ProductsWrapperHeader from "../layout/ProductsWrapperHeader";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import NoSearchResults from "@/components/NoSearchResults";
import BannerSlider from "../components/banners/BannerSlider";
import ProductWrapperSkeleton from "../components/skeletons/ProductWrapperSkeleton";

const ProductsWrapper: React.FC = () => {
  const styles = useResponsiveStyles(responsiveStyle);
  const { isMobile } = useBreakpoints();

  const { data, items, stats, searchId, loading, fetchPage, updateFilter } =
    useSearchMarketOptions();

  const [showDesktopFilters, setShowDesktopFilters] = React.useState(true);
  const [showMobileDrawer, setShowMobileDrawer] = React.useState(false);

  const [breadcrumb, setBeadCrumb] = useState<string>("All categories");
  const handleItemClick = (trace: any[]) => {
    setBeadCrumb(trace.map((t) => t.title).join(" / "));
  };
  const router = useRouter();

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
      <BannerSlider />
      <ProductsWrapperHeader
        toggleFilters={toggleDesktopFilters}
        openMobileDrawer={openMobileDrawer}
        total={totalProducts}
        breadcrumb={breadcrumb}
        isOpenFilters={showDesktopFilters}
      />
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
          fallback={<ProductWrapperSkeleton />}
        >
          {items.length === 0 ? (
            <NoSearchResults />
          ) : (
            <View style={styles.products}>
              {items?.map((val) =>
                
                  <ProductItem
                    key={`prodI-${val.id}-${val.product.id}`}
                    item={val}
                    style={
                      showDesktopFilters || isMobile
                        ? styles.productOpen
                        : styles.productClose
                    }
                    onClick={() => handleProductPress(val.product.id)}
                  />
              )}
            </View>
          )}
        </PaginatedContent>
      </View>
    </>
  );
};

export default ProductsWrapper;
