export default function ProductAttributes({ attributes }) {
  if (!attributes || attributes.length === 0) {
    return <p className="text-gray-500">No specifications available.</p>;
  }

  return (
    <div className="mt-6">
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <tbody>
          {attributes.map((attribute) => (
            <tr key={attribute.id} className="border-b">
              <th className="text-left px-4 py-2 text-gray-700">
                {attribute.name}
              </th>
              <td className="px-4 py-2 text-gray-600">
                {attribute.options.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
