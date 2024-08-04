import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAccount,
  getAccountDescendant,
  getAccountExternalComponent,
  getAccountReactor,
  getAccountWeapon,
} from "@/data-sources/nexon/account";

export default async function AccountPage({
  params: { ouid },
}: {
  params: { ouid: string };
}) {
  const decodedouid = decodeURIComponent(ouid);
  const accountData = await getAccount(decodedouid);
  const accountDescendantData = await getAccountDescendant(decodedouid);
  const accountWeaponData = await getAccountWeapon(decodedouid);
  const accountReactorData = await getAccountReactor(decodedouid);
  const accountExternalComponentData =
    await getAccountExternalComponent(decodedouid);
  return (
    <div className="flex flex-wrap gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Account: {accountData.user_name}</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(accountData).map(([key, value]) => (
            <div key={key}>
              <strong>{key}</strong>: {value}
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Account Descendant: {accountDescendantData.descendant_id}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div>
              <strong>Descendant Id</strong>:{" "}
              {accountDescendantData.descendant_id}
            </div>
            <div>
              <strong>Descendant Slot Id</strong>:{" "}
              {accountDescendantData.descendant_slot_id}
            </div>
            <div>
              <strong>Descendant Level</strong>:{" "}
              {accountDescendantData.descendant_level}
            </div>
            <div>
              <strong>Module Max Capacity</strong>:{" "}
              {accountDescendantData.module_max_capacity}
            </div>
            <div>
              <strong>Module Capacity</strong>:{" "}
              {accountDescendantData.module_capacity}
            </div>
            {accountDescendantData.module.map((module) => (
              <div key={module.module_slot_id} className="flex gap-2">
                <div>
                  <strong>Module Slot Id</strong>: {module.module_slot_id}
                </div>
                <div>
                  <strong>Module Id</strong>: {module.module_id}
                </div>
                <div>
                  <strong>Module Enchant Level</strong>:{" "}
                  {module.module_enchant_level}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {accountWeaponData.weapon.length > 0 &&
        accountWeaponData.weapon.map((weapon) => (
          <Card key={weapon.weapon_id}>
            <CardHeader>
              <CardTitle>Account Weapon: {weapon.weapon_id}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div>
                  <strong>Weapon Id</strong>: {weapon.weapon_id}
                </div>
                <div>
                  <strong>Weapon Level</strong>: {weapon.weapon_level}
                </div>
                <div>
                  <strong>Perk Ability Enchant Level</strong>:{" "}
                  {weapon.perk_ability_enchant_level}
                </div>
                {weapon.weapon_additional_stat.map((additionalStat) => (
                  <div key={additionalStat.additional_stat_name}>
                    <strong>Additional Stat Name</strong>:{" "}
                    {additionalStat.additional_stat_name}
                    <strong>Additional Stat Value</strong>:{" "}
                    {additionalStat.additional_stat_value}
                  </div>
                ))}
                {weapon.module.map((module) => (
                  <div key={module.module_slot_id} className="flex gap-2">
                    <div>
                      <strong>Module Slot Id</strong>: {module.module_slot_id}
                    </div>
                    <div>
                      <strong>Module Id</strong>: {module.module_id}
                    </div>
                    <div>
                      <strong>Module Enchant Level</strong>:{" "}
                      {module.module_enchant_level}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      <Card>
        <CardHeader>
          <CardTitle>
            Account Reactor: {accountReactorData.reactor_id}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div>
              <strong>Reactor Id</strong>: {accountReactorData.reactor_id}
            </div>
            <div>
              <strong>Reactor Slot Id</strong>:{" "}
              {accountReactorData.reactor_slot_id}
            </div>
            <div>
              <strong>Reactor Level</strong>: {accountReactorData.reactor_level}
            </div>
            {accountReactorData.reactor_additional_stat.map(
              (additionalStat) => (
                <div key={additionalStat.additional_stat_name}>
                  <strong>Additional Stat Name</strong>:{" "}
                  {additionalStat.additional_stat_name}
                  <strong>Additional Stat Value</strong>:{" "}
                  {additionalStat.additional_stat_value}
                </div>
              )
            )}
            <div>
              <strong>Reactor Enchant Level</strong>:{" "}
              {accountReactorData.reactor_enchant_level}
            </div>
          </div>
        </CardContent>
      </Card>
      {accountExternalComponentData.external_component.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Account External Component</CardTitle>
          </CardHeader>
          <CardContent>
            {accountExternalComponentData.external_component.map(
              (externalComponent) => (
                <div key={externalComponent.external_component_id}>
                  <strong>External Component Id</strong>:{" "}
                  {externalComponent.external_component_id}
                  <strong>External Component Slot Id</strong>:{" "}
                  {externalComponent.external_component_slot_id}
                  <strong>External Component Level</strong>:{" "}
                  {externalComponent.external_component_level}
                  {externalComponent.external_component_additional_stat.map(
                    (additionalStat) => (
                      <div key={additionalStat.additional_stat_name}>
                        <strong>Additional Stat Name</strong>:{" "}
                        {additionalStat.additional_stat_name}
                        <strong>Additional Stat Value</strong>:{" "}
                        {additionalStat.additional_stat_value}
                      </div>
                    )
                  )}
                </div>
              )
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
