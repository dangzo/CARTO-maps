import { useEffect, useMemo, useState } from 'react';
import { fetchDomain } from '@/api/domains';
import { continuousQuery, categoriesQuery } from '@/api/queries';
import { useAppSelector } from '@/store/hooks';
import { getModeForField } from '@/utils/domains';
import type { DomainModeType } from '@/api/domains';

interface UseCartoDomainParams {
  attr: string;
  limit?: number;
  tableName: string;
}

export type DomainsType = Array<number | string>;

export default function useQueryDomain({
  attr,
  limit = 20, // for categories
  tableName,
}: UseCartoDomainParams): [DomainsType, DomainModeType] {
  const [domain, setDomain] = useState<DomainsType>([]);
  const [currentMode, setCurrentMode] = useState<DomainModeType>('continuous');

  const retailStoresSchema = useAppSelector(state => state.dataSources.retailStoresSchema);

  const targetMode = useMemo(() => getModeForField(retailStoresSchema, attr), [retailStoresSchema, attr]);

  useEffect(() => {
    let isCancelled = false;

    const fetchDomainData = async () => {
      if (!attr || attr === 'solid_color') {
        return;
      }

      let query = '';

      try {
        if (targetMode === 'continuous') {
          query = continuousQuery(attr, tableName);
        } else {
          query = categoriesQuery(attr, tableName, limit);
        }

        const rows = await fetchDomain({ query });

        // Only update state if this effect hasn't been cancelled
        if (!isCancelled && Array.isArray(rows) && rows.length > 0) {
          if (targetMode === 'continuous') {
            setDomain([rows[0].min, rows[0].max]);
          } else {
            setDomain(rows[0].categories);
          }
          // Update mode AFTER setting domain
          setCurrentMode(targetMode);
        }
      } catch (error) {
        // Only log error if not cancelled
        if (!isCancelled) {
          console.error(error); // eslint-disable-line no-console
        }
      }
    };

    fetchDomainData();

    // Cleanup function to cancel pending updates
    return () => {
      isCancelled = true;
    };
  }, [attr, targetMode, limit, tableName]);

  return [domain, currentMode];
}
