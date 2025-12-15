import MainLayout from './layouts/MainLayout';
import CartoMap from '@/features/map/CartoMap';
import ControlsDrawer from '@/features/controls-drawer/ControlsDrawer';

function App() {
  return (
    <MainLayout>
      {{
        main: <CartoMap />,
        drawer: <ControlsDrawer />
      }}
    </MainLayout>
  );
}

export default App;
