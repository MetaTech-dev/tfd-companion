import { NextResponse } from "next/server";
import * as metadataRequests from "@/data-sources/nexon/metadata";
import * as queries from "@/db/queries";
export async function GET() {
  await queries.clearDb();

  const metadataDescendants = await metadataRequests.getMetadataDescendant();
  await queries.upsertManyMetadataDescendant(metadataDescendants);
  console.log("Descendants upserted");
  const metadataWeapons = await metadataRequests.getMetadataWeapon();
  await queries.upsertManyMetadataWeapon(metadataWeapons);
  console.log("Weapons upserted");
  const metadataModules = await metadataRequests.getMetadataModule();
  await queries.upsertManyMetadataModule(metadataModules);
  console.log("Modules upserted");
  const metadataReactors = await metadataRequests.getMetadataReactor();
  await queries.upsertManyMetadataReactor(metadataReactors);
  console.log("Reactors upserted");
  const metadataExternalComponents =
    await metadataRequests.getMetadataExternalComponent();
  await queries.upsertManyMetadataExternalComponent(metadataExternalComponents);
  console.log("External Components upserted");
  const metadataRewards = await metadataRequests.getMetadataReward();
  await queries.upsertManyMetadataReward(metadataRewards);
  console.log("Rewards upserted");
  const metadataStats = await metadataRequests.getMetadataStat();
  await queries.upsertManyMetadataStat(metadataStats);
  console.log("Stats upserted");
  const metadataVoidBattles = await metadataRequests.getMetadataVoidBattle();
  await queries.upsertManyMetadataVoidBattle(metadataVoidBattles);
  console.log("Void Battles upserted");
  const metadataTitles = await metadataRequests.getMetadataTitle();
  await queries.upsertManyMetadataTitle(metadataTitles);
  console.log("Titles upserted");
  return NextResponse.json({ ok: true });
}
