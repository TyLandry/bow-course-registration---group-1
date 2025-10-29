export default function Student({
  id,
  firstName,
  lastName,
  email,
  phone,
  birthday,
  department,
  program,
}) {
  return (
    <tr className="text-xs lg:text-sm border-[1px] border-[var(--system-purple)]">
      <td className="font-semibold p-2 lg:p-3 whitespace-nowrap">{id}</td>
      <td className="font-semibold p-2 lg:p-3 whitespace-nowrap">{firstName}</td>
      <td className="p-2 lg:p-3 whitespace-nowrap">{lastName}</td>
      <td className="p-2 lg:p-3 whitespace-nowrap">{email}</td>
      <td className="p-2 lg:p-3 whitespace-nowrap">{phone}</td>
      <td className="p-2 lg:p-3 whitespace-nowrap">{birthday}</td>
      <td className="p-2 lg:p-3 whitespace-nowrap">{department}</td>
      <td className="p-2 lg:p-3 whitespace-nowrap">{program}</td>
    </tr>
  );
}
