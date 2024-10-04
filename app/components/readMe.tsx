"use client";

import markdownContent from "../../README.md";
import ReactMarkdown from "react-markdown";
export default function ReadMe() {
  return (
    <div className="bg-white dark:bg-slate-800">
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
}
