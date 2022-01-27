import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';

class AppDragDropDemo extends Component {
    state = {
        tasks: [
            {name:"palette one",category:"wip", bgcolor: "yellow"},
            {name:"palette two", category:"wip", bgcolor:"pink"},
            { name: "palette three", category: "wip", bgcolor: "skyblue" },
            {name:"palette four", category:"wip", bgcolor:"green"}
          ]
          
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       
       let tasks = this.state.tasks.filter((task) => {
           if (task.name == id) {
             task.category = task.category === "complete" ? task.category : cat;
             task.category = task.category === "wip" ? task.category : cat;
             task.category = task.category === "progress" ? task.category : cat;
           }
           return task;
       });

       this.setState({
           ...this.state,
           tasks
       });
    }

    render() {
        var tasks = {
            wip: [],
          complete: [],
            progress: []
        }

        this.state.tasks.forEach ((t) => {
          debugger;
            tasks[t.category].push(
                <div key={t.name} 
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable
                    className="draggable"
                    style = {{backgroundColor: t.bgcolor}}
                >
                    {t.name}
                </div>
            );
        });

        return (
            <div className="container-drag">
            <h2 className="header">CUSTOM DRAG & DROP</h2>
            <div className="todo-block">
                <div className="wip"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "wip")}}>
                    <span className="task-header">TO DO</span>
                    {tasks.wip}
            </div>
            <div className="progress"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "progress")}}>
                    <span className="task-header">PROGRESS</span>
                    {tasks.progress}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "complete")}>
                     <span className="task-header">COMPLETED</span>
                     {tasks.complete}
                </div>
              </div>
            </div>
        );
    }
}

render(<AppDragDropDemo />, document.getElementById('root'));
