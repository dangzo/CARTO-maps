import { fetchDomain } from './domains';

// mock executeSQL
vi.mock('@carto/react-api', () => ({
  executeSQL: vi.fn(),
}));

describe('fetchDomain', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call executeSQL with correct parameters', async () => {
    const query = 'SELECT 1';
    await fetchDomain({ query });

    const { executeSQL } = await import('@carto/react-api');
    expect(executeSQL).toHaveBeenCalledWith({
      credentials: {
        apiBaseUrl: expect.any(String),
        accessToken: expect.any(String),
      },
      query,
    });
  });
});
