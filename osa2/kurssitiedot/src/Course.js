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

const Course = (props) => {
    const header = props.course.name
    const parts = props.course.parts

    return (
        <div>
            <Header header={header} />
            <Content parts={parts} />
        </div>
    )
}

export default Course