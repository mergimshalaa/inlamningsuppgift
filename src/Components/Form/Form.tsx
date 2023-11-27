import { ChangeEvent, FormEvent, useState } from "react";
import { IApiResponse } from "../../interfaces/IApiResponse.interface";
import { IErrResponseMessage } from "../../interfaces/IErrResponseMessage.interface";
import Definitions from "../Definition";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import PhoneticsSection from "../Phonetics/Phonetics";
import "./Form.css";

export default function Form() {
  const [word, setWord] = useState("");
  const [response, setResponse] = useState<IApiResponse | null>(null);
  const [error, setError] = useState<IErrResponseMessage | null>(null);
  const [showDefinition, setShowDefinition] = useState(false);

  const fetchData = async () => {
    try {
      if (!word.trim()) throw new Error("Empty Search");
  
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data: IApiResponse[] = await response.json();
  
      if (data?.length) {
        setResponse(data[0]);
        setShowDefinition(true);
        setError(null);
      } else {
        throw new Error("No Definitions Found");
      }
    } catch (error) {
      setResponse(null);
      setShowDefinition(false);
      setError({
        title: "No Definitions Found",
        message: "Sorry pal, we couldn't find definitions for the word you were looking for.",
        resolution: "You can try the search again at a later time or head to the web instead.",
      });
    }
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
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
      {error && <ErrorMessage title={error.title} message={error.message} resolution={error.resolution} />}
      {showDefinition && response && (
        <div>
          <section className="dictionary">
            <div>
              <div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "2rem" }}>{response.word}</p>
                  <hr style={{ marginBottom: "1rem" }} />
                </div>
                {response.meanings.map((meaning, index) => (
            <Definitions key={index} meaning={meaning} />
          ))}
              </div>
            </div>
          </section>

          {response.phonetics?.length > 0 && (
            <section className="section-phonetics dictionary">
              <div className="phonetics-container">
                <PhoneticsSection
                  word={response.word}
                  phonetics={response.phonetics}
                />
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
