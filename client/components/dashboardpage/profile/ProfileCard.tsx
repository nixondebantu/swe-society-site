import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  label: string;
  info: string | undefined;
  edit: boolean;
  className?: string | undefined;
  placeholder?: string | undefined;
  onChange?: (
    value: string | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  options?: string[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  label,
  info,
  edit,
  className,
  placeholder,
  onChange,
  options,
}) => {
  return (
    <div className={cn(className)}>
      <p className="text-xs font-semibold">{label}</p>
      {label === "Blood Group" && options ? (
        <Select value={info} disabled={!edit} onValueChange={onChange}>
          <SelectTrigger className="disabled:cursor-default disabled:opacity-100 mb-2">
            <SelectValue placeholder="Select blood group" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          value={info}
          disabled={!edit}
          placeholder={placeholder}
          className="disabled:cursor-default disabled:opacity-100 mb-2"
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
    </div>
  );
};

export default ProfileCard;
