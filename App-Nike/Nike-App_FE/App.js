import { StatusBar } from "expo-status-bar";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <Provider store={store}>
      
        <Navigation />
        <StatusBar style="auto" />
      
    </Provider>
  );
}
