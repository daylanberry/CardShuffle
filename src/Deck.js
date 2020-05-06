import React, { Component } from "react";
import Card from "./Card";
import "./Deck.css";
import axios from "axios";

const URL = 'https://deckofcardsapi.com/api/deck/'

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawn: []
    };
  }

  async componentDidMount() {
    const deck = await axios.get(URL + 'new/shuffle')

    this.setState({ deck: deck.data })
  }

  getCard = async () => {
    const { deck_id } = this.state.deck

    try {
      const cardRes = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/`)
      var card = cardRes.data.cards[0]
      console.log(cardRes.data.remaining)

      if (!cardRes.data.success) {
        throw new Error('No Cards!')
        return
      }

      this.setState(state => ({
        drawn: [
          ...state.drawn,
          { id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }))

    } catch (err) {
      console.log(err)
    }

  }



  render() {
    const cards = this.state.drawn.map(c => (
      <Card key={c.id} name={c.name} image={c.image} />
    ));

    return(
      <div>
        <h1>Cards!</h1>
        <button onClick={this.getCard}>Get Card!</button>
        <div className='Deck-cardarea'>
          {cards}
        </div>
      </div>
    )
  }
}
export default Deck;
