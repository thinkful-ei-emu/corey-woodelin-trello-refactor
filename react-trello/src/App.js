import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE'

// static defaultProps
class App extends Component {
  state = {
    store: STORE,
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

newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

generateRandomCard = (listId) => {
const randomCard = this.newRandomCard()
// const copyAllLists = {...this.state.store.allLists}
// const copyAllCards = {...this.state.store.allCards}
const copyAllLists = this.state.store.lists.map(list => {
  if (list.id === listId) {
    return {
      ...list,
      cardId: [...list.cardId, randomCard.id]
    };
  }
  return list;
})
console.log('testing generateRandomCard')
  
  this.setState({
    store : {
      lists: copyAllLists,
      allCards : {
        ...this.state.store.allCards,
        [randomCard.id]: randomCard
      }
    }
  })
};


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
              id={list.id}
              header={list.header}
              cards={list.cardId.map(id => store.allCards[id])}
              cardDelete={this.cardDelete}
              generateRandomCard={this.generateRandomCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;