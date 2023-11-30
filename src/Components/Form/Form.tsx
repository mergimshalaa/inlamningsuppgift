import { ChangeEvent, FormEvent, useState } from "react";
import { IApiResponse } from "../../interfaces/IApiResponse.interface";
import { IErrResponseMessage } from "../../interfaces/IErrResponseMessage.interface";
import Definitions from "../Definition/Definition";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import PhoneticsSection from "../Phonetics/Phonetics";
import "./Form.css";

/**
 * Form Component for Word Definitions
 * 
 * This component allows users to search for word definitions using a dictionary API.
 * It includes a form for input, error handling, and displays the result after fetching the data.
 * 
 */

export default function Form() {
  // State variables for dictionary form
  const [word, setWord] = useState("");
  const [response, setResponse] = useState<IApiResponse[] | null>(null);
  const [error, setError] = useState<IErrResponseMessage | null>(null);
  const [showDefinition, setShowDefinition] = useState(false);

  const fetchData = async () => {
    try {
      if (!word.trim()) throw new Error("Empty Search");

      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();

      if (data?.length) {
        setResponse(data);
        setShowDefinition(true);
        setError(null);
      } else {
        // Handle no definitions found when serching for a wrong or incorrect word
        setResponse(null);
        setError({
          title: "No Definitions Found",
          message: "Sorry pal, we couldn't find definitions for the word you were looking for.",
          resolution: "You can try the search again at a later time or head to the web instead.",
        });
      }
    } catch (error) {
      setResponse(null);
      setShowDefinition(false);
      setError({
        title: "Empty Search",
        message: "Sorry buddy, you can't search for an empty word.",
        resolution: "You can try the search again at a later time.",
      });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
    setWord("");
  };

  return (
    <div>
      <section className="dictionary">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter a word..."
              value={word}
              onChange={handleInputChange}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </section>
      {/*------------ Display error message if there is an error--------------- */}
      {error && <ErrorMessage title={error.title} message={error.message} resolution={error.resolution} />}

      {/*--------------- Display definitions if available------------------ */}
      {showDefinition && response && (
        response.map((result: IApiResponse, index: number) => (
          <div data-testid="search-word" key={index}>
            <section className="dictionary">
              <div>
                {/*------------- Mapping word and meanings -----------------*/}
                <div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "2rem" }}>{result.word}</p>
                    <hr style={{ marginTop: "5px" }} />
                  </div>
                  {result.meanings.map((meaning, index) => (
                    <Definitions key={index} meaning={meaning} />
                  ))}
                </div>
              </div>
              {result.phonetics?.length > 0 && (
                <div style={{ marginTop: '3rem' }}>
                  <PhoneticsSection
                    word={result.word}
                    phonetics={result.phonetics}
                  />
                </div>
              )}
            </section>
          </div>
        ))
      )}
    </div>
  );
}
