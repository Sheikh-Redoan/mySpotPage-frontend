import axios from "axios";
import { use, useEffect, useState, useTransition } from "react";
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

  try {
    const response = await axios.request(options);
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
  } catch (error) {
    console.error(error);
    return text; // Return original text as fallback
  }
}

// Cache to store promises for each text+language combination
const translationCache = new Map();

// Function to get translation from cache or create new promise
function getTranslation(text, language = "he") {
  // Create a unique key using both text and language
  const cacheKey = `${text}:${language}`;

  if (!translationCache.has(cacheKey)) {
    translationCache.set(cacheKey, fetchTranslation(text, language));
  }
  return translationCache.get(cacheKey);
}

export default function Translate({ text }) {
  const language = useSelector(selectLanguage);
  const [translationPromise, setTranslationPromise] = useState(null);
  const [isPending, startTransition] = useTransition();

  // Create a new translation promise when text or language changes
  useEffect(() => {
    startTransition(() => {
      const promise = getTranslation(text, language.code);
      setTranslationPromise(promise);
    });
  }, [text, language.code]);

  // If no promise yet, show loading
  if (!translationPromise) {
    return <span className="text-gray-400">Translating...</span>;
  }

  // Use the promise with Suspense
  const translated = use(translationPromise);

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
