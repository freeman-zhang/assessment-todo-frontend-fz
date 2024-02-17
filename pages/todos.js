import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';
import TodoList from '../components/ToDoList';
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
                    <div className="listContainer">
                        {todoList ? <TodoList list={todoList.todos} /> : <></>}

                    </div>
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
