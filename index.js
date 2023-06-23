import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Bard } from "googlebard";

const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(cors());


let cookies = `__Secure-1PSID=XQj6OXMY4gDOxj2G98dwPgPQuZii7cmzy-e2pGF7MfE54NIdNBxoaZFk3DlvhXA4RLRl5g.`;
const configuration = new Configuration({
    organization: "org-HXfyqrQwlQ2CXFyhl0CyvWcF",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);
const bard = new Bard(cookies);


app.post("/gpt-1", async (request, response) => {
    try {
        const { chats } = request.body;

        const result = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-0613",
            messages: [
                {
                    role: "system",
                    content: "You are a Brainic. You can help with any tasks",
                },
                ...chats,
            ],
        });

        response.json({
            output: result.data.choices[0].message,
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "An error occurred while processing the request." });
    }
});




app.post("/gpt-2", async (req, res) => {
    const input = req.body.input;
    const response = await bard.ask(input);
    res.send({
        response: response
    });
});


app.post("/generate-image", async (req, res) => {
    const { prompt, size } = req.body;
  
    const imageSize =
      size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';
  
    try {
      const response = await openai.createImage({
        prompt,
        n: 1,
        size: imageSize,
      });
  
      const imageUrl = response.data.data[0].url;
  
      res.status(200).json({
        success: true,
        data: imageUrl,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
  
      res.status(400).json({
        success: false,
        error: 'The image could not be generated',
      });
    }
  });




// if ( process.env.NODE_ENV == "production"){
    app.use(express.static("frontend/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
// }

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
