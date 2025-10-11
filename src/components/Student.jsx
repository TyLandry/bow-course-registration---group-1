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
    <tr className="text-xs borer-[1px] border-[1px] border-[var(--system-purple)]">
      <td className="font-semibold p-2">{id}</td>
      <td className="font-semibold p-2">{firstName}</td>
      <td className="p-2">{lastName}</td>
      <td className="p-2">{email}</td>
      <td className="p-2">{phone}</td>
      <td className="p-2">{birthday}</td>
      <td className="p-2">{department}</td>
      <td className="p-2">{program}</td>
    </tr>
  );
}
