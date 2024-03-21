import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Default_code from "./Default_code";
import { CodeEditor } from "../codeEditor/CodeEditor";
import "./Page1.css";
import { handleCompile } from "./utils";

export const Page1 = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("c++");
  const [code, setCode] = useState(Default_code[language]);
  const [username, setUsername] = useState("");
  const [stdin, setStdin] = useState();
  const [processing, setProcessing] = useState(false);

  const handleCodeChange = (value) => {
    setCode(value);
  };

  return (
    <div className="formContanier">
      <div className="main">
        <div className="left">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">User Name</InputGroup.Text>
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onBlur={(e) => setUsername(e.target.value)}
            />
          </InputGroup>

          <FloatingLabel
            controlId="floatingTextarea"
            label="Standard Input"
            className="mb-3 stdin"
          >
            <Form.Control
              as="textarea"
              onBlur={(e) => setStdin(e.target.value)}
              className="stdin"
            />
          </FloatingLabel>
          <Button
            variant="success"
            onClick={() => {
              handleCompile({
                username,
                language,
                code,
                stdin,
                setProcessing,
                navigate,
              });
            }}
            disabled={processing || !username || !code}
          >
            Submit
          </Button>
        </div>
        <div className="right">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              Preferred Language
            </InputGroup.Text>
            <Form.Select
              aria-label="Select Your Preffered Language"
              onChange={(e) => {
                setLanguage(e.target.value);
                setCode(Default_code[e.target.value]);
              }}
              value={language}
            >
              <option value="c++">C++</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </Form.Select>
          </InputGroup>
          <CodeEditor
            language={language}
            code={code}
            handleCodeChange={handleCodeChange}
          />
        </div>
      </div>
    </div>
  );
};
