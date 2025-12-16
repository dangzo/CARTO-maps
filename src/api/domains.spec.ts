import { fetchDomain } from './domains';

// mock executeSQL
vi.mock('@carto/react-api', () => ({
  executeSQL: vi.fn(),
  API_VERSIONS: { V3: 'v3' },
}));

describe('fetchDomain', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call executeSQL with correct parameters', async () => {
    const query = 'SELECT 1';

    const { executeSQL } = await import('@carto/react-api');
    vi.mocked(executeSQL).mockResolvedValue({});

    await fetchDomain({ query });

    expect(executeSQL).toHaveBeenCalledWith({
      connection: 'carto_dw',
      credentials: {
        apiVersion: 'v3',
        apiBaseUrl: expect.any(String),
        accessToken: expect.any(String),
      },
      query,
    });
  });
});
