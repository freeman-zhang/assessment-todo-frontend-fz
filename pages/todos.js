import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';
import PageLayout from '../components/PageLayout';
import apiFetch from '../functions/apiFetch';
import Button from '../components/Button';


const Todos = () => {
    const filters = { 0: 'all', 1: true, 2: false }

    //useState used to save todos data from apifetch promise
    const [todoList, setTodoList] = useState()
    const [filterStatus, setFilterStatus] = useState(0)

    const handleGET = async () => {
        return apiFetch("/todo", {
            method: "GET"
        }).then(response => setTodoList(response.body));
    }

    //onClick handler for when a todo is clicked. It toggles the todo completion value
    const handleClick = async (todoID) => {
        await apiFetch("/todo/update", {
            body: { todoID },
            method: "POST"
        });
        //after update, recall fetch to get updated todoList
        handleGET()
    }

    //filter function for todos
    const filterTodoList = (todos) => {
        return filters[filterStatus] === 'all' ? todos : todos.filter(todo => todo.completed === filters[filterStatus])
    }

    //cycle to next filter in array
    const nextFilter = () => {
        const newFilter = (filterStatus + 1) % 3
        setFilterStatus(newFilter)
    }

    //useEffect to call async function once 
    useEffect(() => {
        handleGET()
    }, [])


    //conditional render for TodoList object so it doesnt try to render undefined list
    //ideally Todo List would be its own component, but I want to save implementation time by having api calls in one place
    return (
        <PageLayout title="Todos">
            <Container>
                <div className="content">
                    <h1 style={{ marginBottom: '0' }}>Todos</h1>
                    <FilterButton className="filterButton" text={!filterStatus ? 'ALL' : filterStatus === 1 ? 'COMPLETED' : 'UNCOMPLETED'} size="large" variant="primary" onClick={nextFilter} />
                    <TodoListContainer>
                        <ul>
                            {todoList ?
                                filterTodoList(todoList.todos).map((todo) => (
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

const FilterButton = styled(Button)`
    margin: 10px auto 20px auto;
    width: 170px;
`

