import { MetaMeskProvider } from "hooks/MetaMask/Provider";
import SwapPage from "./pages/swap";

function App() {
  return (
    <div className="App">
      <MetaMeskProvider>
        <SwapPage />
      </MetaMeskProvider>
    </div>
  );
}

export default App;
