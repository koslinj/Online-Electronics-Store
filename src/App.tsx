import AuthProvider from "./providers/AuthProvider";
import { CartProvider } from "./providers/CartProvider";
import Routes from "./routes";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;