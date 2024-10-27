import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import { MdRefresh } from "react-icons/md";

const tabs = [
  { label: "Flowers", key: "flowers" },
  { label: "Vegetables", key: "vegetables" },
  { label: "Herbs", key: "herbs" },
  { label: "Shrubs", key: "shrubs" },
  { label: "Trees", key: "trees" },
  { label: "Succulents & Cacti", key: "succulents_cacti" },
  { label: "Indoor Plants", key: "indoor_plants" },
  { label: "Garden Tools", key: "garden_tools" },
  { label: "Fertilizers", key: "fertilizers" },
  { label: "Pots & Planters", key: "pots_planters" },
  { label: "Seeds", key: "seeds" },
  { label: "Watering Systems", key: "watering_systems" },
];

interface FilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  category: string;
  setCategory: (category: string) => void;
}

export default function Filter({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
}: FilterProps) {
  const handleReset = () => {
    setSearchTerm("");
    setCategory("");
  };

  return (
    <div className="mx-auto my-5">
      <div className="flex flex-col md:flex-row gap-3 my-6 w-full mx-auto">
        <Input
          className="w-[470px]"
          placeholder="Search posts..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Select
          className="w-80"
          placeholder="Select category"
          value={category}
          onChange={(value) =>
            setCategory(value.target.value as unknown as string)
          }
        >
          {tabs.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>

        <Button
          isIconOnly
          className="mt-2 md:mt-0"
          color="default"
          variant="flat"
          onClick={handleReset}
        >
          <MdRefresh size={24} />
        </Button>
      </div>
    </div>
  );
}
