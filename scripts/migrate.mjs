import fs from 'fs';
import fetch from 'node-fetch';
import faunaClient from './fauna-client.mjs';
import faunadb from 'faunadb';
const fql = faunadb.query;

const {
  FAUNA_GRAPHQL_DOMAIN,
  FAUNA_HTTPS,
  FAUNA_SECRET,
} = process.env;

// This script migrates the database schema to the database server
const run = async () =>
{
  // Establish connection with database
  console.info('Connecting to database...');

  console.info('Migrating schema...');
  // Read the schema from the .graphql file
  const stream = fs.createReadStream('schema.graphql');
  // Import schema into Fauna GraphQL
  await fetch(`http${FAUNA_HTTPS === true ? 's' : ''}://${FAUNA_GRAPHQL_DOMAIN}/import`, {
    method: 'POST',
    body: stream,
    headers: {
      'Authorization': `Bearer ${FAUNA_SECRET}`,
      'Content-Type': 'application/octet-stream',
    }
  });

  // Create custom resolvers
  console.info('Creating custom resolvers...');

  console.info('Creating custom resolver musicianByUserId...');

  await faunaClient.query(
    fql.Update(
      fql.Function('musicianByUserId'),
      {
        body: fql.Query(
          fql.Lambda(
            "userId",
            fql.Let(
              {
                array: fql.Map(
                  fql.Paginate(
                    fql.Match(fql.Index("musician_by_userId"), [
                      fql.Ref(fql.Collection("User"), fql.Var("userId")),
                    ])
                  ),
                  fql.Lambda("ref", fql.Get(fql.Var("ref")))
                ),
              },
              fql.If(fql.IsEmpty(fql.Var("array")), null, fql.Select(["data", 0], fql.Var("array")))
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver userAdminByBandId...');

  await faunaClient.query(
    fql.Update(
      fql.Function('userAdminByBandId'),
      {
        body: fql.Query(
          fql.Lambda(
            ["bandId"],
            fql.Let(
              { band: fql.Get(fql.Ref(fql.Collection("Band"), fql.Var("bandId"))) },
              fql.Select(["data", "admin"], fql.Var("band"))
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver musicianAdminByBandId...');

  await faunaClient.query(
    fql.Update(
      fql.Function('musicianAdminByBandId'),
      {
        body: fql.Query(
          fql.Lambda(
            ["bandId"],
            fql.Let(
              {
                user: fql.Call(fql.Function("userAdminByBandId"), fql.Var("bandId")),
                musician: fql.Map(
                  fql.Paginate(fql.Match(fql.Index("musician_by_userId"), fql.Var("user"))),
                  fql.Lambda("ref", fql.Get(fql.Var("ref")))
                ),
              },
              fql.If(fql.IsEmpty(fql.Var("musician")), null, fql.Select(["data", 0], fql.Var("musician")))
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver bandMembersByBandId...');

  await faunaClient.query(
    fql.Update(
      fql.Function('bandMembersByBandId'),
      {
        body: fql.Query(
          fql.Lambda(
            ["bandId", "size", "after", "before"],
            fql.Let(
              {
                array: fql.Map(
                  fql.Paginate(
                    fql.Match(
                      fql.Index("band_members_by_band"),
                      [
                        fql.Ref(fql.Collection("Band"), fql.Var("bandId"))
                      ]
                    )
                  ),
                  fql.Lambda("ref", fql.Get(fql.Var("ref")))
                )
              },
              fql.If(
                fql.IsEmpty(fql.Var("array")),
                null,
                fql.Var('array')
              )
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver bandsByStyleId...');

  await faunaClient.query(
    fql.Update(
      fql.Function('bandsByStyleId'),
      {
        body: fql.Query(
          fql.Lambda(
            ["styleId", "size", "after", "before"],
            fql.Let(
              {
                array: fql.Map(
                  fql.Paginate(
                    fql.Match(
                      fql.Index("bands_by_style"),
                      [
                        fql.Ref(fql.Collection("Style"), fql.Var("styleId"))
                      ]
                    )
                  ),
                  fql.Lambda("ref", fql.Get(fql.Var("ref")))
                )
              },
              fql.If(
                fql.IsEmpty(fql.Var("array")),
                null,
                fql.Var('array')
              )
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver musiciansByStyleId...');

  await faunaClient.query(
    fql.Update(
      fql.Function('musiciansByStyleId'),
      {
        body: fql.Query(
          fql.Lambda(
            ["styleId", "size", "after", "before"],
            fql.Let(
              {
                array: fql.Map(
                  fql.Paginate(
                    fql.Match(
                      fql.Index("musicians_by_style"),
                      [
                        fql.Ref(fql.Collection("Style"), fql.Var("styleId"))
                      ]
                    )
                  ),
                  fql.Lambda("ref", fql.Get(fql.Var("ref")))
                )
              },
              fql.If(
                fql.IsEmpty(fql.Var("array")),
                null,
                fql.Var('array')
              )
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver bandsByCity...');

  await faunaClient.query(
    fql.Update(
      fql.Function('bandsByCity'),
      {
        body: fql.Query(
          fql.Lambda(
            ["city", "size", "after", "before"],
            fql.Let(
              {
                array: fql.Map(
                  fql.Paginate(
                    fql.Match(
                      fql.Index("bands_by_city"), fql.Var("city")
                    )
                  ),
                  fql.Lambda("ref", fql.Get(fql.Var("ref")))
                )
              },
              fql.If(
                fql.IsEmpty(fql.Var("array")),
                null,
                fql.Var('array')
              )
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver musiciansByCity...');

  await faunaClient.query(
    fql.Update(
      fql.Function('musiciansByCity'),
      {
        body: fql.Query(
          fql.Lambda(
            ["city", "size", "after", "before"],
            fql.Let(
              {
                array: fql.Map(
                  fql.Paginate(
                    fql.Match(
                      fql.Index("musicians_by_city"), fql.Var("city")
                    )
                  ),
                  fql.Lambda("ref", fql.Get(fql.Var("ref")))
                )
              },
              fql.If(
                fql.IsEmpty(fql.Var("array")),
                null,
                fql.Var('array')
              )
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver musicianAdsByCity...');

  await faunaClient.query(
    fql.Update(
      fql.Function('musicianAdsByCity'),
      {
        body: fql.Query(
          fql.Lambda(
            ["city", "size", "after", "before"],
            fql.Let(
              {
                array: fql.Map(
                  fql.Paginate(
                    fql.Match(
                      fql.Index("musicianAds_by_city"), fql.Var("city")
                    )
                  ),
                  fql.Lambda("ref", fql.Get(fql.Var("ref")))
                )
              },
              fql.If(
                fql.IsEmpty(fql.Var("array")),
                null,
                fql.Var('array')
              )
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver bandAdsByCity...');

  await faunaClient.query(
    fql.Update(
      fql.Function('bandAdsByCity'),
      {
        body: fql.Query(
          fql.Lambda(
            ["city", "size", "after", "before"],
            fql.Let(
              {
                array: fql.Map(
                  fql.Paginate(
                    fql.Match(
                      fql.Index("bandAds_by_city"), fql.Var("city")
                    )
                  ),
                  fql.Lambda("ref", fql.Get(fql.Var("ref")))
                )
              },
              fql.If(
                fql.IsEmpty(fql.Var("array")),
                null,
                fql.Var('array')
              )
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver musicianAdsByStyleId...');

  await faunaClient.query(
    fql.Update(
      fql.Function('musicianAdsByStyleId'),
      {
        body: fql.Query(
          fql.Lambda(
            ["styleId", "size", "after", "before"],
            fql.Let(
              {
                array: fql.Map(
                  fql.Paginate(
                    fql.Match(
                      fql.Index("musicianAds_by_style"),
                      [
                        fql.Ref(fql.Collection("Style"), fql.Var("styleId"))
                      ]
                    )
                  ),
                  fql.Lambda("ref", fql.Get(fql.Var("ref")))
                )
              },
              fql.If(
                fql.IsEmpty(fql.Var("array")),
                null,
                fql.Var('array')
              )
            )
          )
        )
      }
    )
  );

  console.info('Creating custom resolver bandAdsByStyleId...');

  await faunaClient.query(
    fql.Update(
      fql.Function('bandAdsByStyleId'),
      {
        body: fql.Query(
          fql.Lambda(
            ["styleId", "size", "after", "before"],
            fql.Let(
              {
                array: fql.Map(
                  fql.Paginate(
                    fql.Match(
                      fql.Index("bandAds_by_style"),
                      [
                        fql.Ref(fql.Collection("Style"), fql.Var("styleId"))
                      ]
                    )
                  ),
                  fql.Lambda("ref", fql.Get(fql.Var("ref")))
                )
              },
              fql.If(
                fql.IsEmpty(fql.Var("array")),
                null,
                fql.Var('array')
              )
            )
          )
        )
      }
    )
  );
};

// Run main process
run().catch((err) =>
{
  console.error(err);
  process.exit(1);
});
