export interface MetadataDescendant {
  descendant_id: string; // primary key
  descendant_name: string;
  descendant_image_url: string;
  descendant_stat: MetadataDescendantStat[];
  descendant_skill: MetadataDescendantSkill[];
}

export interface MetadataDescendantStat {
  id?: number; // primary key // appended when added to db
  level: number;
  stat_detail: MetadataDescendantStatStatDetail[];
}

export interface MetadataDescendantStatStatDetail {
  id?: number; // primary key // appended when added to db
  stat_type: string;
  stat_value: number;
}

export interface MetadataDescendantSkill {
  id?: number; // primary key // appended when added to db
  skill_type: string;
  skill_name: string;
  element_type: string;
  arche_type: string;
  skill_image_url: string;
  skill_description: string;
}

export interface MetadataWeapon {
  weapon_id: string; // primary key
  weapon_name: string;
  image_url: string;
  weapon_type: string;
  weapon_tier: string;
  weapon_rounds_type: string;
  base_stat: MetadataWeaponBaseStat[];
  firearm_atk: MetadataWeaponFirearmAtk[];
  weapon_perk_ability_name: string;
  weapon_perk_ability_description: string;
  weapon_perk_ability_image_url: string;
}

export interface MetadataWeaponBaseStat {
  id?: number; // primary key // appended when added to db
  stat_id: string; // relates to MetadataStat.stat_id
  stat_value: number;
}

export interface MetadataWeaponFirearmAtk {
  id?: number; // primary key // appended when added to db
  level: number;
  firearm: MetadataWeaponFirearmAtkFirearm[];
}

export interface MetadataWeaponFirearmAtkFirearm {
  id?: number; // primary key // appended when added to db
  firearm_atk_type: string; // relates to MetadataStat.stat_id
  firearm_atk_value: number;
}

export interface MetadataModule {
  module_id: string; // primary key
  module_name: string;
  image_url: string;
  module_type: string;
  module_tier: string;
  module_socket_type: string;
  module_class: string;
  module_stat: MetadataModuleStat[];
}

export interface MetadataModuleStat {
  id?: number; // primary key // appended when added to db
  level: number;
  module_capacity: number;
  value: string;
}

export interface MetadataReactor {
  reactor_id: string; // primary key
  reactor_name: string;
  image_url: string;
  reactor_tier: string;
  reactor_skill_power: MetadataReactorSkillPower[];
  optimized_condition_type: string;
}

export interface MetadataReactorSkillPower {
  id?: number; // primary key // appended when added to db
  level: number;
  skill_atk_power: number;
  sub_skill_atk_power: number;
  skill_power_coefficient: MetadataReactorSkillPowerSkillPowerCoefficient[];
  enchant_effect: MetadataReactorSkillPowerEnchantEffect[];
}

export interface MetadataReactorSkillPowerSkillPowerCoefficient {
  id?: number; // primary key // appended when added to db
  coefficient_stat_id: string;
  coefficient_stat_value: number;
}

export interface MetadataReactorSkillPowerEnchantEffect {
  id?: number; // primary key // appended when added to db
  enchant_level: number;
  stat_type: string;
  value: number;
}

export interface MetadataExternalComponent {
  external_component_id: string; // primary key
  external_component_name: string;
  image_url: string;
  external_component_equipment_type: string;
  external_component_tier: string;
  base_stat: MetadataExternalComponentBaseStat[];
  set_option_detail: MetadataExternalComponentSetOptionDetail[];
}

export interface MetadataExternalComponentBaseStat {
  id?: number; // primary key // appended when added to db
  level: number;
  stat_id: string; // relates to MetadataStat.stat_id
  stat_value: number;
}

export interface MetadataExternalComponentSetOptionDetail {
  id?: number; // primary key // appended when added to db
  set_option: string;
  set_count: number;
  set_option_effect: string;
}

export interface MetadataReward {
  map_id: string; // primary key
  map_name: string;
  battle_zone: MetadataRewardBattleZone[];
}

export interface MetadataRewardBattleZone {
  battle_zone_id: string; // primary key
  battle_zone_name: string;
  reward: MetadataRewardBattleZoneReward[];
}

export interface MetadataRewardBattleZoneReward {
  id?: number; // primary key // appended when added to db
  rotation: number;
  reward_type: string;
  reactor_element_type: string;
  weapon_rounds_type: string;
  arche_type: string;
}

export interface MetadataStat {
  stat_id: string; // primary key
  stat_name: string;
}

export interface MetadataVoidBattle {
  void_battle_id: string; // primary key
  void_battle_name: string;
}

export interface MetadataTitle {
  title_id: string; // primary key
  title_name: string;
}
