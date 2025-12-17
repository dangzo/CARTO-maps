import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import type { VectorTableSourceResponse, CategoryResponse } from '@carto/api-client';

interface RetailStoresWidgetProps {
  retailStoresDataSource: Promise<VectorTableSourceResponse>;
}

export const RetailStoresWidget = ({ retailStoresDataSource }: RetailStoresWidgetProps) => {
  const [totalStores, setTotalStores] = useState(0);
  const [revenueByType, setRevenueByType] = useState<CategoryResponse>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataSource = await retailStoresDataSource;

        // Get total stores count using formula widget
        const totalResult = await dataSource.widgetSource.getFormula({
          column: 'cartodb_id',
          operation: 'count',
        });
        setTotalStores(totalResult.value ?? 0);

        // Get revenue by store type using category widget
        const categoryResult: CategoryResponse = await dataSource.widgetSource.getCategories({
          column: 'storetype',
          operation: 'sum',
          operationColumn: 'revenue',
        });

        setRevenueByType(categoryResult || []);
      } catch (error) {
        // TODO: handle errors properly
        console.error('Error fetching retail stores data:', error); // eslint-disable-line no-console
        setRevenueByType([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [retailStoresDataSource]);

  // Calculate max revenue for scaling histogram bars
  const maxRevenue = useMemo(() => (
    revenueByType.length > 0
      ? Math.max(...revenueByType.map(d => d.value), 1)
      : 1
  ), [revenueByType]);

  return (
    <Card
      sx={{
        position: 'absolute',
        top: 12,
        right: 12,
        minWidth: 280,
        maxWidth: 320,
        backgroundColor: 'white',
        boxShadow: 3,
        zIndex: 1,
      }}
    >
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          Retail Stores
        </Typography>

        {loading ? (
          <>
            <Skeleton height={40} />
            <Skeleton height={120} />
          </>
        ) : (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Total Stores
              </Typography>
              <Typography variant="h4" component="div" color="primary">
                {totalStores}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Revenue by Store Type
              </Typography>

              {revenueByType.map((item) => (
                <Box key={item.name} sx={{ mb: 1.5 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.875rem', fontWeight: 600 }}
                    >
                      ${(item.value / 1000000).toFixed(1)}M
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      height: 8,
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                      borderRadius: 1,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width: `${(item.value / maxRevenue) * 100}%`,
                        height: '100%',
                        backgroundColor: 'primary.main',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};
