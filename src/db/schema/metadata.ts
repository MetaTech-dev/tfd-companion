import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  doublePrecision,
  integer,
} from "drizzle-orm/pg-core"; // Added doublePrecision back

export const metadataDescendant = pgTable("metadata_descendant", {
  descendant_id: varchar("descendant_id").primaryKey(),
  descendant_name: varchar("descendant_name"),
  descendant_image_url: varchar("descendant_image_url"),
});

export const metadataDescendantRelations = relations(
  metadataDescendant,
  ({ many }) => ({
    descendant_stat: many(metadataDescendantStat),
    descendant_skill: many(metadataDescendantSkill),
  })
);

export const metadataDescendantStat = pgTable("metadata_descendant_stat", {
  id: serial("id").primaryKey(),
  metadata_descendant_descendant_id: varchar(
    "metadata_descendant_descendant_id"
  ),
  level: integer("level"), // Changed to integer as it's $int64 in JSON
});

export const metadataDescendantStatRelations = relations(
  metadataDescendantStat,
  ({ one, many }) => ({
    descendant_stat: one(metadataDescendant, {
      fields: [metadataDescendantStat.metadata_descendant_descendant_id],
      references: [metadataDescendant.descendant_id],
    }),
    stat_detail: many(metadataDescendantStatStatDetail),
  })
);

export const metadataDescendantStatStatDetail = pgTable(
  "metadata_descendant_stat_stat_detail",
  {
    id: serial("id").primaryKey(),
    stat_type: varchar("stat_type"),
    stat_value: doublePrecision("stat_value"), // Changed to doublePrecision
    metadata_descendant_stat_id: integer(
      "metadata_descendant_stat_id"
    ).references(() => metadataDescendantStat.id),
  }
);

export const metadataDescendantStatStatDetailRelations = relations(
  metadataDescendantStatStatDetail,
  ({ one }) => ({
    metadata_descendant_stat_detail: one(metadataDescendantStat, {
      fields: [metadataDescendantStatStatDetail.metadata_descendant_stat_id],
      references: [metadataDescendantStat.id],
    }),
  })
);

export const metadataDescendantSkill = pgTable("metadata_descendant_skill", {
  id: serial("id").primaryKey(),
  skill_type: varchar("skill_type"),
  skill_name: varchar("skill_name"),
  element_type: varchar("element_type"),
  arche_type: varchar("arche_type"),
  skill_image_url: varchar("skill_image_url"),
  skill_description: varchar("skill_description"),
  metadata_descendant_descendant_id: varchar(
    "metadata_descendant_descendant_id"
  ),
});

export const metadataDescendantSkillRelations = relations(
  metadataDescendantSkill,
  ({ one, many }) => ({
    metadata_descendant_skill: one(metadataDescendant, {
      fields: [metadataDescendantSkill.metadata_descendant_descendant_id],
      references: [metadataDescendant.descendant_id],
    }),
    skill: many(metadataDescendantSkill),
  })
);

export const metadataWeapon = pgTable("metadata_weapon", {
  weapon_id: varchar("weapon_id").primaryKey(),
  weapon_name: varchar("weapon_name"),
  image_url: varchar("image_url"),
  weapon_type: varchar("weapon_type"),
  weapon_tier: varchar("weapon_tier"),
  weapon_rounds_type: varchar("weapon_rounds_type"),
  weapon_perk_ability_name: varchar("weapon_perk_ability_name"),
  weapon_perk_ability_description: varchar("weapon_perk_ability_description"),
  weapon_perk_ability_image_url: varchar("weapon_perk_ability_image_url"),
});

export const metadataWeaponRelations = relations(
  metadataWeapon,
  ({ many }) => ({
    base_stat: many(metadataWeaponBaseStat),
    firearm_atk: many(metadataWeaponFirearmAtk),
  })
);

export const metadataWeaponBaseStat = pgTable("metadata_weapon_base_stat", {
  id: serial("id").primaryKey(),
  metadata_weapon_weapon_id: varchar("metadata_weapon_weapon_id"),
  stat_id: varchar("stat_id"),
  stat_value: doublePrecision("stat_value"), // Changed to doublePrecision
});

export const metadataWeaponBaseStatRelations = relations(
  metadataWeaponBaseStat,
  ({ one }) => ({
    metadata_weapon_base_stat: one(metadataWeapon, {
      fields: [metadataWeaponBaseStat.metadata_weapon_weapon_id],
      references: [metadataWeapon.weapon_id],
    }),
    stat_name: one(metadataStat, {
      fields: [metadataWeaponBaseStat.stat_id],
      references: [metadataStat.stat_id],
    }),
  })
);

export const metadataWeaponFirearmAtk = pgTable("metadata_weapon_firearm_atk", {
  id: serial("id").primaryKey(),
  level: integer("level"), // Changed to integer as it's $int64 in JSON
  metadata_weapon_weapon_id: varchar("metadata_weapon_weapon_id"),
});

export const metadataWeaponFirearmAtkRelations = relations(
  metadataWeaponFirearmAtk,
  ({ one, many }) => ({
    metadata_weapon_firearm_atk: one(metadataWeapon, {
      fields: [metadataWeaponFirearmAtk.metadata_weapon_weapon_id],
      references: [metadataWeapon.weapon_id],
    }),
    firearm: many(metadataWeaponFirearmAtkFirearm),
  })
);

export const metadataWeaponFirearmAtkFirearm = pgTable(
  "metadata_weapon_firearm_atk_firearm",
  {
    id: serial("id").primaryKey(),
    metadata_weapon_firearm_atk_id: integer("metadata_weapon_firearm_atk_id"),
    firearm_atk_type: varchar("firearm_atk_type"),
    firearm_atk_value: doublePrecision("firearm_atk_value"), // Changed to doublePrecision
  }
);

export const metadataWeaponFirearmAtkFirearmRelations = relations(
  metadataWeaponFirearmAtkFirearm,
  ({ one }) => ({
    metadata_weapon_firearm_atk_firearm: one(metadataWeaponFirearmAtk, {
      fields: [metadataWeaponFirearmAtkFirearm.metadata_weapon_firearm_atk_id],
      references: [metadataWeaponFirearmAtk.id],
    }),
  })
);

export const metadataModule = pgTable("metadata_module", {
  module_id: varchar("module_id").primaryKey(),
  module_name: varchar("module_name"),
  image_url: varchar("image_url"),
  module_type: varchar("module_type"),
  module_tier: varchar("module_tier"),
  module_socket_type: varchar("module_socket_type"),
  module_class: varchar("module_class"),
});

export const metadataModuleRelations = relations(
  metadataModule,
  ({ many }) => ({
    module_stat: many(metadataModuleStat),
  })
);

export const metadataModuleStat = pgTable("metadata_module_stat", {
  id: serial("id").primaryKey(),
  metadata_module_module_id: varchar("metadata_module_module_id"),
  level: integer("level"), // Changed to integer as it's $int64 in JSON
  module_capacity: integer("module_capacity"), // Changed to integer as it's $int64 in JSON
  value: varchar("value"),
});

export const metadataModuleStatRelations = relations(
  metadataModuleStat,
  ({ one }) => ({
    metadata_module_stat: one(metadataModule, {
      fields: [metadataModuleStat.metadata_module_module_id],
      references: [metadataModule.module_id],
    }),
  })
);

export const metadataReactor = pgTable("metadata_reactor", {
  reactor_id: varchar("reactor_id").primaryKey(),
  reactor_name: varchar("reactor_name"),
  image_url: varchar("image_url"),
  reactor_tier: varchar("reactor_tier"),
  optimized_condition_type: varchar("optimized_condition_type"),
});

export const metadataReactorRelations = relations(
  metadataReactor,
  ({ many }) => ({
    reactor_skill_power: many(metadataReactorSkillPower),
  })
);

export const metadataReactorSkillPower = pgTable(
  "metadata_reactor_skill_power",
  {
    id: serial("id").primaryKey(),
    metadata_reactor_reactor_id: varchar("metadata_reactor_reactor_id"),
    level: integer("level"), // Changed to integer as it's $int64 in JSON
    skill_atk_power: doublePrecision("skill_atk_power"), // Changed to doublePrecision
    sub_skill_atk_power: doublePrecision("sub_skill_atk_power"), // Changed to doublePrecision
  }
);

export const metadataReactorSkillPowerRelations = relations(
  metadataReactorSkillPower,
  ({ one, many }) => ({
    metadata_reactor_skill_power: one(metadataReactor, {
      fields: [metadataReactorSkillPower.metadata_reactor_reactor_id],
      references: [metadataReactor.reactor_id],
    }),
    skill_power_coefficient: many(
      metadataReactorSkillPowerSkillPowerCoefficient
    ),
    enchant_effect: many(metadataReactorSkillPowerEnchantEffect),
  })
);

export const metadataReactorSkillPowerSkillPowerCoefficient = pgTable(
  "metadata_reactor_skill_power_skill_power_coefficient",
  {
    id: serial("id").primaryKey(),
    metadata_reactor_skill_power_id: integer("metadata_reactor_skill_power_id"),
    coefficient_stat_id: varchar("coefficient_stat_id"),
    coefficient_stat_value: doublePrecision("coefficient_stat_value"), // Changed to doublePrecision
  }
);

export const metadataReactorSkillPowerSkillPowerCoefficientRelations =
  relations(metadataReactorSkillPowerSkillPowerCoefficient, ({ one }) => ({
    metadata_reactor_skill_power_skill_power_coefficient: one(
      metadataReactorSkillPower,
      {
        fields: [
          metadataReactorSkillPowerSkillPowerCoefficient.metadata_reactor_skill_power_id,
        ],
        references: [metadataReactorSkillPower.id],
      }
    ),
  }));

export const metadataReactorSkillPowerEnchantEffect = pgTable(
  "metadata_reactor_skill_power_enchant_effect",
  {
    id: serial("id").primaryKey(),
    metadata_reactor_skill_power_id: integer("metadata_reactor_skill_power_id"),
    stat_type: varchar("stat_type"),
    value: doublePrecision("value"), // Changed to doublePrecision
  }
);

export const metadataReactorSkillPowerEnchantEffectRelations = relations(
  metadataReactorSkillPowerEnchantEffect,
  ({ one }) => ({
    metadata_reactor_skill_power_enchant_effect: one(
      metadataReactorSkillPower,
      {
        fields: [
          metadataReactorSkillPowerEnchantEffect.metadata_reactor_skill_power_id,
        ],
        references: [metadataReactorSkillPower.id],
      }
    ),
  })
);

export const metadataExternalComponent = pgTable(
  "metadata_external_component",
  {
    external_component_id: varchar("external_component_id").primaryKey(),
    external_component_name: varchar("external_component_name"),
    image_url: varchar("image_url"),
    external_component_equipment_type: varchar(
      "external_component_equipment_type"
    ),
    external_component_tier: varchar("external_component_tier"),
  }
);

export const metadataExternalComponentRelations = relations(
  metadataExternalComponent,
  ({ many }) => ({
    base_stat: many(metadataExternalComponentBaseStat),
    set_option_detail: many(metadataExternalComponentSetOptionDetail),
  })
);

export const metadataExternalComponentBaseStat = pgTable(
  "metadata_external_component_base_stat",
  {
    metadata_external_component_external_component_id: varchar(
      "metadata_external_component_external_component_id"
    ),
    id: serial("id").primaryKey(),
    level: integer("level"), // Changed to integer as it's $int64 in JSON
    stat_id: varchar("stat_id"),
    stat_value: doublePrecision("stat_value"), // Changed to doublePrecision
  }
);

export const metadataExternalComponentBaseStatRelations = relations(
  metadataExternalComponentBaseStat,
  ({ one }) => ({
    metadata_external_component_base_stat: one(metadataExternalComponent, {
      fields: [
        metadataExternalComponentBaseStat.metadata_external_component_external_component_id,
      ],
      references: [metadataExternalComponent.external_component_id],
    }),
    stat_name: one(metadataStat, {
      fields: [metadataExternalComponentBaseStat.stat_id],
      references: [metadataStat.stat_id],
    }),
  })
);

export const metadataExternalComponentSetOptionDetail = pgTable(
  "metadata_external_component_set_option_detail",
  {
    id: serial("id").primaryKey(),
    metadata_external_component_external_component_id: varchar(
      "metadata_external_component_external_component_id"
    ),
    set_option: varchar("set_option"),
    set_count: integer("set_count"), // Changed to integer as it's $int64 in JSON
    set_option_effect: varchar("set_option_effect"),
  }
);

export const metadataExternalComponentSetOptionDetailRelations = relations(
  metadataExternalComponentSetOptionDetail,
  ({ one }) => ({
    metadata_external_component_set_option_detail: one(
      metadataExternalComponent,
      {
        fields: [
          metadataExternalComponentSetOptionDetail.metadata_external_component_external_component_id,
        ],
        references: [metadataExternalComponent.external_component_id],
      }
    ),
  })
);

export const metadataReward = pgTable("metadata_reward", {
  map_id: varchar("map_id").primaryKey(),
  map_name: varchar("map_name"),
});

export const metadataRewardRelations = relations(
  metadataReward,
  ({ many }) => ({
    battle_zone: many(metadataRewardBattleZone),
  })
);

export const metadataRewardBattleZone = pgTable("metadata_reward_battle_zone", {
  battle_zone_id: varchar("battle_zone_id").primaryKey(),
  battle_zone_name: varchar("battle_zone_name"),
  metadata_reward_map_id: varchar("metadata_reward_map_id"),
});

export const metadataRewardBattleZoneRelations = relations(
  metadataRewardBattleZone,
  ({ one, many }) => ({
    metadata_reward_battle_zone: one(metadataReward, {
      fields: [metadataRewardBattleZone.metadata_reward_map_id],
      references: [metadataReward.map_id],
    }),
    reward: many(metadataRewardBattleZoneReward),
  })
);

export const metadataRewardBattleZoneReward = pgTable(
  "metadata_reward_battle_zone_reward",
  {
    id: serial("id").primaryKey(),
    metadata_reward_battle_zone_id: varchar("metadata_reward_battle_zone_id"),
    rotation: integer("rotation"), // Changed to integer as it's $int64 in JSON
    reward_type: varchar("reward_type"),
    reactor_element_type: varchar("reactor_element_type"),
    weapon_rounds_type: varchar("weapon_rounds_type"),
    arche_type: varchar("arche_type"),
  }
);

export const metadataRewardBattleZoneRewardRelations = relations(
  metadataRewardBattleZoneReward,
  ({ one }) => ({
    metadata_reward_battle_zone_reward: one(metadataRewardBattleZone, {
      fields: [metadataRewardBattleZoneReward.metadata_reward_battle_zone_id],
      references: [metadataRewardBattleZone.battle_zone_id],
    }),
  })
);

export const metadataStat = pgTable("metadata_stat", {
  stat_id: varchar("stat_id").primaryKey(),
  stat_name: varchar("stat_name"),
});

export const metadataVoidBattle = pgTable("metadata_void_battle", {
  void_battle_id: varchar("void_battle_id").primaryKey(),
  void_battle_name: varchar("void_battle_name"),
});

export const metadataTitle = pgTable("metadata_title", {
  title_id: varchar("title_id").primaryKey(),
  title_name: varchar("title_name"),
});
