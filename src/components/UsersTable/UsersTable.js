import PropTypes from 'prop-types';
import { CorrectHeaders, STATES } from '../../constants';
import checkFields from '../../services/checkFields';
import s from './UserTable.module.css';

export default function UsersTable({ usersData }) {
  const transformPhone = phone => {
    if (checkFields.checkPhone(phone)) {
      if (phone.length === 10) {
        return '+1' + phone;
      } else if (phone.length === 11) {
        return '+' + phone;
      }
    }

    return phone;
  };

  const transformStates = (states, allStatets) => {
    if (checkFields.checkStates(states, allStatets)) {
      const newStates = states.map(state => {
        state = state.trim();
        if (state.length === 2) {
          return state;
        }

        if (state.length > 2) {
          const index = Object.values(allStatets).indexOf(state);
          return Object.keys(allStatets)[index];
        }

        return state;
      });

      return newStates.join(', ');
    }

    return states.join(', ');
  };

  return (
    <table>
      <thead>
        <tr key="0">
          <th key="01">ID</th>
          {CorrectHeaders.map((data, i) => (
            <th key={i}>{data.trim()}</th>
          ))}
          <th key="02">Duplicate with</th>
        </tr>
      </thead>
      <tbody>
        {usersData.map(
          (row, i) => (
            <tr key={i}>
              {/* ID */}
              <td key="0">{i + 1}</td>
              {/* Full Name */}
              <td
                key="1"
                className={
                  checkFields.checkName(row[0].trim()) ? s.correct : s.incorrect
                }
              >
                {row[0].trim()}
              </td>
              {/* Phone */}
              <td
                key="2"
                className={
                  checkFields.checkPhone(row[1].trim()) &&
                  !checkFields.checkDuplicatePhone(usersData, row, i)
                    ? s.correct
                    : s.incorrect
                }
              >
                {transformPhone(row[1].trim())}
              </td>
              {/* Email */}
              <td
                key="3"
                className={
                  checkFields.checkEmail(row[2].trim()) &&
                  !checkFields.checkDuplicateEmail(usersData, row, i)
                    ? s.correct
                    : s.incorrect
                }
              >
                {row[2].trim()}
              </td>
              {/* Age */}
              <td
                key="4"
                className={
                  Number.isInteger(Number(row[3])) && Number(row[3]) >= 21
                    ? s.correct
                    : s.incorrect
                }
              >
                {row[3].trim()}
              </td>
              {/* Experience */}
              <td
                key="5"
                className={
                  row[4] >= 0 && row[4] <= row[3] ? s.correct : s.incorrect
                }
              >
                {row[4].trim()}
              </td>
              {/* Yearly Income */}
              <td
                key="6"
                className={
                  row[5] >= 0 && row[5] <= 1e6 ? s.correct : s.incorrect
                }
              >
                {Number(row[5]).toFixed(2)}
              </td>
              {/* Has children */}
              <td
                key="7"
                className={
                  row[6].trim() === 'TRUE' ||
                  row[6].trim() === 'FALSE' ||
                  row[6].trim() === ''
                    ? s.correct
                    : s.incorrect
                }
              >
                {row[6].trim() === '' ? 'FALSE' : row[6].trim()}
              </td>
              {/* License states */}
              <td
                key="8"
                className={
                  checkFields.checkStates(row[7].trim().split('|'), STATES)
                    ? s.correct
                    : s.incorrect
                }
              >
                {transformStates(row[7].trim().split('|'), STATES)}
              </td>
              {/* Expiration date */}
              <td
                key="9"
                className={
                  checkFields.dateCompare(row[8].trim())
                    ? s.correct
                    : s.incorrect
                }
              >
                {row[8].trim()}
              </td>
              {/* License number */}
              <td
                key="10"
                className={
                  checkFields.checkLicNumb(row[9].trim())
                    ? s.correct
                    : s.incorrect
                }
              >
                {row[9].trim()}
              </td>
              {/* Duplicate with */}
              <td key="11">{checkFields.checkDuplicate(usersData, row, i)}</td>
            </tr>
          ),
          // ),
        )}
      </tbody>
    </table>
  );
}

UsersTable.propTypes = {
  usersData: PropTypes.array.isRequired,
};
