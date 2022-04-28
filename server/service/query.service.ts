import { CourtauctionSchema } from "../schema/courtauction.schema";
import { QuerySchema } from "../schema/query.schema";

export async function queryHeader(query: QuerySchema): Promise<any> {
  var queryValue: any = {};

  if (query.courtName !== undefined)
    queryValue["info.courtName"] = query.courtName;
  if (query.eventNumber !== undefined)
    queryValue["info.eventNumber"] = query.eventNumber;

  console.log(query.courtName);

  const result = await CourtauctionSchema.find(queryValue);
  const resultJson = JSON.parse(JSON.stringify(result));

  resultJson.forEach((e: any) => {
    delete e['_id'];
    delete e['binfo1'];
    delete e['binfo2'];
    delete e['header'];
    delete e['eve'];
  });

  return resultJson;
}
