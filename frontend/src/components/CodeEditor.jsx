import React from "react";
import MonacoEditor from "react-monaco-editor"; // Correct import

const CodeEditor = ({ value, onChange, language = "javascript" }) => {
    return (
        <MonacoEditor
            height="200px"
            language={language} // Use `language` instead of `defaultLanguage`
            value={value}
            onChange={onChange}
            theme="vs-dark"
            options={{
                fontSize: 14,
                minimap: { enabled: false },
                automaticLayout: true,
            }}
        />
    );
};

export default CodeEditor;
