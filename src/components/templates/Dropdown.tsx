const Dropdown = ({
  title,
  options,
  func,
}: {
  title: string;
  options: string[];
  func: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="select">
      <select defaultValue="0" name="format" id="format" onChange={func}>
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o: string) => (
          <option value={o}>{o.toUpperCase()}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
