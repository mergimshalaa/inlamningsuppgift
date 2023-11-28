import { IMeaning } from "../interfaces/IMeaning.interface";

interface MeaningItemProps {
  meaning: IMeaning;
}
export default function Definitions({ meaning }: MeaningItemProps) {
  return (
    <div>
      <p style={{ fontWeight: "bold", fontSize: "2rem", marginTop: "2rem" }}>
        {meaning.partOfSpeech}
      </p>
      <ul>
        {meaning.definitions.map((definition, subIndex) => (
          <li style={{ listStyle: "none", marginTop: "1rem" }} key={subIndex}>
            <p style={{ marginTop: "8px" }}>- {definition.definition}</p>
            {definition.synonyms.length > 0 && (
              <p style={{ fontWeight: "bold", marginTop: "5px" }}>
                Synonyms: <span>{definition.synonyms.join(", ")}</span>
              </p>
            )}
            {definition.antonyms.length > 0 && (
              <p style={{ fontWeight: "bold", marginTop: "5px" }}>
                Antonyms: <span>{definition.antonyms.join(", ")}</span>
              </p>
            )}
            {definition.example && (
              <p style={{ fontStyle: "italic", marginTop: "3px" }}>
                Example: <span>{definition.example}</span>
              </p>
            )}
          </li>
        ))}
      </ul>

      {meaning.synonyms.length > 0 && (
        <p style={{ fontWeight: "bold", marginTop: "5px" }}>
          Synonyms: <span>{meaning.synonyms.join(", ")}</span>
        </p>
      )}
      {meaning.antonyms.length > 0 && (
        <p style={{ fontWeight: "bold", marginTop: "5px" }}>
          Antonyms: <span>{meaning.antonyms.join(", ")}</span>
        </p>
      )}
    </div>
  );
}
