import Product from "../models/Product.js";
import Fuse from 'fuse.js';
import Store from "../models/Store.js";
import { Configuration, OpenAIApi } from "openai";

export const searchProducts = async (req, res) => {

  try {
    chatGPT()
    return  res.status(200)
    const products = await Product.find();
    const options = {
      minMatchCharLength: 2,
      keys: [
          
        "name"/*,
        "tags",
        "description"*/
      ]
    };
    
    const fuse = new Fuse(products, options);
    var fuseResults=fuse.search(req.params.query);
    let finalResults=[];
    fuseResults.forEach(el=>{
        finalResults.push(el.item)
    })
    res.status(200).send(finalResults);
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
};



const chatGPT= async()=>{
  try{

  
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: "Hello world"}],
  });
  console.log(completion.data.choices[0].message);
} catch (err) {
  console.log(err)
}
}
