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

  // Create custom indexes
  // const musiciansByCity = {
  //   name: 'musiciansByCity',
  //   source: fql.Collection('Musician'),
  //   terms: [
  //     { field: ['data', 'city'] },
  //   ],
  // };

  // const bandsByCity = {
  //   name: 'bandsByCity',
  //   source: fql.Collection('Band'),
  //   terms: [
  //     { field: ['data', 'city'] },
  //   ],
  // };

  // const musiciansByStyle = {
  //   name: 'musiciansByStyle',
  //   source: fql.Collection('MusicianStyle'),
  //   terms: [
  //     { field: ['data', 'style'] },
  //   ],
  //   values: [
  //     { field: ['data', 'musician'] }
  //   ]
  // };

  // const bandsByStyle = {
  //   name: 'bandsByStyle',
  //   source: fql.Collection('BandStyle'),
  //   terms: [
  //     { field: ['data', 'style'] },
  //   ],
  //   values: [
  //     { field: ['data', 'band'] }
  //   ]
  // };

  // const musicianAdsByStyle = {
  //   name: 'musicianAdsByStyle',
  //   source: fql.Collection('MusicianAdStyle'),
  //   terms: [
  //     { field: ['data', 'style'] },
  //   ],
  //   values: [
  //     { field: ['data', 'musicianAd'] }
  //   ]
  // };

  // const musicianAdsByCity = {
  //   name: 'musicianAdsByCity',
  //   source: fql.Collection('MusicianAd'),
  //   terms: [
  //     { field: ['data', 'city'] },
  //   ]
  // };


  // const bandAdsByStyle = {
  //   name: 'bandAdsByStyle',
  //   source: fql.Collection('BandAdStyle'),
  //   terms: [
  //     { field: ['data', 'style'] },
  //   ],
  //   values: [
  //     { field: ['data', 'bandAd'] }
  //   ]
  // };

  // const bandAdsByCity = {
  //   name: 'bandAdsByCity',
  //   source: fql.Collection('BandAd'),
  //   terms: [
  //     { field: ['data', 'city'] },
  //   ]
  // };

  // console.info('Creating custom indexes...');
  // console.info('Creating custom index musiciansByCity...');
  // await faunaClient.query(
  //   fql.If(
  //     fql.Exists(
  //       fql.Index('musiciansByCity')
  //     ),
  //     fql.Update(
  //       fql.Index('musiciansByCity'),
  //       musiciansByCity
  //     ),
  //     fql.CreateIndex(musiciansByCity)
  //   )
  // );

  // console.info('Creating custom index bandsByCity...');
  // await faunaClient.query(
  //   fql.If(
  //     fql.Exists(
  //       fql.Index('bandsByCity')
  //     ),
  //     fql.Update(
  //       fql.Index('bandsByCity'),
  //       bandsByCity
  //     ),
  //     fql.CreateIndex(bandsByCity)
  //   )
  // );

  // console.info('Creating custom index musiciansByStyle...');
  // await faunaClient.query(
  //   fql.If(
  //     fql.Exists(
  //       fql.Index('musiciansByStyle')
  //     ),
  //     fql.Update(
  //       fql.Index('musiciansByStyle'),
  //       musiciansByStyle
  //     ),
  //     fql.CreateIndex(musiciansByStyle)
  //   )
  // );

  // console.info('Creating custom index bandsByStyle...');

  // await faunaClient.query(
  //   fql.If(
  //     fql.Exists(
  //       fql.Index('bandsByStyle')
  //     ),
  //     fql.Update(
  //       fql.Index('bandsByStyle'),
  //       bandsByStyle
  //     ),
  //     fql.CreateIndex(bandsByStyle)
  //   )
  // );



  // console.info('Creating custom index musicianAdsByStyle...');

  // await faunaClient.query(
  //   fql.If(
  //     fql.Exists(
  //       fql.Index('musicianAdsByStyle')
  //     ),
  //     fql.Update(
  //       fql.Index('musicianAdsByStyle'),
  //       musicianAdsByStyle
  //     ),
  //     fql.CreateIndex(musicianAdsByStyle)
  //   )
  // );

  // console.info('Creating custom index musicianAdsByCity...');

  // await faunaClient.query(
  //   fql.If(
  //     fql.Exists(
  //       fql.Index('musicianAdsByCity')
  //     ),
  //     fql.Update(
  //       fql.Index('musicianAdsByCity'),
  //       musicianAdsByCity
  //     ),
  //     fql.CreateIndex(musicianAdsByCity)
  //   )
  // );

  // console.info('Creating custom index bandAdsByCity...');

  // await faunaClient.query(
  //   fql.If(
  //     fql.Exists(
  //       fql.Index('bandAdsByCity')
  //     ),
  //     fql.Update(
  //       fql.Index('bandAdsByCity'),
  //       bandAdsByCity
  //     ),
  //     fql.CreateIndex(bandAdsByCity)
  //   )
  // );

  // console.info('Creating custom index bandAdsByStyle...');

  // await faunaClient.query(
  //   fql.If(
  //     fql.Exists(
  //       fql.Index('bandAdsByStyle')
  //     ),
  //     fql.Update(
  //       fql.Index('bandAdsByStyle'),
  //       bandAdsByStyle
  //     ),
  //     fql.CreateIndex(bandAdsByStyle)
  //   )
  // );


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
