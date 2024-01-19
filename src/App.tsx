import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  // Add property to have way to indicate whether or not graph should be visible
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      // Set the initial state of graph to hidden by setting to false
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
      // Check to ensure graph is only visible if it has been switched on
      if (this.state.showGraph){
        return (<Graph data={this.state.data}/>)
      }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    // Set a variable x to 0. X will be incremented, and the execution will stop when x is greater than 1000
    let x = 0;
    // Set up a repeating inverval that runs the arrow function every 100 miliseconds
    const interval = setInterval(() => {
      // On Each Interval - call DataStreamer.getData() sends request to server
      // If successful - server response is parsed into JSON and arrow callback function is called w/ server response
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        // State updated by setting data in component to server response and showing graph to re-render with new data
        this.setState({
          data: serverResponds,
          showGraph: true,
        });
      });
      // Increment the x on each interval repetition
      x++;
      // If we get above threshold, stop execution of this interval
      if (x > 1000) {
        clearInterval(interval);
      }
      // 100 is the execution interval (run every 100 ms). Data fetching stops after that
    },100);
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
