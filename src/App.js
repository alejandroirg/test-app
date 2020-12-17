import React, { useState } from 'react';
import './App.css';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';

function App() {
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [screenshot, setScreenshot] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const submit = () => {
    setLoading(true)
    setErrorMessage(null);
    axios.post(`${process.env.REACT_APP_API_URL}/ad`, {
      price: price,
      description: description
    }).then(response => {
      setLoading(false)
      setScreenshot(response.data.screenshot)
      setModalVisible(true)
    }).catch(error => {
      setLoading(false)
      error.response ? (error.response.status === 422 ? setErrorMessage(error.response.data) : setErrorMessage('Hubo un error, intentalo mas tarde') ) : setErrorMessage('Hubo un error, intentalo mas tarde')
    })    
  }

  return (
    <div className="App">

      <header className="App-header">

        <div className="App-modal">

          <div className="App-title">Publicar anuncio en seminuevos.com 2</div>

          <form className="App-form">

            <div className="App-field">
              <div className="App-label">Precio del anuncio</div>
              <Input 
                autoFocus
                placeholder="200000"
                name="price"
                color="primary" 
                required 
                type="number"
                value={price}
                onChange={(e)=> setPrice(e.target.value) }
              />
            </div>

            <div className="App-field">
              <div className="App-label">Descripción del anuncio</div>
              <TextField 
                color="primary" 
                required 
                placeholder="Descripción"
                name="description"
                type="text"
                multiline={true}
                rows={6}
                rowsMax={6}
                value={description}
                onChange={(e)=> setDescription(e.target.value) }
              />
            </div>

            <div className="loading-container">
              {
                loading ? 
                  <div style={{display: "flex"}}>
                    <div className="loading-message">Publicando anuncio, espera un momento...  </div> 
                    <div className="App-loader">
                      <AutorenewIcon style={{ fontSize: 24, color: 'black' }}/>
                    </div>
                  </div> 
                : null
              }
              {
                errorMessage ?
                  <div className="error-message">{errorMessage}</div>
                : null
              }
            </div>

            <Button  
              color="default"
              disabled={loading}
              classes={{ 
                root: 'button-root',
                label: 'button-text',
                disabled: 'button-root-disabled' 
              }}
              fullWidth={true}
              size="medium"
              onClick={() => submit()}
            >
              Publicar
            </Button>

          </form>

        </div>

      </header>

      <Modal
        open={modalVisible}
        className="App-modal"
        onClose={()=>console.log('Modal closed')}
      >
        <div className="modal-content">
          
          <div className="close-icon" onClick={()=>setModalVisible(false)}>
            <CloseIcon style={{ fontSize: 24, color: 'white' }}/>
          </div>

          <div className="screenshot-container">
            <img alt="screenshot" className="screenshot" src={'data:image/png;base64,' + screenshot} />
          </div>
        </div>

      </Modal>

    </div>
  );
}

export default App;
