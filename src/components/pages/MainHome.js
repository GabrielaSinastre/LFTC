import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button/Button';
import Container from '@material-ui/core/Container';

// css da pagina inicial
const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    opcoes: {
        height: '70%',
        width: '70%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    texto: {
        fontSize: '25px',
        textAlign: 'center',
        color: '#696969',
        fontFamily: '"Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, AppleGothic, sans-serif'
        
    },
    button: {
        fontSize: '20px',
        fontStyle: 'none',
        borderStyle: 'solid',
        borderWidth: 'thin',
        backgroundColor: 'pink',
        color: '#696969',
        fontFamily: '"Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, AppleGothic, sans-serif',
        "&:hover": {
            backgroundColor: 'red'
          }
    }
}

export default function MainHome() {

    const [redirectFlag, setRedirectFlag] = useState(null);
    // renderiza a pagina inicial
    const renderRedirect = () => {
        if(redirectFlag){
            return <Redirect to={`/${redirectFlag}`} />
        }
    }
    // menu que retorna os botoes para escolha, em que cada um redireciona para 
    // cada rota desejada
    return (
        <Container maxWidth='xl' style={styles.container}>
            <h2 style={styles.texto}>
            Projeto (Expressão Regular / Gramática Regular / Autômato Finito)
            </h2>
            {renderRedirect()}
            <div style={styles.opcoes}>
                <Button style={styles.button} onClick={() => setRedirectFlag('regex')}>Expressão Regular</Button>
                <Button style={styles.button} onClick={() => setRedirectFlag('gramatica')}>Gramática Regular</Button>
                <Button style={styles.button} onClick={() => setRedirectFlag('autofin')}>Autômato Finito</Button>
            </div>
        </Container>
    )
}

