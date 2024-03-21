import redis from "redis";
import user from "../model/user.js";

//const client = redis.createClient({url:http:/localhost:5173/getdata/:username});

export const alldata = async (req, res) => {
  try {
    const data = await user.find({});
    res.status(200).send({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

export const singleUserData = async (req, res) => {
  try {
    const data = await user.findOne({ username: req.params.username });
    res.status(200).send({
      success: true,
      message: "Single User data Fetched",
      data,
    });

    //REDIS (Key-Value database)

    // client.on("error", (err) => console.log("Redis Client Error", err));
    // await client.connect();

    // await client.set("key", JSON.stringify(data));
    // const value = await client.get("key");

    //ReDIS End
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single user data",
      error,
    });
  }
};
