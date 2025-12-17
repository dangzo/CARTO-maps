import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './layouts/MainLayout';
import CartoMap from '@/components/maps/CartoMap';
import ControlsDrawer from '@/components/drawer/ControlsDrawer';

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
