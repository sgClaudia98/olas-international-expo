import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ProductItem from "../components/product/ProductItem";
import useSearchMarketOptions, {
  IAllFilters,
} from "../hooks/useSearchMarketOptions";
import Filters from "../components/filter/Filter";
import { useResponsiveStyles } from "@/hooks/useResponsiveStyles";
import responsiveStyle from "../styles/productWrapper";
import PaginatedContent from "@/components/Pagination";
import { useLocalSearchParams, useRouter } from "expo-router";
import ProductsWrapperHeader from "../layout/ProductsWrapperHeader";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import NoSearchResults from "@/components/NoSearchResults";
import BannerSlider from "../components/banners/BannerSlider";
import ProductWrapperSkeleton from "../components/skeletons/ProductWrapperSkeleton";
import { BreadcrumbItem } from "@/components/Breadcrumb";
import { buildBreadcrumb } from "../utils/breadcrumbBuild";
import { useTranslation } from "react-i18next";
import { useSearchContext } from "../context/SearchContext";


const ProductsWrapper: React.FC = () => {
  const styles = useResponsiveStyles(responsiveStyle);
  const { lessThan } = useBreakpoints();

  const { data, items, stats, searchId, loading, fetchPage, updateFilter } =
    useSearchMarketOptions();
  const { selection } = useSearchContext();
  const [showDesktopFilters, setShowDesktopFilters] = React.useState(true);
  const [showMobileDrawer, setShowMobileDrawer] = React.useState(false);

  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>(
    buildBreadcrumb()
  );

  const router = useRouter();

  const handleProductPress = (id: number) => {
    router.push({
      pathname: `./detail/${id}`,
    });
  };

  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    if (data) {
      setTotalProducts(data.totals);
      let items = buildBreadcrumb();
      const ROUTE = "/services/market/products";
            
      if (selection.departmentId) {
        items.pop()
        console.debug("1Sel", selection)
        items.push({
          label: selection.department,
          route: `${ROUTE}?departmentId=${selection.departmentId}`,
        });
        if (selection.category)
          items.push({
            label: selection.category,
            route: `${ROUTE}?departmentId=${selection.departmentId}&categoryId=${selection.categoryId}`,
          });
      }
      setBreadcrumb(items);
    }
  }, [data, selection.department, selection.category]);

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
        isOpenFilters={showDesktopFilters}
        breadcrumb={breadcrumb}
      />
      <View style={styles.wrapper}>
        {!lessThan.tablet && showDesktopFilters && (
          <Filters
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

        {lessThan.tablet && (
          <Filters
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
              {items?.map((val) => (
                <ProductItem
                  key={`prodI-${val.id}-${val.product.id}`}
                  item={val}
                  style={
                    showDesktopFilters || lessThan.tablet
                      ? styles.productOpen
                      : styles.productClose
                  }
                  onClick={() => handleProductPress(val.product.id)}
                />
              ))}
            </View>
          )}
        </PaginatedContent>
      </View>
    </>
  );
};

export default ProductsWrapper;
