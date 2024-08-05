import db from "@/db";
import * as MetadataTypes from "@/types/metadata";
import * as MetadataSchema from "@/db/schema/metadata";
import { forEachLimit } from "async";

export const upsertManyMetadataDescendant = async (
  metadataDescendants: MetadataTypes.MetadataDescendant[]
) => {
  forEachLimit(metadataDescendants, 1, async (metadataDescendant) => {
    await db.insert(MetadataSchema.metadataDescendant).values({
      descendant_id: metadataDescendant.descendant_id,
      descendant_name: metadataDescendant.descendant_name,
      descendant_image_url: metadataDescendant.descendant_image_url,
    });
    // .onConflictDoUpdate({
    //   target: MetadataSchema.metadataDescendant.descendant_id,
    //   set: {
    //     descendant_name: metadataDescendant.descendant_name,
    //     descendant_image_url: metadataDescendant.descendant_image_url,
    //   },
    // });

    forEachLimit(
      metadataDescendant.descendant_stat,
      1,
      async (metadataDescendantStat) => {
        const newDescendantStats = await db
          .insert(MetadataSchema.metadataDescendantStat)
          .values({
            metadata_descendant_descendant_id: metadataDescendant.descendant_id,
            level: metadataDescendantStat.level,
          })
          // .onConflictDoUpdate({
          //   target:
          //     MetadataSchema.metadataDescendantStat
          //       .metadata_descendant_descendant_id,
          //   set: {
          //     level: metadataDescendantStat.level,
          //   },
          // })
          .returning();

        forEachLimit(
          metadataDescendantStat.stat_detail,
          1,
          async (statDetail) => {
            const newDescendantStat = newDescendantStats.find(
              (newDescendantStat) =>
                newDescendantStat.level === metadataDescendantStat.level
            );
            if (newDescendantStat) {
              await db
                .insert(MetadataSchema.metadataDescendantStatStatDetail)
                .values({
                  metadata_descendant_stat_id: newDescendantStat.id,
                  stat_type: statDetail.stat_type,
                  stat_value: statDetail.stat_value,
                })
                // .onConflictDoUpdate({
                //   target:
                //     MetadataSchema.metadataDescendantStatStatDetail
                //       .metadata_descendant_stat_id,
                //   set: {
                //     stat_type: statDetail.stat_type,
                //     stat_value: statDetail.stat_value,
                //   },
                // })
                .returning();
            }
          }
        );
      }
    );

    forEachLimit(metadataDescendant.descendant_skill, 1, async (skill) => {
      const newDescendantSkill = await db
        .insert(MetadataSchema.metadataDescendantSkill)
        .values({
          skill_type: skill.skill_type,
          skill_name: skill.skill_name,
          element_type: skill.element_type,
          arche_type: skill.arche_type,
          skill_image_url: skill.skill_image_url,
          skill_description: skill.skill_description,
        })
        // .onConflictDoUpdate({
        //   target: MetadataSchema.metadataDescendantSkill.skill_type,
        //   set: {
        //     skill_name: skill.skill_name,
        //     element_type: skill.element_type,
        //     arche_type: skill.arche_type,
        //     skill_image_url: skill.skill_image_url,
        //     skill_description: skill.skill_description,
        //   },
        // })
        .returning();
    });
  });
};

export const upsertManyMetadataWeapon = async (
  metadataWeapons: MetadataTypes.MetadataWeapon[]
) => {
  forEachLimit(metadataWeapons, 1, async (metadataWeapon) => {
    await db.insert(MetadataSchema.metadataWeapon).values({
      weapon_id: metadataWeapon.weapon_id,
      weapon_name: metadataWeapon.weapon_name,
      image_url: metadataWeapon.image_url,
      weapon_type: metadataWeapon.weapon_type,
      weapon_tier: metadataWeapon.weapon_tier,
      weapon_rounds_type: metadataWeapon.weapon_rounds_type,
      weapon_perk_ability_name: metadataWeapon.weapon_perk_ability_name,
      weapon_perk_ability_description:
        metadataWeapon.weapon_perk_ability_description,
      weapon_perk_ability_image_url:
        metadataWeapon.weapon_perk_ability_image_url,
    });
    // .onConflictDoUpdate({
    //   target: MetadataSchema.metadataWeapon.weapon_id,
    //   set: {
    //     weapon_name: metadataWeapon.weapon_name,
    //     image_url: metadataWeapon.image_url,
    //     weapon_type: metadataWeapon.weapon_type,
    //     weapon_tier: metadataWeapon.weapon_tier,
    //     weapon_rounds_type: metadataWeapon.weapon_rounds_type,
    //     weapon_perk_ability_name: metadataWeapon.weapon_perk_ability_name,
    //     weapon_perk_ability_description:
    //       metadataWeapon.weapon_perk_ability_description,
    //     weapon_perk_ability_image_url:
    //       metadataWeapon.weapon_perk_ability_image_url,
    //   },
    // });

    forEachLimit(metadataWeapon.base_stat, 1, async (baseStat) => {
      const newBaseStat = await db
        .insert(MetadataSchema.metadataWeaponBaseStat)
        .values({
          metadata_weapon_weapon_id: metadataWeapon.weapon_id,
          stat_id: baseStat.stat_id,
          stat_value: baseStat.stat_value,
        })
        // .onConflictDoUpdate({
        //   target:
        //     MetadataSchema.metadataWeaponBaseStat.metadata_weapon_weapon_id,
        //   set: {
        //     stat_id: baseStat.stat_id,
        //     stat_value: baseStat.stat_value,
        //   },
        // })
        .returning();
    });

    forEachLimit(metadataWeapon.firearm_atk, 1, async (firearmAtk) => {
      const newFirearmAtks = await db
        .insert(MetadataSchema.metadataWeaponFirearmAtk)
        .values({
          metadata_weapon_weapon_id: metadataWeapon.weapon_id,
          level: firearmAtk.level,
        })
        // .onConflictDoUpdate({
        //   target:
        //     MetadataSchema.metadataWeaponFirearmAtk.metadata_weapon_weapon_id,
        //   set: {
        //     level: firearmAtk.level,
        //   },
        // })
        .returning();

      forEachLimit(firearmAtk.firearm, 1, async (firearm, index) => {
        const newFirearmAtk = newFirearmAtks.find(
          (newFirearmAtk) => newFirearmAtk.level === firearmAtk.level
        );
        if (newFirearmAtk) {
          await db
            .insert(MetadataSchema.metadataWeaponFirearmAtkFirearm)
            .values({
              metadata_weapon_firearm_atk_id: newFirearmAtk.id,
              firearm_atk_type: firearm.firearm_atk_type,
              firearm_atk_value: firearm.firearm_atk_value,
            })
            // .onConflictDoUpdate({
            //   target:
            //     MetadataSchema.metadataWeaponFirearmAtkFirearm
            //       .metadata_weapon_firearm_atk_id,
            //   set: {
            //     firearm_atk_type: firearm.firearm_atk_type,
            //     firearm_atk_value: firearm.firearm_atk_value,
            //   },
            // })
            .returning();
        } else {
          console.log(
            "No newFirearmAtk found for firearmAtk",
            firearmAtk,
            index
          );
        }
      });
    });
  });
};

export const upsertManyMetadataModule = async (
  metadataModules: MetadataTypes.MetadataModule[]
) => {
  forEachLimit(metadataModules, 1, async (metadataModule) => {
    await db.insert(MetadataSchema.metadataModule).values({
      module_id: metadataModule.module_id,
      module_name: metadataModule.module_name,
      image_url: metadataModule.image_url,
      module_type: metadataModule.module_type,
      module_tier: metadataModule.module_tier,
      module_socket_type: metadataModule.module_socket_type,
      module_class: metadataModule.module_class,
    });
    // .onConflictDoUpdate({
    //   target: MetadataSchema.metadataModule.module_id,
    //   set: {
    //     module_name: metadataModule.module_name,
    //     image_url: metadataModule.image_url,
    //     module_type: metadataModule.module_type,
    //     module_tier: metadataModule.module_tier,
    //     module_socket_type: metadataModule.module_socket_type,
    //     module_class: metadataModule.module_class,
    //   },
    // });

    forEachLimit(metadataModule.module_stat, 1, async (moduleStat) => {
      const newModuleStat = await db
        .insert(MetadataSchema.metadataModuleStat)
        .values({
          metadata_module_module_id: metadataModule.module_id,
          level: moduleStat.level,
          module_capacity: moduleStat.module_capacity,
          value: moduleStat.value,
        })
        // .onConflictDoUpdate({
        //   target: MetadataSchema.metadataModuleStat.metadata_module_module_id,
        //   set: {
        //     level: moduleStat.level,
        //     module_capacity: moduleStat.module_capacity,
        //     value: moduleStat.value,
        //   },
        // })
        .returning();
    });
  });
};

export const upsertManyMetadataReactor = async (
  metadataReactors: MetadataTypes.MetadataReactor[]
) => {
  forEachLimit(metadataReactors, 1, async (metadataReactor) => {
    await db.insert(MetadataSchema.metadataReactor).values({
      reactor_id: metadataReactor.reactor_id,
      reactor_name: metadataReactor.reactor_name,
      image_url: metadataReactor.image_url,
      reactor_tier: metadataReactor.reactor_tier,
      optimized_condition_type: metadataReactor.optimized_condition_type,
    });
    // .onConflictDoUpdate({
    //   target: MetadataSchema.metadataReactor.reactor_id,
    //   set: {
    //     reactor_name: metadataReactor.reactor_name,
    //     image_url: metadataReactor.image_url,
    //     reactor_tier: metadataReactor.reactor_tier,
    //     optimized_condition_type: metadataReactor.optimized_condition_type,
    //   },
    // });

    forEachLimit(
      metadataReactor.reactor_skill_power,
      1,
      async (reactorSkillPower) => {
        const newReactorSkillPowers = await db
          .insert(MetadataSchema.metadataReactorSkillPower)
          .values({
            metadata_reactor_reactor_id: metadataReactor.reactor_id,
            level: reactorSkillPower.level,
            skill_atk_power: reactorSkillPower.skill_atk_power,
            sub_skill_atk_power: reactorSkillPower.sub_skill_atk_power,
          })
          // .onConflictDoUpdate({
          //   target:
          //     MetadataSchema.metadataReactorSkillPower
          //       .metadata_reactor_reactor_id,
          //   set: {
          //     level: reactorSkillPower.level,
          //     skill_atk_power: reactorSkillPower.skill_atk_power,
          //     sub_skill_atk_power: reactorSkillPower.sub_skill_atk_power,
          //   },
          // })
          .returning();

        forEachLimit(
          reactorSkillPower.skill_power_coefficient,
          1,
          async (skillPowerCoefficient) => {
            const newReactorSkillPower = newReactorSkillPowers.find(
              (newReactorSkillPower) =>
                newReactorSkillPower.level === reactorSkillPower.level
            );
            if (newReactorSkillPower) {
              await db
                .insert(
                  MetadataSchema.metadataReactorSkillPowerSkillPowerCoefficient
                )
                .values({
                  metadata_reactor_skill_power_id: newReactorSkillPower.id,
                  coefficient_stat_id:
                    skillPowerCoefficient.coefficient_stat_id,
                  coefficient_stat_value:
                    skillPowerCoefficient.coefficient_stat_value,
                })
                // .onConflictDoUpdate({
                //   target:
                //     MetadataSchema.metadataReactorSkillPowerSkillPowerCoefficient
                //       .metadata_reactor_skill_power_id,
                //   set: {
                //     coefficient_stat_id:
                //       skillPowerCoefficient.coefficient_stat_id,
                //     coefficient_stat_value:
                //       skillPowerCoefficient.coefficient_stat_value,
                //   },
                // })
                .returning();
            } else {
              console.log(
                "No newReactorSkillPower found for skillPowerCoefficient",
                skillPowerCoefficient
              );
            }

            forEachLimit(
              reactorSkillPower.enchant_effect,
              1,
              async (enchantEffect) => {
                const newReactorSkillPower = newReactorSkillPowers.find(
                  (newReactorSkillPower) =>
                    newReactorSkillPower.level === reactorSkillPower.level
                );
                if (newReactorSkillPower) {
                  await db
                    .insert(
                      MetadataSchema.metadataReactorSkillPowerEnchantEffect
                    )
                    .values({
                      metadata_reactor_skill_power_id: newReactorSkillPower.id,
                      stat_type: enchantEffect.stat_type,
                      value: enchantEffect.value,
                    })
                    // .onConflictDoUpdate({
                    //   target:
                    //     MetadataSchema.metadataReactorSkillPowerEnchantEffect
                    //       .metadata_reactor_skill_power_id,
                    //   set: {
                    //     stat_type: enchantEffect.stat_type,
                    //     value: enchantEffect.value,
                    //   },
                    // })
                    .returning();
                } else {
                  console.log(
                    "No newReactorSkillPower found for enchantEffect",
                    enchantEffect
                  );
                }
              }
            );
          }
        );
      }
    );
  });
};

export const upsertManyMetadataExternalComponent = async (
  metadataExternalComponents: MetadataTypes.MetadataExternalComponent[]
) => {
  forEachLimit(
    metadataExternalComponents,
    1,
    async (metadataExternalComponent) => {
      await db.insert(MetadataSchema.metadataExternalComponent).values({
        external_component_id: metadataExternalComponent.external_component_id,
        external_component_name:
          metadataExternalComponent.external_component_name,
        image_url: metadataExternalComponent.image_url,
        external_component_equipment_type:
          metadataExternalComponent.external_component_equipment_type,
        external_component_tier:
          metadataExternalComponent.external_component_tier,
      });
      // .onConflictDoUpdate({
      //   target: MetadataSchema.metadataExternalComponent.external_component_id,
      //   set: {
      //     external_component_name:
      //       metadataExternalComponent.external_component_name,
      //     image_url: metadataExternalComponent.image_url,
      //     external_component_equipment_type:
      //       metadataExternalComponent.external_component_equipment_type,
      //     external_component_tier:
      //       metadataExternalComponent.external_component_tier,
      //   },
      // });

      forEachLimit(metadataExternalComponent.base_stat, 1, async (baseStat) => {
        const newBaseStat = await db
          .insert(MetadataSchema.metadataExternalComponentBaseStat)
          .values({
            metadata_external_component_external_component_id:
              metadataExternalComponent.external_component_id,
            stat_id: baseStat.stat_id,
            level: baseStat.level,
            stat_value: baseStat.stat_value,
          })
          // .onConflictDoUpdate({
          //   target:
          //     MetadataSchema.metadataExternalComponentBaseStat
          //       .metadata_external_component_external_component_id,
          //   set: {
          //     stat_id: baseStat.stat_id,
          //     level: baseStat.level,
          //     stat_value: baseStat.stat_value,
          //   },
          // })
          .returning();
      });

      forEachLimit(
        metadataExternalComponent.set_option_detail,
        1,
        async (setOptionDetail) => {
          const newSetOptionDetail = await db
            .insert(MetadataSchema.metadataExternalComponentSetOptionDetail)
            .values({
              metadata_external_component_external_component_id:
                metadataExternalComponent.external_component_id,
              set_option: setOptionDetail.set_option,
              set_count: setOptionDetail.set_count,
              set_option_effect: setOptionDetail.set_option_effect,
            })
            // .onConflictDoUpdate({
            //   target:
            //     MetadataSchema.metadataExternalComponentSetOptionDetail
            //       .metadata_external_component_external_component_id,
            //   set: {
            //     set_option: setOptionDetail.set_option,
            //     set_count: setOptionDetail.set_count,
            //     set_option_effect: setOptionDetail.set_option_effect,
            //   },
            // })
            .returning();
        }
      );
    }
  );
};

export const upsertManyMetadataReward = async (
  metadataRewards: MetadataTypes.MetadataReward[]
) => {
  forEachLimit(metadataRewards, 1, async (metadataReward) => {
    await db.insert(MetadataSchema.metadataReward).values({
      map_id: metadataReward.map_id,
      map_name: metadataReward.map_name,
    });
    // .onConflictDoUpdate({
    //   target: MetadataSchema.metadataReward.map_id,
    //   set: {
    //     map_name: metadataReward.map_name,
    //   },
    // });

    forEachLimit(metadataReward.battle_zone, 1, async (battleZone, index) => {
      const newBattleZone = await db
        .insert(MetadataSchema.metadataRewardBattleZone)
        .values({
          battle_zone_id: battleZone.battle_zone_id,
          battle_zone_name: battleZone.battle_zone_name,
          metadata_reward_map_id: metadataReward.map_id,
        })
        // .onConflictDoUpdate({
        //   target: MetadataSchema.metadataRewardBattleZone.battle_zone_id,
        //   set: {
        //     battle_zone_name: battleZone.battle_zone_name,
        //     metadata_reward_map_id: metadataReward.map_id,
        //   },
        // })
        .returning();

      forEachLimit(battleZone.reward, 1, async (reward, index) => {
        const newBattleZoneReward = await db
          .insert(MetadataSchema.metadataRewardBattleZoneReward)
          .values({
            metadata_reward_battle_zone_id: newBattleZone[0].battle_zone_id,
            rotation: reward.rotation,
            reward_type: reward.reward_type,
            reactor_element_type: reward.reactor_element_type,
            weapon_rounds_type: reward.weapon_rounds_type,
            arche_type: reward.arche_type,
          })
          // .onConflictDoUpdate({
          //   target:
          //     MetadataSchema.metadataRewardBattleZoneReward
          //       .metadata_reward_battle_zone_id,
          //   set: {
          //     rotation: reward.rotation,
          //     reward_type: reward.reward_type,
          //     reactor_element_type: reward.reactor_element_type,
          //     weapon_rounds_type: reward.weapon_rounds_type,
          //     arche_type: reward.arche_type,
          //   },
          // })
          .returning();
      });
    });
  });
};

export const upsertManyMetadataStat = async (
  metadataStats: MetadataTypes.MetadataStat[]
) => {
  forEachLimit(metadataStats, 1, async (metadataStat, index) => {
    await db.insert(MetadataSchema.metadataStat).values({
      stat_id: metadataStat.stat_id,
      stat_name: metadataStat.stat_name,
    });
    // .onConflictDoUpdate({
    //   target: MetadataSchema.metadataStat.stat_id,
    //   set: {
    //     stat_name: metadataStat.stat_name,
    //   },
    // });
  });
};

export const upsertManyMetadataVoidBattle = async (
  metadataVoidBattles: MetadataTypes.MetadataVoidBattle[]
) => {
  forEachLimit(metadataVoidBattles, 1, async (metadataVoidBattle, index) => {
    await db.insert(MetadataSchema.metadataVoidBattle).values({
      void_battle_id: metadataVoidBattle.void_battle_id,
      void_battle_name: metadataVoidBattle.void_battle_name,
    });
    // .onConflictDoUpdate({
    //   target: MetadataSchema.metadataVoidBattle.void_battle_id,
    //   set: {
    //     void_battle_name: metadataVoidBattle.void_battle_name,
    //   },
    // });
  });
};

export const upsertManyMetadataTitle = async (
  metadataTitles: MetadataTypes.MetadataTitle[]
) => {
  forEachLimit(metadataTitles, 1, async (metadataTitle, index) => {
    await db.insert(MetadataSchema.metadataTitle).values({
      title_id: metadataTitle.title_id,
      title_name: metadataTitle.title_name,
    });
    // .onConflictDoUpdate({
    //   target: MetadataSchema.metadataTitle.title_id,
    //   set: {
    //     title_name: metadataTitle.title_name,
    //   },
    // });
  });
};
