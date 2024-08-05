import { getMetadataDescendant } from "@/data-sources/nexon/metadata";
import DescendantSelect from "./descendant-select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { MetadataDescendant } from "@/types/metadata";

export default async function DescendantPage({
  searchParams,
}: {
  searchParams: { descendantId?: string; level?: string };
}) {
  const descendants = (await getMetadataDescendant()) as MetadataDescendant[];

  let selectedDescendantId: string | undefined;
  if (searchParams && searchParams["descendantId"]) {
    selectedDescendantId = searchParams["descendantId"];
  } else {
    selectedDescendantId = descendants[0].descendant_id;
  }
  if (!selectedDescendantId) {
    return <div>No Descendant Selected</div>;
  }

  const levels = descendants
    .find((descendant) => descendant.descendant_id === selectedDescendantId)
    ?.descendant_stat.map((stat) => stat.level);

  if (!levels) {
    return <div>No Levels Found</div>;
  }

  let selectedLevel: string | undefined;
  if (searchParams && searchParams["level"]) {
    selectedLevel = searchParams["level"];
  } else {
    selectedLevel = "1";
  }
  if (!selectedLevel) {
    return <div>No Level Selected</div>;
  }

  const selectedDescendant = descendants.find(
    (descendant) => descendant.descendant_id === selectedDescendantId
  );
  if (!selectedDescendant) {
    return <div>No Descendant Found</div>;
  }

  return (
    <main className="flex flex-col items-center container overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Descendant Metadata</h1>
      <DescendantSelect
        descendants={descendants}
        selectedDescendantId={selectedDescendantId}
        selectedLevel={selectedLevel}
        levels={levels}
      />
      <div className="mt-2 flex flex-wrap gap-2">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image
                src={selectedDescendant?.descendant_image_url}
                alt=""
                width={40}
                height={40}
              />
              {selectedDescendant?.descendant_name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDescendant?.descendant_stat
              .find((stat) => stat.level.toString() === selectedLevel)
              ?.stat_detail.map((stat) => (
                <div key={stat.stat_type} className="flex flex-wrap gap-2">
                  <div>{stat.stat_type}</div>
                  <div>
                    {stat.stat_value.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedDescendant?.descendant_skill.map((skill) => (
            <Card key={skill.skill_name} className="max-w-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image
                    src={skill.skill_image_url}
                    alt=""
                    width={40}
                    height={40}
                    className="bg-black rounded-full"
                  />
                  {skill.skill_name}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <div>{skill.skill_type}</div>
                  <div>{skill.element_type}</div>
                  <div>{skill.arche_type}</div>
                </CardDescription>
              </CardHeader>
              <CardContent>{skill.skill_description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
