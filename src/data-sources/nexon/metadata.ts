import requestNexon, { language_code } from "./requestNexon";

export interface NexonDescendantMetadata {
  descendant_id: string;
  descendant_name: string;
  descendant_image_url: string;
  descendant_stat: NexonDescendantStat[];
  descendant_skill: NexonDescendantSkill[];
}

export interface NexonDescendantStat {
  level: number;
  stat_detail: NexonDescendantStatDetail[];
}

export interface NexonDescendantStatDetail {
  stat_type: string;
  stat_value: number;
}

export interface NexonDescendantSkill {
  skill_type: string;
  skill_name: string;
  element_type: string;
  arche_type: string;
  skill_image_url: string;
  skill_description: string;
}

export async function getDescendantMetadata() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/descendant.json`,
  })) as NexonDescendantMetadata[];
  return data;
}

export interface NexonWeaponMetadata {
  weapon_id: string;
  weapon_name: string;
  image_url: string;
  weapon_type: string;
  weapon_tier: string;
  weapon_rounds_type: string;
  base_stat: NexonWeaponBaseStat[];
  firearm_atk: NexonWeaponFirearmAtk[];
  weapon_perk_ability_name: string;
  weapon_perk_ability_description: string;
  weapon_perk_ability_image_url: string;
}

export interface NexonWeaponBaseStat {
  stat_id: string;
  stat_value: number;
}

export interface NexonWeaponFirearmAtk {
  level: number;
  firearm: NexonWeaponFirearmAtkFirearm[];
}

export interface NexonWeaponFirearmAtkFirearm {
  firearm_atk_type: string;
  firearm_atk_value: number;
}

export async function getWeaponMetadata() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/weapon.json`,
  })) as NexonWeaponMetadata[];
  return data;
}

export interface NexonModuleMetadata {
  module_name: string;
  module_id: string;
  image_url: string;
  module_type: string;
  module_tier: string;
  module_socket_type: string;
  module_class: string;
  module_stat: NexonModuleStat[];
}

export interface NexonModuleStat {
  level: number;
  module_capacity: number;
  value: string;
}

export async function getModuleMetadata() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/module.json`,
  })) as NexonModuleMetadata[];
  return data;
}

export interface NexonReactorMetadata {
  reactor_id: string;
  reactor_name: string;
  image_url: string;
  reactor_tier: string;
  reactor_skill_power: NexonReactorSkillPower[];
  optimized_condition_type: string;
}

export interface NexonReactorSkillPower {
  level: number;
  skill_atk_power: number;
  sub_skill_atk_power: number;
  skill_power_coefficient: NexonReactorSkillPowerSkillPowerCoefficient[];
  enchant_effect: NexonReactorSkillPowerEnchantEffect[];
}

export interface NexonReactorSkillPowerSkillPowerCoefficient {
  coefficient_stat_id: string;
  coefficient_stat_value: number;
}

export interface NexonReactorSkillPowerEnchantEffect {
  enchant_level: number;
  stat_type: string;
  value: number;
}

export async function getReactorMetadata() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/reactor.json`,
  })) as NexonReactorMetadata[];
  return data;
}

export interface NexonExternalComponentMetadata {
  external_component_id: string;
  external_component_name: string;
  image_url: string;
  external_component_equipment_type: string;
  external_component_tier: string;
  base_stat: NexonExternalComponentBaseStat[];
  set_option_detail: NexonExternalComponentSetOptionDetail[];
}

export interface NexonExternalComponentBaseStat {
  level: number;
  stat_id: string;
  stat_value: number;
}

export interface NexonExternalComponentSetOptionDetail {
  set_option: string;
  set_count: number;
  set_option_effect: string;
}

export async function getExternalComponentMetadata() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/external-component.json`,
  })) as NexonExternalComponentMetadata[];
  return data;
}

export interface NexonRewardMetadata {
  map_id: string;
  map_name: string;
  battle_zone: NexonRewardBattleZone[];
}

export interface NexonRewardBattleZone {
  battle_zone_id: string;
  battle_zone_name: string;
  reward: NexonRewardReward[];
}

export interface NexonRewardReward {
  rotation: number;
  reward_type: string;
  reactor_element_type: string;
  weapon_rounds_type: string;
  arche_type: string;
}

export async function getRewardMetadata() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/reward.json`,
  })) as NexonRewardMetadata[];
  return data;
}

export interface NexonStatMetadata {
  stat_id: string;
  stat_name: string;
}

export async function getStatMetadata() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/stat.json`,
  })) as NexonStatMetadata[];
  return data;
}

export interface NexonVoidBattleMetadata {
  void_battle_id: string;
  void_battle_name: string;
}

export async function getVoidBattleMetadata() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/void-battle.json`,
  })) as NexonVoidBattleMetadata[];
  return data;
}

export interface NexonTitleMetadata {
  title_id: string;
  title_name: string;
}

export async function getTitleMetadata() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/title.json`,
  })) as NexonTitleMetadata[];
  return data;
}
