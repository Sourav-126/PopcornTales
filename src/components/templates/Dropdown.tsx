import React from "react";

const Dropdown = ({
  title,
  options,
  func,
}: {
  title: any;
  options: any;
  func: any;
}) => {
  return (
    <div className="select">
      <select defaultValue="0" name="format" id="format" onChange={func}>
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o: string, i: number) => (
          <option value={o}>{o.toUpperCase()}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
