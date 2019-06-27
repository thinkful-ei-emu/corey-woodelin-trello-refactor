import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE'

// static defaultProps
class App extends Component {
  state = {
    store: STORE
  };

  cardDelete = (deleteId) => {
    //copy of allCards without key deleteId
    
    const allCardsCopy = {...this.state.store.allCards}
    delete allCardsCopy[deleteId]

    console.log('going to delete the card');

    this.setState({
      store : {
        allCards : allCardsCopy,
        lists : this.state.store.lists.map(list => {
          return {
            id : list.id,
            header : list.header,
            cardId : list.cardId.filter(id => {
              if(deleteId === id){
                return false
              } return true
            })
          }
        })
      }
    })
  }
//return object with id, header, cardId
//access cardId from

  render() {
    const { store } = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardId.map(id => store.allCards[id])}
              cardDelete={this.cardDelete}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;

// deleteCard = (CardId, ListId) => { const aC = {...this.state.allCards} delete aC[CardId]; 

// console.log(aC); 

// this.setState({ lists:this.state.lists.map((list)=>{ 
//   return { 
//     id:list.id, header:list.header, cardIds:list.cardIds.filter((item)=>item!==CardId) 
//   } }), allCards: aC,
// }) };