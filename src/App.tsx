import './index.css'
import Toast from './common/components/Toast';
import { Provider } from 'react-redux';
import { store } from './common/reduxtk/store';
import RouterLayout from './features/Router';

const App = () => {
  return (
    <section>
      <Toast />
      <Provider store={store}>
        <RouterLayout />
      </Provider>
    </section>
  );
}

export default App
