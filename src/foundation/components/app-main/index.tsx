import { Header } from './header';
import { Navigation } from './navigation';
import dynamic from 'next/dynamic';

const World3d = dynamic(
  () => import('./world-3d').then(modules => modules.Webgl),
  { ssr: false }
);

const Component = ({ children }) => {
  return (
    <div id="app">
      <Header />
      <Navigation />
      {children}
      <World3d />
    </div>
  );
};

export default Component;
