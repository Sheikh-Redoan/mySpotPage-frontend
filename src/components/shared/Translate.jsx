import axios from "axios";
import { use, useState, useTransition } from "react";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/features/languageSlice";

// Create a function that returns a promise for the translation
async function fetchTranslation(text, language = "he") {
  const options = {
    method: "POST",
    url: "https://google-translator9.p.rapidapi.com/v2",
    headers: {
      "x-rapidapi-key": "289bea1b1dmsh088ccd97957615ep127f36jsn0cf9e7913e5e",
      "x-rapidapi-host": "google-translator9.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      q: text,
      source: "en",
      target: language,
      format: "text",
    },
  };

  // Create a promise that will be used for suspense
  return axios
    .request(options)
    .then((response) => {
      if (
        response.data &&
        response.data.data &&
        response.data.data.translations
      ) {
        return response.data.data.translations[0].translatedText;
      } else {
        console.error("Unexpected response structure:", response.data);
        return text; // Return original text as fallback
      }
    })
    .catch((error) => {
      console.error(error);
      return text; // Return original text as fallback
    });
}

// Cache to store promises for each text
const translationCache = new Map();

// Function to get translation from cache or create new promise
function getTranslation(text, language = "he") {
  if (!translationCache.has(text)) {
    translationCache.set(text, fetchTranslation(text, language));
  }
  return translationCache.get(text);
}

export default function Translate({ text }) {
  const language = useSelector(selectLanguage);
  // State to store the current text to translate
  const [textToTranslate, setTextToTranslate] = useState(text);

  // Use transition to avoid blocking the UI during translation
  const [isPending, startTransition] = useTransition();

  // Update the text to translate when the input text changes
  if (text !== textToTranslate) {
    startTransition(() => {
      setTextToTranslate(text);
    });
  }

  // Use the 'use' hook to suspend while the promise resolves
  const translated = use(
    getTranslation(textToTranslate, language.languageCode)
  );

  return (
    <>
      {isPending ? (
        <span className="text-gray-400">Translating...</span>
      ) : (
        translated
      )}
    </>
  );
}
