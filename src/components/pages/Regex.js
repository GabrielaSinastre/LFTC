import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button/Button';
import Tooltip from "@material-ui/core/Tooltip";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// css da pagina
const styles = {
    input: {
        borderWidth: "3px", 
        borderColor: "black",
        borderStyle: "solid",
        backgroundColor: "pink",
        height: "50px",
        width: "250px",
        outline: "0",
        marginLeft: "5px",
        color: '#696969',
        fontSize: "20px"
    },
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#696969',
        justifyContent: 'center'
    },
    text: {
        fontSize: '30px',
        textAlign: 'center',
        fontFamily: '"Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, AppleGothic, sans-serif',
        margin: '0'
    },
    header:
    {
        paddingBottom: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    button: {
        borderRadius: '5px',
        height: '30px',
        transitionDuration: '0.5s',
        marginRight: '10px'
    },
    item: {
        padding: '5px',
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    main: {
        paddingBottom: '20px',
        margin: '0 auto',
        flexFlow: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    helper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginRight: '10px',
        fontFamily: '"Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, AppleGothic, sans-serif'
    }
}
export default function Regex() {
    const [userInput, setUserInput] = useState('');
    const [inputs,] = useState([1]);

    const validar = e => {
        const regex = new RegExp(userInput);
        const string = e.target.value;        
        // verifica se a string corresponde as regras que foram incluidas
        // se for correspondente, a caixinha permanece verde
        // se não ela recebe a cor vermelha
        if(regex.exec(string)){
             e.target.style.borderColor = "green";
        } else {
             e.target.style.borderColor = "red";
        }
    }

    // retornar a renderizacao da pagina, onde ha os campos para inserção da expressao
    // regular e para testar se o texto inserido corresponde as regras
    // alem de retornar um container com as orientacoes das regras permitidas
    // para os testes
    return (
        <Container maxWidth='lg' style={styles.container}>
            <header style={styles.header}>
                <Link style={styles.button} to="/" width="40px" height="40px">
                    <Tooltip title="Voltar"><Button style={styles.button}><ArrowBackIcon color="action"/></Button></Tooltip>
                </Link>
                <p style={styles.text}>Expressão Regular (Regex)</p>
            </header>
            <div style={styles.main}>
                <label>Regex:</label>
                <input type="text" placeholder="Expressão Regular" onChange={(e) => setUserInput(e.target.value)} style={styles.input}/>
            </div>
            <div style={styles.main}>
                {inputs.map(() => (
                    <div style={styles.item}>
                        <label>Teste:</label>
                        <input type="text" placeholder="Teste Da Expressão" onChange={(e) => validar(e)} onClick={(e) => {validar(e); e.target.placeholder = "";}} style={styles.input}/>
                    </div>
                ))}
            </div>
            <div style={styles.helper}>
                <h1>Orientações:</h1>  
                <b>{'^'} {' -  Inicia a expressão regular'} <br/></b>
                <b>{'$'} {' -  Termina a expressão regular'} <br/></b>
                <b>{'|'} {' -  União'} <br/> </b>
                <b>{'*'} {' -  Zero ou mais repetições (fechamento)'} <br/> </b>
                <b>{'+'} {' -  Uma ou mais repetições'} <br/> </b>
                <b>{'?'} {' -  Zero ou uma repetição'} <br/> </b>
                <b>{'{x}'} {' -  x Repetições'} <br/> </b>
                <b>{'{x, y}'} {' -  Entre x e y repetições'} <br/><br/> </b>
            </div>    
        </Container>
    )
}

