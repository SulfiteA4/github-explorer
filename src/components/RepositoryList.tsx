import { useState, useEffect } from 'react';
import { RepositoryItem } from "./RepositoryItem";
import '../styles/repositories.scss';
// https://api.github.com/orgs/rocketseat/repos

interface Repository {
    name: string;
    description: string;
    html_url: string;
}

export function RepositoryList() {
    const [repositories, setRepositories] = useState<Repository[]>([]);// sempre que for um listagem deve-se começar o estado com um array vazio, além disso, é uma boa convenção iniciar o estado de uma variavel com o mesmo tipo de informação que vai ser armazenada.
    useEffect(()=>{
        fetch('https://api.github.com/orgs/rocketseat/repos')
            .then(response => response.json())
            .then(data => setRepositories(data));
    }, [])// parametros: qual funcao vai ser disparada; quando ela vai ser disparada. Se for passado um array vazio a funcao vai ser executada somente uma vez, caso nao for passado nenhum parametro sera executada infinitas vezes.
    return (
        <section className="repository-list">
            <h1>Lista de repositórios</h1>
            <ul>
                {
                    repositories.map(repository => {//sempre que for necessario utilizar um map dentro do html, deve-se designar um atributo do objeto retornado como chave atraves da propriedade key
                        return <RepositoryItem key={repository.name} repository={repository} />
                    })
                }
                
            </ul>
        </section>
    );
}