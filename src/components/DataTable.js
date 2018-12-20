import React from 'react';

function DataTable(props) {
  const { data } = props;
  // Retrieve the column name based on the first element
  const columns = Object.keys(data[0]);
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {
                columns.map(column => <th>{column.toLocaleUpperCase()}</th>)
            }
        </tr>
      </thead>
      <tbody>
        { data.map(each => (
          <tr>
            {
                columns.map(column => <td>{each[column]}</td>)
            }
          </tr>
        ))

        }
      </tbody>
    </table>
  );
}


export default DataTable;
