import React, { useState } from 'react';
import './modalMensagem.css';

function ModalMensagem(props) {
    const [modalAberto, setModalAberto] = useState(props.modalAberto);

    const handleModal = () => {
      setModalAberto(false);
      props.callBackParent(modalAberto)
    }

    return ( 
      <div className="modal-externo">
        {props.mensagem}
        <button className="modal-botao-ok" onClick={handleModal}>Ok</button>
      </div> 
    );
}
 
export default ModalMensagem;