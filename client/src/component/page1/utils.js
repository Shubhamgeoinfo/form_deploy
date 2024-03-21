import axios from "axios";
import {
  REACT_APP_RAPID_API_HOST,
  REACT_APP_RAPID_API_KEY,
  REACT_APP_RAPID_API_URL,
} from "./const";
import languageIdMap from "./languageIdMap";
export const handleCompile = ({
  language,
  stdin,
  code,
  setProcessing,
  username,
  navigate,
}) => {
  setProcessing(true);
  const formData = {
    language_id: languageIdMap[language],
    // encode source code in base64
    source_code: btoa(code),
    stdin: btoa(stdin),
  };
  const options = {
    method: "POST",
    url: REACT_APP_RAPID_API_URL,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Host": REACT_APP_RAPID_API_HOST,
      "X-RapidAPI-Key": REACT_APP_RAPID_API_KEY,
    },
    data: formData,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log("res.data", response.data);
      const token = response.data.token;
      checkStatus({
        token,
        language,
        stdin,
        code,
        setProcessing,
        username,
        navigate,
      });
    })
    .catch((err) => {
      let error = err.response ? err.response.data : err;
      setProcessing(false);
      console.log(error);
    });
};

const checkStatus = async ({
  token,
  language,
  stdin,
  code,
  setProcessing,
  username,
  navigate,
}) => {
  const options = {
    method: "GET",
    url: REACT_APP_RAPID_API_URL + "/" + token,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "X-RapidAPI-Host": REACT_APP_RAPID_API_HOST,
      "X-RapidAPI-Key": REACT_APP_RAPID_API_KEY,
    },
  };
  try {
    let response = await axios.request(options);
    let statusId = response.data.status?.id;

    // Processed - we have a result
    if (statusId === 1 || statusId === 2) {
      console.log("still processing");
      // still processing
      setTimeout(() => {
        checkStatus({
          token,
          language,
          stdin,
          code,
          setProcessing,
          username,
          navigate,
        });
      }, 3000);
      return;
    } else {
      setProcessing(false);
      console.log("response.data", response.data);
      //const statusCode = response.data?.status?.id;
      const stdout = atob(response.data?.stdout);
      //const stderr = atob(response.data?.stderr);
      postFormData({ username, language, stdin, stdout, code });
      navigate(`/submit/${username}`);
      return;
    }
  } catch (err) {
    console.log("err", err);
    setProcessing(false);
  }
};

const postFormData = async ({ username, language, stdin, stdout, code }) => {
  console.log({ username, language, stdin, stdout, code });
  await axios
    .post("http://localhost:8000/form", {
      username,
      language,
      stdin,
      code,
      stdout,
    })
    .then(() => {
      console.log("Success");
    })
    .catch(() => {
      console.log("Failed");
    });
};
