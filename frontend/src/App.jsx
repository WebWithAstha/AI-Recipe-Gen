import Layout from "./components/Layout.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import { Toaster } from 'react-hot-toast';


function App() {
  return (
      <Layout>
        <AppRoutes/>
        <Toaster
        position="bottom-right"
        />
      </Layout>
  );
}

export default App;
