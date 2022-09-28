import './App.css';
import ShowGameOnScreen from './logic';
import {Container} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

function App() {
  return (
    <div className="App">
      <Container>
          <Grid2 container>
              <Grid2 xs={12} className='container'>
                  <ShowGameOnScreen/>
              </Grid2>
          </Grid2>
      </Container>
    </div>
  );
}

export default App;
