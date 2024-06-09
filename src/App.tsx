import TasksProvider from './components/TasksProvider'
import Progress from './components/Progress'
import Tasks from './components/Tasks'

const App = () => {
  return (
    <TasksProvider>
      <h1>TODO</h1>
      <Progress />
      <Tasks />
    </TasksProvider>
  )
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App
