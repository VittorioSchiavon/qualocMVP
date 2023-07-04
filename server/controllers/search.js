import Product from "../models/Product.js";
import Fuse from "fuse.js";
import Store from "../models/Store.js";
import { Configuration, OpenAIApi } from "openai";

export const searchProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const options = {
      minMatchCharLength: 2,
      keys: [
        "name",
        "tags" /*
        "description"*/,
        ,
      ],
    };

    const fuse = new Fuse(products, options);
    var fuseResults = fuse.search(req.params.query);
    let finalResults = [];
    fuseResults.forEach((el) => {
      finalResults.push(el.item);
    });
    res.status(200).send(finalResults);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const searchStores = async (req, res) => {
  try {
    const stores = await Store.find();
    const options = {
      minMatchCharLength: 2,
      keys: [
        "name",
        "tags" /*
        "description"*/,
        ,
      ],
    };

    const fuse = new Fuse(stores, options);
    var fuseResults = fuse.search(req.params.query);
    let finalResults = [];
    fuseResults.forEach((el) => {
      finalResults.push(el.item);
    });
    res.status(200).send(finalResults);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const searchStoresGPT = async (req, res) => {
  try {
    var chatResponse = await chatGPT(req.params.query);
    console.log("sto cercando :", chatResponse.trim().replace(',', '').replace('.', ''))
    const stores = await Store.find({ tags: { $in: [chatResponse.trim().replace(',', '').replace('.', '').replace("'", '').toLowerCase()] } });
    res.status(200).send(stores);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const chatGPT = async (query) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  var list = [
    "giocattoli",
    "alimentari",
    "palle",
    "divertimento",
    "frutta",
    "verdura",
    "panini",
    "letti",
    "cuscini",
    "lenzuola",
    "pesce"   
  ];
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "data la lista " + list + "; '" + query + "' è nella categoria più specifica di: ###",
      max_tokens: 20,
      temperature: 0,
      stop: [",","\n"],
    });
    console.log(
      "alla ricerca di " + query + " ha classificato come:",
      response.data
    );
    return response?.data.choices[0].text;
  } catch (err) {
    console.log(err);
  }
};
