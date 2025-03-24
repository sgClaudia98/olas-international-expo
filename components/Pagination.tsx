import { PaginationResponse } from "@/services/interfaces/pagination";
import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface PaginatedListProps {
  data?: PaginationResponse;
  fetchItems: (limit: number, offset: number) => void;
  children: React.ReactNode;
  loading?: boolean;
  pageSize?: number;
  fallback?: React.ReactElement
}

const PaginatedContent: React.FC<PaginatedListProps> = ({
  fetchItems,
  children,
  loading = false,
  pageSize = 10,
  data,
  fallback
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const loadData = async (page: number) => {
    setIsLoading(true);
    const offset = (page - 1) * pageSize;
    try {
      await fetchItems(pageSize, offset);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(data.totals / data.limit));
    } else {
      setTotalPages(0);
    }
  }, [data]);

  useEffect(() => {
    loadData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {loading ? (
        fallback
      ) : totalPages > 0 ? (
        <View style={styles.container}>
          {children}
          <View style={styles.pagination}>
            <Pressable
              onPress={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
            >
              <Text
                style={[
                  styles.pageButton,
                  currentPage === 1 && styles.disabled,
                ]}
              >
                {"<"}
              </Text>
            </Pressable>
            {Array.from({ length: totalPages }, (_, i) => (
              <Pressable
                key={`pg-${i + 1}`}
                onPress={() => handlePageChange(i + 1)}
                disabled={loading}
              >
                <Text
                  style={[
                    styles.pageNumber,
                    i + 1 === currentPage && styles.activePage,
                  ]}
                >
                  {i + 1}
                </Text>
              </Pressable>
            ))}
            <Pressable
              onPress={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
            >
              <Text
                style={[
                  styles.pageButton,
                  currentPage === totalPages && styles.disabled,
                ]}
              >
                {">"}
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default PaginatedContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  pageButton: {
    fontSize: 18,
    marginHorizontal: 10,
    color: "#007BFF",
  },
  pageNumber: {
    fontSize: 16,
    marginHorizontal: 5,
    color: "#000",
  },
  activePage: {
    color: "#fff",
    backgroundColor: "#007BFF",
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  disabled: {
    color: "#ccc",
  },
});
