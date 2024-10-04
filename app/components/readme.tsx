'use client';

import markdownContent from "../../README.md";
import ReactMarkdown from "react-markdown";
export default function ReadMe(){
    return (
        <div>
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
    )
}

