import React, { useState } from "react";
import { Button } from './Common/Components/BaseComponents/Button'
import {FormExample} from './Common/Components/BaseComponents/FormExample'
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>Ejemplo de botones con tu componente Button</h1>

      <div style={{ marginTop: 20 }}>
        <Button variant="primary" size="sm" onClick={() => alert("Botón primario pequeño!")}>
          Primary Small
        </Button>
      </div>

      <div style={{ marginTop: 20 }}>
        <Button variant="secondary" size="md" onClick={() => setCount(count + 1)}>
          Secondary Medium - Clicks: {count}
        </Button>
      </div>

      <div style={{ marginTop: 20 }}>
        <Button variant="accent" size="lg" dir="rtl" onClick={() => alert("Botón accent grande RTL!")}>
          Accent Large RTL
        </Button>
      </div>
          <FormExample />
    </div>
        
  );
}

export default App;
