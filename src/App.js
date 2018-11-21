import React from "react"
import Gun from "gun"
import { GunProvider } from "react-gun"
import Todo from "./Todo"

const App = props => {
    // Initialize all your app stuff
    let gun = Gun();
    return (
        <GunProvider gun={gun}>
            <Todo />
        </GunProvider>
    );
};
export default App;
