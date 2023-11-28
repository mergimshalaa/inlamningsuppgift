import { IErrResponseMessage } from "../../interfaces/IErrResponseMessage.interface";
import './ErrorMessage.css';

export default function ErrorMessage({ title, message, resolution }: IErrResponseMessage) {
  return (
    <section className="dictionary">
      <div>
        <p className="err-title">{title}</p>
        <p>{message}</p>
        <p>{resolution}</p>
      </div>
    </section>
  );
}
