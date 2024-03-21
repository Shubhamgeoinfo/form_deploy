import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CodeEditor } from "../codeEditor/CodeEditor";

export const Page2 = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const username = params?.username;
    axios
      .get(`http://localhost:8000/getdata/${username}`)
      .then(function (response) {
        // handle success
        console.log(response);
        setData(response.data?.data || []);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [params?.username]);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Language</th>
            <th>Standard Input (stdin)</th>
            <th>Code Snippet</th>
            <th>Code output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data?.username}</td>
            <td>{data?.language}</td>
            <td>{data?.stdin}</td>
            <td>
              <CodeEditor
                defaultLanguage={data?.language}
                code={data?.code}
                readOnly={true}
              />
            </td>
            <td>{data?.stdout}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
