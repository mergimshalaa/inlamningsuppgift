import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ILicenseProps, IPhoneticsProps } from '../../interfaces/IPhonetic.interface';
import './phonetics.css';

/**
 * Phonetic Section Component
 * 
 * This component shows the phonetics of a word, including the text and audio.
 * Includs audio support for pronunciation and can display license information when hovering on it.
 */

const LicenseButton: React.FC<ILicenseProps> = ({ name, url }) => (
  <button className="license-button">
    License
    <div className="license-info">
      <p>Name: {name}</p>
      <p>URL: {url}</p>
    </div>
  </button>
);

export default function PhoneticsSection({ word, phonetics }: IPhoneticsProps) {
  return (
    <section className="section-phonetics dictionary">
      <div>
        <p style={{ fontSize: '2rem' }}>Phonetics</p>
        <hr style={{ marginBottom: '1rem' }} />
        <ul style={{ listStyle: 'none' }}>
          {/*----------- Mapping through each phonetic "item" --------*/}
          {phonetics.map((phonetic, index) => (
            <li className="phonetic-item" key={index}>
              {/*------------ Display the audio icon if available, and plays on click ---------*/}
              {phonetic.audio && (
                <FontAwesomeIcon
                  data-testid="speaker-phonetics"
                  style={{ marginRight: '5px' }}
                  icon={faVolumeUp}
                  onClick={() => new Audio(phonetic.audio).play()}
                />
              )}
              {phonetic.text}{' '}
              {/* --------- Display LicenseButton if license information is available-------- */}
              {phonetic.license && <LicenseButton {...phonetic.license} />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
