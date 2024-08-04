import requestNexon, { language_code } from "./requestNexon";

export interface NexonAccountId {
  ouid: string;
}

export async function getAccountId(userName: string) {
  const sanitizedUserName = userName.trim();

  const data = (await requestNexon({
    path: `/tfd/v1/id`,
    params: { user_name: sanitizedUserName },
  })) as NexonAccountId;
  console.log("data", data);
  return data.ouid;
}

export interface NexonAccount {
  ouid: string;
  user_name: string;
  platform_type: string;
  mastery_rank_level: number;
  mastery_rank_exp: number;
  title_prefix_id: string;
  title_suffix_id: string;
  os_language: string;
  game_language: string;
}

export async function getAccount(ouid: string) {
  const data = (await requestNexon({
    path: `/tfd/v1/user/basic`,
    params: { ouid },
  })) as NexonAccount;
  return data;
}

export interface NexonAccountDescendant {
  ouid: string;
  user_name: string;
  descendant_id: string;
  descendant_slot_id: string;
  descendant_level: number;
  module_max_capacity: number;
  module_capacity: number;
  module: NexonAccountDescendantModule[];
}

export interface NexonAccountDescendantModule {
  module_slot_id: string;
  module_id: string;
  module_enchant_level: number;
}

export async function getAccountDescendant(ouid: string) {
  const data = (await requestNexon({
    path: `/tfd/v1/user/descendant`,
    params: { ouid },
  })) as NexonAccountDescendant;
  return data;
}

export interface NexonAccountWeapon {
  ouid: string;
  user_name: string;
  weapon: NexonAccountWeaponItem[];
}

export interface NexonAccountWeaponItem {
  module_max_capacity: number;
  module_capacity: number;
  weapon_slot_id: string;
  weapon_id: string;
  weapon_level: number;
  perk_ability_enchant_level: number;
  weapon_additional_stat: NexonAccountWeaponItemAdditionalStat[];
  module: NexonAccountWeaponItemModule[];
}

export interface NexonAccountWeaponItemAdditionalStat {
  additional_stat_name: string;
  additional_stat_value: string;
}

export interface NexonAccountWeaponItemModule {
  module_slot_id: string;
  module_id: string;
  module_enchant_level: number;
}

export async function getAccountWeapon(ouid: string) {
  const data = (await requestNexon({
    path: `/tfd/v1/user/weapon`,
    params: { ouid, language_code },
  })) as NexonAccountWeapon;
  return data;
}

export interface NexonAccountReactor {
  ouid: string;
  user_name: string;
  reactor_id: string;
  reactor_slot_id: string;
  reactor_level: number;
  reactor_additional_stat: NexonAccountReactorItemAdditionalStat[];
  reactor_enchant_level: number;
}

export interface NexonAccountReactorItemAdditionalStat {
  additional_stat_name: string | number;
  additional_stat_value: string | number;
}

export async function getAccountReactor(ouid: string) {
  const data = (await requestNexon({
    path: `/tfd/v1/user/reactor`,
    params: { ouid, language_code },
  })) as NexonAccountReactor;
  return data;
}

export interface NexonAccountExternalComponent {
  ouid: string;
  user_name: string;
  external_component: NexonAccountExternalComponentItem[];
}

export interface NexonAccountExternalComponentItem {
  external_component_slot_id: string;
  external_component_id: string;
  external_component_level: number;
  external_component_additional_stat: NexonAccountExternalComponentItemAdditionalStat[];
}

export interface NexonAccountExternalComponentItemAdditionalStat {
  additional_stat_name: string | number;
  additional_stat_value: string | number;
}

export async function getAccountExternalComponent(ouid: string) {
  const data = (await requestNexon({
    path: `/tfd/v1/user/external-component`,
    params: { ouid, language_code },
  })) as NexonAccountExternalComponent;
  return data;
}
