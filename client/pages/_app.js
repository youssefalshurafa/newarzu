import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AuthProvider } from '@/context/AuthProvider';
export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
}
