import userModel from "../model/user.js";

const form = async (req, res) => {
  try {
    const { username, language, stdin, code, stdout } = req.body;
    console.log({ username, language, stdin, code, stdout });

    //save
    const user = await new userModel({
      username,
      language,
      stdin,
      code,
      stdout,
    }).save();

    res.status(201).send({
      success: true,
      message: "Form submitted",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Form submission Error",
      error,
    });
  }
};
export default form;
