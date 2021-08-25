// function rowMapper(fields, rowData) {
//   return (
//     <tr key={rowData['id']}>
//       { fields.map((field) => <td key={field}>{rowData[field]}</td>) }
//     </tr>
//   );
// }

export const Table = (props) => {
  // const head = props.col.map(({ name }) => <th key={name}>{name}</th>);
  // const fields = props.col.map(({ field }) => field);
  // const rows = props.data.map((row) => rowMapper(fields, row));

  return (
    <table>
      <thead><tr>{ props.head }</tr></thead>
      <tbody>{ props.body }</tbody>
    </table>
  )
};