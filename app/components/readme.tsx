'use client';

import markdownContent from "../../README.md";

export default function ReadMe(){
    //TODO: remove dangerously set inner html
    return (
        <div>
            <article dangerouslySetInnerHTML={{__html: markdownContent}}/>
        </div>
    )
}

