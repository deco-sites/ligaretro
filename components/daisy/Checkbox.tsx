export interface Props {
  label?: string;
  checked?: boolean;
}

export default function Checkbox(props: Props) {
  const { label, checked } = props;

  return (
    <div className="form-control">
      {label
        ? (
          <label for={label} className="label cursor-pointer">
            <span className="label-text">{label}</span>
            <input
              id={label}
              type="checkbox"
              checked={checked}
              className="checkbox"
            />
          </label>
        )
        : (
          <input
            id={label}
            type="checkbox"
            checked={checked}
            className="checkbox"
          />
        )}
    </div>
  );
}
