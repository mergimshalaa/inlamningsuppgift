import { IErrResponseMessage } from "../../interfaces/IErrResponseMessage.interface";
import './ErrorMessage.css';

/**
 * ErrorMsg Component
 *
 *  This component displays an error message with a title, detailed message, and a resolution.
 */

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
