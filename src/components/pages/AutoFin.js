// Pagina da aplicacao que trata os automatos finitos
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Graph } from 'react-d3-graph';
import Button from '@material-ui/core/Button/Button';
import Delete from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Container from '@material-ui/core/Container/Container';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// css do automato finito
const styles = {
    input: {
        borderWidth: "3px", 
        borderColor: "black",
        borderStyle: "solid",
        borderRadius: "5px",
        height: "30px",
        width: "250px",
        outline: "0",
        backgroundColor: "pink",
        color: '#696969',
        fontFamily: '"Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, AppleGothic, sans-serif',
        fontSize: "20px",
        marginBottom: '10px'
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: "pink",
        color: '#696969',
        fontFamily: '"Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, AppleGothic, sans-serif',
        borderRadius: '5px',
        height: '30px',
        width: '20px',
        transitionDuration: '0.5s',
        marginRight: '10px'
    },
    header: {
        marginTop: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    text: {
        marginTop:'10px',
        fontSize: '30px',
        textAlign: 'center',
        color: '#696969',
        fontFamily: '"Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, AppleGothic, sans-serif',
        margin: '0'
    },
    text1: {
        color: '#696969',
        fontFamily: '"Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, AppleGothic, sans-serif',
        margin: '0'
    },
};

export default function AutoFin() {
    // cria cada no
    const [nodes, setNodes] = useState([
        { id: 'q0', symbolType: 'diamond' },
        { id: 'q1', color: 'red' },
        { id: 'q2', color: 'red' }
    ]);
    // transicoes
    const [transitions, setTransitions] = useState([
        { source: 'q0', target: 'q1', label: 'a' },
        { source: 'q0', target: 'q2', label: 'b' },
    ]);
    const [transitionInput, setTransitionInput] = useState({ source: '', target: '', label: 'λ' });
    const [deleteMode, setDeleteMode] = useState(false);
    const [inputs,] = useState([1]);

    const myConfig = {
        nodeHighlightBehavior: true,
        linkHighlightBehavior: true,
        directed: true,
        maxZoom: 7,
        width: 800,
        node: {
          color: "black",
          size: 120,
          highlightStrokeColor: "blue",
          labelPosition: 'top'
        },
        link: {
          highlightColor: "lightblue",
          renderLabel: true
        },
      };
    
    // atributo onclick
    const onClickNode = nodeId => {
        if(deleteMode){
            setTransitions(transitions.filter(t => t.source !== nodeId && t.target !== nodeId));
            setNodes(nodes.filter(node => node.id !== nodeId));
        } else {
            setNodes(nodes.map(node => {
                if(node.id === nodeId){
                    if(node.color === 'red') node.color = 'black';
                    else node.color = 'red';
                };
                return node;
            }));
        };
    };

    const onClickLink = (source, target) => {
        if(deleteMode) setTransitions(transitions.filter(t => t.source !== source || t.target !== target));
    }

    const validate = strInput => {
        let charCode = 65;
        const str = strInput.target.value;
        let tempTransitions = [];
        let tempNodes = [];
        transitions.forEach(tr => tempTransitions.push(Object.assign({}, tr)));
        nodes.forEach(node => tempNodes.push(Object.assign({}, node)));


        tempNodes = tempNodes.map(node => {
            const newValue = String.fromCharCode(charCode);
            tempTransitions.map(tr => {
                if(tr.source === node.id) tr.source = newValue;
                if(tr.target === node.id) tr.target = newValue;
            });
            node.id = newValue;
            let type = [];
            if(node.symbolType === 'diamond') type.push('initial');
            if(node.color === 'red') type.push('final');
            node.type = type;
            charCode += 1;
            return node;
        });
        
        let grammar = [];
        for(let i=0 ; i < tempTransitions.length ; i++){
            let initial = tempTransitions[i].source;
            let final = tempTransitions[i].target;
            let value = tempTransitions[i].label;

            let rules = grammar.find(row => row.leftSide === initial); 

            if(!rules){
                if(value === 'λ') grammar.push({leftSide: initial, rightSide: [final]});
                else grammar.push({leftSide: initial, rightSide: [value + final]});
            }
            else {
                if(value === 'λ') rules.rightSide.push(final);
                else rules.rightSide.push(value + final);
            };
        };
        for(let i=0 ; i < tempNodes.length ; i++){
            let initial = tempNodes[i].id;
            let type = tempNodes[i].type.find(row => row === 'final');
            if(type){ //Se é final
                let rules = grammar.find(row => row.leftSide === initial);

                if(!rules) //Se não tem
                    grammar.push({leftSide: initial, rightSide: ['λ']});
                else //Se tem
                    rules.rightSide.push('λ');
            }
        }
        for(let i=0 ; i<tempNodes.length ; i++){
            let initial = tempNodes[i].id;
            let type = tempNodes[i].type.find(row => row === 'initial');

            if(type){
                let rules = grammar.find(row => row.leftSide === initial); //Verificando se existe regra com aquele simbolo
                grammar = grammar.filter(item => item !== rules);
                grammar.unshift(rules);
            };
        };
        console.log(transitions);
        console.log(grammar);
        for(let rule of grammar[0].rightSide){
            if(matchD(str, rule, grammar)){
                strInput.target.style.borderColor = "ForestGreen";
                return;
            };
        }
        strInput.target.style.borderColor = 'FireBrick';
    }

    const matchD = (str, rule, arr) => {
        if(rule.length - 1 > str.length) return false;
    
        const nextRule = rule[rule.length - 1];
    
        //Verificando caractere vazio
        if(nextRule === 'λ' && (rule.slice(0, rule.length - 1) === str && rule.slice(0, rule.length - 1).length === str.length)) return true;
        
        if(nextRule === nextRule.toLowerCase()) return rule === str;
        
        const rules = arr.find(row => row.leftSide === nextRule);
    
        if(!rules) return false;
        for(let r of rules.rightSide)
        {
            if(matchD(str, rule.replace(nextRule, r), arr)){
                return true;
            }
        }
    };

    return (
        <Container maxWidth='lg' style={styles.container}>
            <header style={styles.header}>
            <Link style={styles.button} to="/" width="20px" height="40px">
                <Tooltip title="Voltar"><Button style={styles.button}><ArrowBackIcon color="action"/></Button></Tooltip>
            </Link>           
            <p style={styles.text}>Autômato Finito</p>
            </header>
            
            <div style={{ height: '20%' ,display: 'flex', justifyContent: 'space-between', padding: '0 2.5% 0 2.5%', alignItems: 'center' }}>

            <div style={{ display: 'flex', height: '90%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <input
                            placeholder={'Nó inicial:'}
                            style={styles.input}
                            value={transitionInput.source}
                            onChange={e => setTransitionInput({ ...transitionInput, source: e.target.value })}
                        />
                        <input
                            placeholder={'Nó final:'}
                            style={styles.input}
                            value={transitionInput.target}
                            onChange={e => setTransitionInput({ ...transitionInput, target: e.target.value })}
                        />
                        <input
                            placeholder={'Estado:'}
                            style={styles.input}
                            value={transitionInput.label}
                            onChange={e => setTransitionInput({ ...transitionInput, label: e.target.value })}
                        />
                    </div>
                </div>
                <div>
                    <Button
                        variant='contained'
                        color='default'
                        onClick={() => {
                            if(nodes.length > 0) setNodes([ ...nodes, { id: `q${parseInt(nodes[nodes.length - 1].id[1]) + 1}` }]);
                            else setNodes([{ id: 'q0', symbolType: 'diamond' }]);
                        }}
                    >Adicionar Estado</Button>
                </div>
                
                <div style={{ paddingLeft: '10px', display: 'flex', alignItems: 'center' }}>
                        <Button
                            variant='contained'
                            color='default'
                            onClick={() => {
                                const tr = transitions.find(t => t.source === transitionInput.source && t.target === transitionInput.target && t.label === transitionInput.label);
                                if(!tr) setTransitions([ ...transitions, transitionInput ]);
                                setTransitionInput({ source: '', target: '', label: 'λ' });
                            }}
                        >Adicionar transição</Button>
                    </div>
                <div>
                    <Button
                        variant='contained'
                        color={deleteMode ? 'secondary' : 'default'}
                        onClick={() => setDeleteMode(!deleteMode)}
                    >
                        <Delete />
                    </Button>
                </div>
            </div>
            <div style={{ height: '80%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Graph
                    id='graph-id'
                    data={{
                        nodes: nodes,
                        links: transitions
                    }}
                    config={myConfig}
                    onClickNode={onClickNode}
                    onClickLink={onClickLink}
                />
                <div style={{ width: '20%', height: '100%', display: 'flex', alignItems: 'center' }}>
                    <div style={{width: '100%', float: 'left' }}>
                        <div>
                            {inputs.map(() => (
                                <div>
                                    <label style={styles.text1}>Teste:</label>
                                    <input type="text" placeholder="Teste" onChange={(strInput) => validate(strInput)} onClick={(strInput) => {validate(strInput); strInput.target.placeholder = "";}} style={styles.input}/>
                                </div>
                            ))}
                        </div>
                        </div>
                </div>
            </div>
            <div style={styles.text1}>
                Orientações:<br/>
                Estados:<br/>
                <b>{'Preto:'} </b>{'Estado normal'} <br/>
                <b>{'Vermelho:'} </b>{'Estado final'} <br/>
                <b>{'Losango:'} </b>{'Estado inicial'} <br/>
                {'O estado inicial será o primeiro inserido.'} <br/>
                {'Em seguida, acrescente as strings para validar.'} <br/>
                {'Caso inserir uma transição usando um estado inexistente ocorrerá um erro, então certifique de que o estado existe.'} <br/>
                {'O estado é criado automaticamente após clickar em adicionar estado, basta arrastar a tela do grafo.'} <br/>
                {'Elas serão validadas quando são clicadas.'}
            </div>
            </Container>
    )
}