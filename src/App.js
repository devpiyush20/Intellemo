
import './App.css';
import Canvas from './componet/Canvas';
import CanvasButtons from './componet/CanvasButtons';
import Header from './componet/Header';
import KonvaCanvasComponent from './componet/KonvaCanvasComponent';
import KonvaImageComponent from './componet/KonvaImageComponent';
import KonvaMediaComponent from './componet/KonvaMediaComponent';
import KonvaTextComponent from './componet/KonvaTextComponent';
function App() {
  return (
    <div >
    <Header/>
    <div className="containerApp">
 
    <KonvaCanvasComponent/>
    </div>
    </div>
  );
}

export default App;
