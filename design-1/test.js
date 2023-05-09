import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
	apiKey: "api key here",
});
const openai = new OpenAIApi(configuration);

var messages = [];

function addSystemMessage() {
	messages.push({
		"role": "system",
		"content": "Je bent een Artificial Intelligence model dat getraind is op emoticons die lichaamstaal en gezichtsuitdrukkingen uitten. Aan de hand van tekst tussen \"\" suggereer je 6 paren van emoticons die zowel bij de tekst tussen \"\" als bij hun paar passen."
	});
	messages.push({
		"role": "system",
		"content": `Je geeft de uitvoer in JSON formaat en gebruik dit als voorbeeld: { "emoticon_pairs": [ ["😁", "👍"], ["😁", "🤝"] ] }. Houdt er rekening mee dat dit een voorbeeld is en jij 6 paren moet geven. Geef ook niks anders dan JSON, want anders werkt onze code niet meer.`
	})
}

async function generate(message) {
	messages.push({"role": "user", "content": message});
	console.log(messages)
	const res = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: messages,
	})

	return res.data.choices[0].message.content;
}

addSystemMessage();
const pijn = await generate("Ik heb pijn in mijn buik.");
console.log(pijn);