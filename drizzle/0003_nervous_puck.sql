ALTER TABLE "metadata_descendant_skill" RENAME COLUMN "metadata_descendant_id" TO "metadata_descendant_descendant_id";--> statement-breakpoint
ALTER TABLE "metadata_descendant_stat" RENAME COLUMN "descendant_id" TO "metadata_descendant_descendant_id";--> statement-breakpoint
ALTER TABLE "metadata_external_component_base_stat" RENAME COLUMN "metadata_external_component_id" TO "metadata_external_component_external_component_id";--> statement-breakpoint
ALTER TABLE "metadata_external_component_set_option_detail" RENAME COLUMN "metadata_external_component_id" TO "metadata_external_component_external_component_id";--> statement-breakpoint
ALTER TABLE "metadata_module_stat" RENAME COLUMN "module_id" TO "metadata_module_module_id";--> statement-breakpoint
ALTER TABLE "metadata_reactor_skill_power" RENAME COLUMN "reactor_id" TO "metadata_reactor_reactor_id";--> statement-breakpoint
ALTER TABLE "metadata_weapon_base_stat" RENAME COLUMN "metadata_weapon_id" TO "metadata_weapon_weapon_id";--> statement-breakpoint
ALTER TABLE "metadata_weapon_firearm_atk" RENAME COLUMN "metadata_weapon_id" TO "metadata_weapon_weapon_id";