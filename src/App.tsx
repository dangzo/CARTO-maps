import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './layouts/MainLayout';
import CartoMap from '@/features/map/CartoMap';
import ControlsDrawer from '@/features/controls-drawer/ControlsDrawer';

function App() {
  return (
    <Provider store={store}>
      <MainLayout>
        {{
          main: <CartoMap />,
          drawer: <ControlsDrawer />
        }}
      </MainLayout>
    </Provider>
  );
}

export default App;
