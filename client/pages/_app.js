import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AuthProvider } from '@/context/AuthProvider';
import NextNProgress from 'nextjs-progressbar';
import { ContextProvider } from '@/context/ContextProvider';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ContextProvider>
        <Provider store={store}>
          <NextNProgress />
          <Component {...pageProps} />
        </Provider>
      </ContextProvider>
    </AuthProvider>
  );
}
