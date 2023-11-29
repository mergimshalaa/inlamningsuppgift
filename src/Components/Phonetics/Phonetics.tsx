import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ILicenseProps, IPhoneticsProps } from '../../interfaces/IPhonetic.interface';
import './phonetics.css';

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
        <ul style={{listStyle: 'none'}}>
          {phonetics.map((phonetic, index) => (
            <li className="phonetic-item" key={index}>
              {phonetic.audio && (
                <FontAwesomeIcon 
                data-testid="speaker-phonetics"
                style={{ marginRight: '5px' }}
                icon={faVolumeUp}
                onClick={() => new Audio(phonetic.audio).play()}
                />
              )}
              {phonetic.text}{' '}
              {phonetic.license && <LicenseButton {...phonetic.license} />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
