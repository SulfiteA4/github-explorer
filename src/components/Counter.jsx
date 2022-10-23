//exemplo de Estado do componente

import { useState } from 'react'; // funções que começam com "use", ela é chamada de hook ou gancho


export function Counter(){
    const [counter, setCounter] = useState(0);

    function increment(){
        setCounter(counter + 1);
    }

    return(
        <div>
            <h2>{counter}</h2>
            <button type="button" onClick={increment} >Increment</button>
        </div>
    );
}