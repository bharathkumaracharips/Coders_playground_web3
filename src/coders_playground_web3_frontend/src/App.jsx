import Dashboard from './Dashboard/App';
import { About } from './components/about-comp';
import { FeatureCarouselDemo } from './components/features-comp';
import { Footer } from './components/footer-comp';
import { Partners } from './components/partners-comp';
function App() {
  return (
    <main>
      <Dashboard />
      <About />
      <FeatureCarouselDemo />
      <Partners />
      <Footer />
    </main>
  );
}

export default App;
