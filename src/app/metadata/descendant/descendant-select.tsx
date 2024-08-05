"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MetadataDescendant } from "@/types/metadata";

interface DescendantSelectProps {
  selectedDescendantId: string;
  selectedLevel: string;
  descendants: MetadataDescendant[];
  levels: number[];
}

const DescendantSelect: React.FC<DescendantSelectProps> = ({
  selectedDescendantId,
  selectedLevel,
  descendants,
  levels,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const addQueryParams = (params: { [key: string]: string }) => {
    const newSearchParams = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(params)) {
      newSearchParams.set(key, value);
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const descendantIdSearchParam = searchParams.get("descendantId");
  const levelSearchParam = searchParams.get("level");
  if (!descendantIdSearchParam || !levelSearchParam) {
    addQueryParams({
      descendantId: selectedDescendantId.toString(),
      level: selectedLevel.toString(),
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Select
        defaultValue={selectedDescendantId.toString()}
        onValueChange={(value) =>
          addQueryParams({ descendantId: value.toString() })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Descendant" />
        </SelectTrigger>
        <SelectContent>
          {descendants.map((descendant) => (
            <SelectItem
              value={descendant.descendant_id}
              key={descendant.descendant_id}
            >
              {descendant.descendant_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={selectedLevel.toString()}
        onValueChange={(value) => addQueryParams({ level: value.toString() })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Level" />
        </SelectTrigger>
        <SelectContent>
          {levels.map((level) => (
            <SelectItem value={level.toString()} key={level.toString()}>
              {level.toString()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DescendantSelect;
