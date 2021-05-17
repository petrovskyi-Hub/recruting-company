import React from 'react';
import Papa from 'papaparse';
import PropTypes from 'prop-types';
import checkFields from '../../services/checkFields';
import { CorrectHeaders } from '../../constants';
import s from './FileInput.module.css';

export default function FileInput({ usersData, setUsersData, setError }) {
  const fileInput = React.createRef();

  const handleChange = event => {
    event.preventDefault();
    setError(false);

    if (('fileInput?.current?', fileInput?.current?.files[0])) {
      Papa.parse(fileInput?.current?.files[0], {
        complete: function (results) {
          if (results.errors.length) {
            setError(true);
          }

          try {
            checkFields.validateHaeders(results.data[0], CorrectHeaders);
            checkFields.checkRequiredFields(
              results.data.slice(1, results.data.length - 1),
            );
          } catch (e) {
            console.log(e);
            setError(true);
          }

          setUsersData(results.data.slice(1, results.data.length - 1));
        },
      });
    }
  };

  return (
    <form className={s.fileInputForm} onChange={handleChange}>
      <label className={s.fileInputLabel} htmlFor="file-input">
        Import users
      </label>
      <input
        className={s.fileInput}
        type="file"
        id="file-input"
        ref={fileInput}
      />
    </form>
  );
}

FileInput.propTypes = {
  setUsersData: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};
