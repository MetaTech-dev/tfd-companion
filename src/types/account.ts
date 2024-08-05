export interface AccountOuid {
  ouid: string;
}

export interface Account {
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

export interface AccountDescendant {
  ouid: string;
  user_name: string;
  descendant_id: string;
  descendant_slot_id: string;
  descendant_level: number;
  module_max_capacity: number;
  module_capacity: number;
  module: AccountDescendantModule[];
}

export interface AccountDescendantModule {
  module_slot_id: string;
  module_id: string;
  module_enchant_level: number;
}

export interface AccountWeapon {
  ouid: string;
  user_name: string;
  weapon: AccountWeaponItem[];
}

export interface AccountWeaponItem {
  module_max_capacity: number;
  module_capacity: number;
  weapon_slot_id: string;
  weapon_id: string;
  weapon_level: number;
  perk_ability_enchant_level: number;
  weapon_additional_stat: AccountWeaponItemAdditionalStat[];
  module: AccountWeaponItemModule[];
}

export interface AccountWeaponItemAdditionalStat {
  additional_stat_name: string;
  additional_stat_value: string;
}

export interface AccountWeaponItemModule {
  module_slot_id: string;
  module_id: string;
  module_enchant_level: number;
}

export interface AccountReactor {
  ouid: string;
  user_name: string;
  reactor_id: string;
  reactor_slot_id: string;
  reactor_level: number;
  reactor_additional_stat: AccountReactorItemAdditionalStat[];
  reactor_enchant_level: number;
}

export interface AccountReactorItemAdditionalStat {
  additional_stat_name: string | number;
  additional_stat_value: string | number;
}

export interface AccountExternalComponent {
  ouid: string;
  user_name: string;
  external_component: AccountExternalComponentItem[];
}

export interface AccountExternalComponentItem {
  external_component_slot_id: string;
  external_component_id: string;
  external_component_level: number;
  external_component_additional_stat: AccountExternalComponentItemAdditionalStat[];
}

export interface AccountExternalComponentItemAdditionalStat {
  additional_stat_name: string | number;
  additional_stat_value: string | number;
}
