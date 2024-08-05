ALTER TABLE "metadata_descendant_skill" ALTER COLUMN "metadata_descendant_descendant_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "metadata_descendant_stat_stat_detail" ALTER COLUMN "stat_value" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "metadata_external_component_base_stat" ALTER COLUMN "stat_value" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "metadata_reactor_skill_power" ALTER COLUMN "skill_atk_power" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "metadata_reactor_skill_power" ALTER COLUMN "sub_skill_atk_power" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "metadata_reactor_skill_power_enchant_effect" ALTER COLUMN "value" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "metadata_reactor_skill_power_skill_power_coefficient" ALTER COLUMN "coefficient_stat_value" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "metadata_weapon_base_stat" ALTER COLUMN "stat_value" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "metadata_weapon_firearm_atk_firearm" ALTER COLUMN "firearm_atk_value" SET DATA TYPE double precision;