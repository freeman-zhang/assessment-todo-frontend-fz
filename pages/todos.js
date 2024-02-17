import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';
import PageLayout from '../components/PageLayout';
import apiFetch from '../functions/apiFetch';


const Todos = () => {
    //useState used to save todos data from apifetch promise
    const [todoList, getTodoList] = useState()

    const handleGET = async () => {
        return apiFetch("/todo", {
            method: "GET"
        }).then(response => getTodoList(response.body));
    }

    const handleClick = async (todoID) => {
        await apiFetch("/todo/update", {
            body: { todoID },
            method: "POST"
        });
        //after update, recall fetch to get updated todoList
        handleGET()
    }

    //useEffect to call async function once 
    useEffect(() => {
        handleGET()
    }, [])


    //conditional render for TodoList object so that an undefined list isnt passed in
    return (
        <PageLayout title="Todos">
            <Container>
                <div className="content">
                    <h1>Todos</h1>
                    <TodoListContainer>
                        <ul>
                            {todoList ?
                                todoList.todos.map((todo) => (
                                    <ListItem key={todo.todoID} onClick={() => handleClick(todo.todoID)} >
                                        <li style={{ textDecorationLine: todo.completed && 'line-through' }}>{todo.name}</li>
                                    </ListItem>

                                ))
                                : <></>}
                        </ul>
                    </TodoListContainer>
                </div>
            </Container>
        </PageLayout>
    );
};

export default Todos;

const Container = styled.div`
    width: 100%;

    .content {
        h1 {
            color: ${Colours.BLACK};
            font-size: ${Typography.HEADING_SIZES.M};
            font-weight: ${Typography.WEIGHTS.LIGHT};
            line-height: 2.625rem;
            margin-bottom: 2rem;
            margin-top: 1rem;
        }
    }
`;

const TodoListContainer = styled.div`
    width: 400px;
    margin: auto;
`

const ListItem = styled.div`
    font-size: 24px;
    padding: 10px;
    selectable: false;

    &:hover {
        background-color:lightgray;
        cursor:pointer;
    }

`;

