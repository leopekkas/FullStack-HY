import React from 'react'

const Header = (props) => {
    return (
        <h1> {props.header} </h1>
    )
}

const Content = (props) => {
    return (
        <div>
            <ul>
                {props.parts.map(part =>
                    <li key={part.id}>
                        {part.name} {part.exercises}
                    </li>
                )}
            </ul>
        </div>
    )
}

const TotalExercises = (props) => {
    return (
        <div>
            <b> 
                total of {props.sum} exercises
            </b>
        </div>
    )
}

const Course = (props) => {
    const header = props.course.name
    const parts = props.course.parts
    const exercisetable = parts.map(part => 
        part.exercises
    )

    const sum = exercisetable.reduce( (a, b) => {
        return a + b
    })
    return (
        <div>
            <Header header={header} />
            <Content parts={parts} />
            <TotalExercises sum={sum} />
        </div>
    )
}

export default Course