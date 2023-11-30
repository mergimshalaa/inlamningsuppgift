import { IMeaning } from "../../interfaces/IMeaning.interface";
import './definition.css';

interface IMeaningItemProps {
  meaning: IMeaning;
}

/**
 * Definitions Component for Word Meanings
 * 
 * This component renders the meanings of a word, including part of speech, definitions, synonyms, antonyms,
 * and examples. It supports dynamic rendering based on the provided meaning object from the api.
 */

export default function Definitions({ meaning }: IMeaningItemProps) {
  return (
    <div>
      {/*----------------- Display the part of speech--------- ----*/}
      <p style={{ fontWeight: "bold", fontSize: "2rem", marginTop: "2rem" }}>
        {meaning.partOfSpeech}
      </p>
      <ul>
        {/* -----------------Map through each definition ---------- */}
        {meaning.definitions.map((definition, subIndex) => (
          <li style={{ listStyle: "none", marginTop: "1rem" }} key={subIndex}>
            <p style={{ marginTop: "8px" }}>- {definition.definition}</p>
            {definition.synonyms.length > 0 && (
              <p className="synonyms-antonyms">
                Synonyms: <span>{definition.synonyms.join(", ")}</span>
              </p>
            )}
            {definition.antonyms.length > 0 && (
              <p className="synonyms-antonyms">
                Antonyms: <span>{definition.antonyms.join(", ")}</span>
              </p>
            )}
            {definition.example && (
              <p style={{ fontStyle: "italic", marginLeft: '1.5rem' }}>
                Example: <span>{definition.example}</span>
              </p>
            )}
          </li>
        ))}
      </ul>
  
      {/* -------------Display overall synonyms if there are available------------- */}
      {meaning.synonyms.length > 0 && (
        <p className="synonyms-antonyms">
          Synonyms: <span>{meaning.synonyms.join(", ")}</span>
        </p>
      )}
      {/* ---------- Display overall antonyms if there are available--------------- */}
      {meaning.antonyms.length > 0 && (
        <p className="synonyms-antonyms">
          Antonyms: <span>{meaning.antonyms.join(", ")}</span>
        </p>
      )}
      <hr style={{ marginTop: "2rem" }} />
    </div>
  );
}
