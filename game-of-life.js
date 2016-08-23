var globalSpeed = 500;
var numRows = 50;
var numColumns = 50;
var gen = 1;
var interval;

// the master control for each generation
function generationTimer(speed) {
  window.clearInterval(interval);
  interval = window.setInterval(function(){
    // for the generation timer
    gen++;
    // arrays to push designated cells into so that I can make all changes at once
    var deadCellHolder = [];
    var liveCellHolder = [];
    // the for loop that checks all cells and pushes them into the appropriate arrays
    var cells = document.getElementsByTagName("TD");
    for (var i = 0; i < cells.length; i++) {
      // variables for use in checking living cell neighbors
      var counter = 0;
      var child = cells[i];
      var parent = child.parentNode;
      var index = Array.prototype.indexOf.call(parent.children, child);
      var n1;
      var n2;
      var n3;
      var n4;
      var n5;
      var n6;
      var n7;
      var n8;
      // check top-left neighbor (n1)
      // NOTE: the bulk of the complexity here is accounting for the looping edges of the board
      if (parent.previousSibling === null) {
        if (child.previousSibling === null) {
          n1 = document.getElementById("grid-div").childNodes[numRows - 1].childNodes[numColumns - 1];
        } else {
          n1 = document.getElementById("grid-div").childNodes[numRows - 1].childNodes[index - 1];
        }
      } else {
        if (child.previousSibling === null) {
          n1 = parent.previousSibling.childNodes[numColumns - 1];
        } else {
          n1 = parent.previousSibling.childNodes[index - 1];
        }        
      }
      if (n1.className === "space alive") {
        counter++;
      }
      // check top neighbor (n2)
      if (parent.previousSibling === null) {
        n2 = document.getElementById("grid-div").childNodes[numRows - 1].childNodes[index];
      } else {
        n2 = parent.previousSibling.childNodes[index];
      }
      if (n2.className === "space alive") {
        counter++;
      }
      // check top-right neighbor (n3)
      if (parent.previousSibling === null) {
        if (child.nextSibling === null) {
          n3 = document.getElementById("grid-div").childNodes[numRows - 1].childNodes[0];
        } else {
          n3 = document.getElementById("grid-div").childNodes[numRows - 1].childNodes[index + 1];
        }
      } else {
        if (child.nextSibling === null) {
          n3 = parent.previousSibling.childNodes[0];
        } else {
          n3 = parent.previousSibling.childNodes[index + 1];
        }        
      }
      if (n3.className === "space alive") {
        counter++;
      }
      // check left neighbor (n4)
      if (child.previousSibling === null) {
        n4 = parent.childNodes[numColumns - 1];
      } else {
        n4 = child.previousSibling;
      }
      if (n4.className === "space alive") {
        counter++;
      }
      // check right neighbor (n5)
      if (child.nextSibling === null) {
        n5 = parent.childNodes[0];
      } else {
        n5 = child.nextSibling;
      }
      if (n5.className === "space alive") {
        counter++;
      }
      // check bottom-left neighbor (n6)
      if (parent.nextSibling === null) {
        if (child.previousSibling === null) {
          n6 = document.getElementById("grid-div").childNodes[0].childNodes[numColumns - 1];
        } else {
          n6 = document.getElementById("grid-div").childNodes[0].childNodes[index - 1];
        }
      } else {
        if (child.previousSibling === null) {
          n6 = parent.nextSibling.childNodes[numColumns - 1];
        } else {
          n6 = parent.nextSibling.childNodes[index - 1];
        }        
      }
      if (n6.className === "space alive") {
        counter++;
      }
      // check bottom neighbor (n7)
      if (parent.nextSibling === null) {
        n7 = document.getElementById("grid-div").childNodes[0].childNodes[index];
      } else {
        n7 = parent.nextSibling.childNodes[index];
      }
      if (n7.className === "space alive") {
        counter++;
      }
      // check bottom-right neighbor (n8)
      if (parent.nextSibling === null) {
        if (child.nextSibling === null) {
          n8 = document.getElementById("grid-div").childNodes[0].childNodes[0];
        } else {
          n8 = document.getElementById("grid-div").childNodes[0].childNodes[index + 1];
        }
      } else {
        if (child.nextSibling === null) {
          n8 = parent.nextSibling.childNodes[0];
        } else {
          n8 = parent.nextSibling.childNodes[index + 1];
        }        
      }
      if (n8.className === "space alive") {
        counter++;
      }
      // finally, sort all cells into one of two arrays according to the number of live neighbors
      if (child.className === "space alive") {
        if (counter > 3 || counter < 2) {
          deadCellHolder.push(child);
        }
      } else if (child.className === "space dead") {
        if (counter === 3) {
          liveCellHolder.push(child);
        }
      }
      
    }
    // the final for loops to apply the appropriate classNames
    for (var i = 0; i < deadCellHolder.length; i++) {
      deadCellHolder[i].className = "space dead";
    }
    for (var i = 0; i < liveCellHolder.length; i++) {
      liveCellHolder[i].className = "space alive";
    }
    // update the generation h4
    document.getElementById("generation-timer").innerHTML = "Generation: " + gen;
  }, (speed));
}

var InitialSetup = React.createClass({
  getInitialState: function() {
    var grid = [];
    for (var i = 1; i <= numRows; i++) {
      var row = [];
      for (var j = 1; j <= numColumns; j++) {
        if (Math.floor((Math.random() * 5)) + 1 === 5) {
          row.push(<td onClick={this.click} className="space alive"></td>); 
        } else {
          row.push(<td onClick={this.click} className="space dead"></td>);  
        }
      }
      grid.push(<tr>{row}</tr>);
    }
    return {
      data: grid
    };
  },
  click: function(event) {
    if (event.target.className === "space dead") {
      event.target.className = "space alive";
    } else {
      event.target.className = "space dead";
    }
  },
  control: function(event) {
    if (event.target.innerHTML === "Run") {
      generationTimer(globalSpeed);
    } else if (event.target.innerHTML === "Pause") {
      window.clearInterval(interval);
    } else if (event.target.innerHTML === "Clear") {
      var cells = document.getElementsByTagName("TD");
      for (var i = 0; i < cells.length; i++) {
        cells[i].className = "space dead";
      }
      document.getElementById("generation-timer").innerHTML = "Generation: 0";
      gen = 0;
      generationTimer(globalSpeed);
    }
  },
  speed: function(event) {
    window.clearInterval(interval);
    if (event.target.innerHTML === "Slow") {
      globalSpeed = 1000;
    } else if (event.target.innerHTML === "Medium") {
      globalSpeed = 500;
    } else if (event.target.innerHTML === "Fast") {
      globalSpeed = 100;
    }
    generationTimer(globalSpeed);
  },
  resize: function() {
    if (event.target.innerHTML === "Small") {
      numRows = 25;
      numColumns = 25;
    } else if (event.target.innerHTML === "Moderate") {
      numRows = 50;
      numColumns = 50;
    } else if (event.target.innerHTML === "Large") {
      numRows = 75;
      numColumns = 75;
    }
    document.getElementById("generation-timer").innerHTML = "Generation: 0";
    gen = 0;
    document.getElementById("container").innerHTML = "";
    ReactDOM.render( <InitialSetup/>, document.getElementById("container") );
  },
  render: function() {
   return (
     <div>
       <div className="clearfix">
         <h1>A Game of Life</h1>
         <p>Bring cells to life (or kill them) by clicking on them!</p>
         <h3>Controls</h3>
         <button onClick={this.control}>Run</button>
         <button onClick={this.control}>Pause</button>
         <button onClick={this.control}>Clear</button>
         <br/>
         <h3>Speed</h3>
         <button onClick={this.speed}>Slow</button>
         <button onClick={this.speed}>Medium</button>
         <button onClick={this.speed}>Fast</button>
         <br/>
         <h3>Board size</h3>
         <button onClick={this.resize}>Small</button>
         <button onClick={this.resize}>Moderate</button>
         <button onClick={this.resize}>Large</button>
         <h4 id="generation-timer">Generation: 1</h4>
       </div>
       <div id="grid-div">
          {this.state.data}
       </div>
     </div>
   );
 }
});

ReactDOM.render( <InitialSetup/>, document.getElementById("container") );
generationTimer(500);