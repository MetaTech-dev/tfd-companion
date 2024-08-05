CREATE TABLE IF NOT EXISTS "metadata_descendant" (
	"descendant_id" varchar PRIMARY KEY NOT NULL,
	"descendant_name" varchar NOT NULL,
	"descendant_image_url" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_descendant_skill" (
	"id" serial PRIMARY KEY NOT NULL,
	"skill_type" varchar NOT NULL,
	"skill_name" varchar NOT NULL,
	"element_type" varchar NOT NULL,
	"arche_type" varchar NOT NULL,
	"skill_image_url" varchar NOT NULL,
	"skill_description" varchar NOT NULL,
	"metadata_descendant_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_descendant_stat" (
	"id" serial PRIMARY KEY NOT NULL,
	"descendant_id" varchar NOT NULL,
	"level" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_descendant_stat_stat_detail" (
	"id" serial PRIMARY KEY NOT NULL,
	"stat_type" varchar NOT NULL,
	"stat_value" integer NOT NULL,
	"metadata_descendant_stat_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_external_component" (
	"external_component_id" varchar PRIMARY KEY NOT NULL,
	"external_component_name" varchar NOT NULL,
	"image_url" varchar NOT NULL,
	"external_component_equipment_type" varchar NOT NULL,
	"external_component_tier" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_external_component_base_stat" (
	"metadata_external_component_id" integer NOT NULL,
	"level" integer NOT NULL,
	"stat_id" varchar PRIMARY KEY NOT NULL,
	"stat_value" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_external_component_set_option_detail" (
	"id" serial PRIMARY KEY NOT NULL,
	"metadata_external_component_id" integer NOT NULL,
	"set_option" varchar NOT NULL,
	"set_count" integer NOT NULL,
	"set_option_effect" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_module" (
	"module_id" varchar PRIMARY KEY NOT NULL,
	"module_name" varchar NOT NULL,
	"image_url" varchar NOT NULL,
	"module_type" varchar NOT NULL,
	"module_tier" varchar NOT NULL,
	"module_socket_type" varchar NOT NULL,
	"module_class" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_module_stat" (
	"id" serial PRIMARY KEY NOT NULL,
	"module_id" varchar NOT NULL,
	"level" integer NOT NULL,
	"module_capacity" integer NOT NULL,
	"value" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_reactor" (
	"reactor_id" varchar PRIMARY KEY NOT NULL,
	"reactor_name" varchar NOT NULL,
	"image_url" varchar NOT NULL,
	"reactor_tier" varchar NOT NULL,
	"optimized_condition_type" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_reactor_skill_power" (
	"id" serial PRIMARY KEY NOT NULL,
	"reactor_id" varchar NOT NULL,
	"level" integer NOT NULL,
	"skill_atk_power" integer NOT NULL,
	"sub_skill_atk_power" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_reactor_skill_power_enchant_effect" (
	"id" serial PRIMARY KEY NOT NULL,
	"metadata_reactor_skill_power_id" integer NOT NULL,
	"stat_type" varchar NOT NULL,
	"value" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_reactor_skill_power_skill_power_coefficient" (
	"id" serial PRIMARY KEY NOT NULL,
	"metadata_reactor_skill_power_id" integer NOT NULL,
	"coefficient_stat_id" varchar NOT NULL,
	"coefficient_stat_value" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_reward" (
	"map_id" varchar PRIMARY KEY NOT NULL,
	"map_name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_reward_battle_zone" (
	"battle_zone_id" varchar PRIMARY KEY NOT NULL,
	"battle_zone_name" varchar NOT NULL,
	"metadata_reward_map_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_reward_battle_zone_reward" (
	"id" serial PRIMARY KEY NOT NULL,
	"metadata_reward_battle_zone_id" integer NOT NULL,
	"rotation" integer NOT NULL,
	"reward_type" varchar NOT NULL,
	"reactor_element_type" varchar NOT NULL,
	"weapon_rounds_type" varchar NOT NULL,
	"arche_type" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_stat" (
	"stat_id" varchar PRIMARY KEY NOT NULL,
	"stat_name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_title" (
	"title_id" varchar PRIMARY KEY NOT NULL,
	"title_name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_void_battle" (
	"void_battle_id" varchar PRIMARY KEY NOT NULL,
	"void_battle_name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_weapon" (
	"weapon_id" varchar PRIMARY KEY NOT NULL,
	"weapon_name" varchar NOT NULL,
	"image_url" varchar NOT NULL,
	"weapon_type" varchar NOT NULL,
	"weapon_tier" varchar NOT NULL,
	"weapon_rounds_type" varchar NOT NULL,
	"weapon_perk_ability_name" varchar NOT NULL,
	"weapon_perk_ability_description" varchar NOT NULL,
	"weapon_perk_ability_image_url" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_weapon_base_stat" (
	"id" serial PRIMARY KEY NOT NULL,
	"metadata_weapon_id" integer NOT NULL,
	"stat_id" varchar NOT NULL,
	"stat_value" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_weapon_firearm_atk" (
	"id" serial PRIMARY KEY NOT NULL,
	"level" integer NOT NULL,
	"metadata_weapon_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_weapon_firearm_atk_firearm" (
	"id" serial PRIMARY KEY NOT NULL,
	"metadata_weapon_firearm_atk_id" integer NOT NULL,
	"firearm_atk_type" varchar NOT NULL,
	"firearm_atk_value" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "metadata_descendant_stat_stat_detail" ADD CONSTRAINT "metadata_descendant_stat_stat_detail_metadata_descendant_stat_id_metadata_descendant_stat_id_fk" FOREIGN KEY ("metadata_descendant_stat_id") REFERENCES "public"."metadata_descendant_stat"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
