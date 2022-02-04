import fs from 'fs';
import fetch from 'node-fetch';
import faunaClient from './fauna-client.mjs';
import faunadb from 'faunadb';
import { serialize } from 'v8';
const fql = faunadb.query;

const {
  VITE_FAUNA_GRAPHQL_DOMAIN,
  VITE_FAUNA_HTTPS,
  VITE_FAUNA_SECRET,
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
  await fetch(`http${VITE_FAUNA_HTTPS === true ? 's' : ''}://${VITE_FAUNA_GRAPHQL_DOMAIN}/import`, {
    method: 'POST',
    body: stream,
    headers: {
      'Authorization': `Bearer ${VITE_FAUNA_SECRET}`,
      'Content-Type': 'application/octet-stream',
    }
  });

  // Create custom indexes
  const musicianByUserId = {
    name: 'musician_by_userId',
    source: fql.Collection('Musician'),
    terms: [
      { field: ['data', 'user'] },
    ],
  };

  const musiciansByCity = {
    name: 'musicians_by_city',
    source: fql.Collection('Musician'),
    terms: [
      { field: ['data', 'city'] },
    ],
  };

  const bandsByCity = {
    name: 'bands_by_city',
    source: fql.Collection('Band'),
    terms: [
      { field: ['data', 'city'] },
    ],
  };

  const musiciansByStyle = {
    name: 'musicians_by_style',
    source: fql.Collection('MusicianStyle'),
    terms: [
      { field: ['data', 'style'] },
    ],
    values: [
      { field: ['data', 'musician'] }
    ]
  };

  const bandsByStyle = {
    name: 'bands_by_style',
    source: fql.Collection('BandStyle'),
    terms: [
      { field: ['data', 'style'] },
    ],
    values: [
      { field: ['data', 'band'] }
    ]
  };

  const musicianAdsByStyle = {
    name: 'musicianAds_by_style',
    source: fql.Collection('MusicianAdStyle'),
    terms: [
      { field: ['data', 'style'] },
    ],
    values: [
      { field: ['data', 'musicianAd'] }
    ]
  };

  const musicianAdsByCity = {
    name: 'musicianAds_by_city',
    source: fql.Collection('MusicianAd'),
    terms: [
      { field: ['data', 'city'] },
    ]
  };


  const bandAdsByStyle = {
    name: 'bandAds_by_style',
    source: fql.Collection('BandAdStyle'),
    terms: [
      { field: ['data', 'style'] },
    ],
    values: [
      { field: ['data', 'bandAd'] }
    ]
  };

  const bandAdsByCity = {
    name: 'bandAds_by_city',
    source: fql.Collection('BandAd'),
    terms: [
      { field: ['data', 'city'] },
    ]
  };

  const userByEmail = {
    name: "user_by_email",
    source: fql.Collection("User"),
    terms: [{ field: ["data", "email"], transform: "casefold" }],
    unique: true,
    serialized: true
  };

  console.info('Creating custom indexes...');
  console.info('Creating custom index musician_by_userId');
  await faunaClient.query(
    fql.If(
      fql.Exists(
        fql.Index('musician_by_userId')
      ),
      fql.Update(
        fql.Index('musician_by_userId'),
        musicianByUserId
      ),
      fql.CreateIndex(musicianByUserId)
    )
  );

  console.info('Creating custom index musicians_by_city...');
  await faunaClient.query(
    fql.If(
      fql.Exists(
        fql.Index('musicians_by_city')
      ),
      fql.Update(
        fql.Index('musicians_by_city'),
        musiciansByCity
      ),
      fql.CreateIndex(musiciansByCity)
    )
  );

  console.info('Creating custom index bands_by_city...');
  await faunaClient.query(
    fql.If(
      fql.Exists(
        fql.Index('bands_by_city')
      ),
      fql.Update(
        fql.Index('bands_by_city'),
        bandsByCity
      ),
      fql.CreateIndex(bandsByCity)
    )
  );

  console.info('Creating custom index musicians_by_style...');
  await faunaClient.query(
    fql.If(
      fql.Exists(
        fql.Index('musicians_by_style')
      ),
      fql.Update(
        fql.Index('musicians_by_style'),
        musiciansByStyle
      ),
      fql.CreateIndex(musiciansByStyle)
    )
  );

  console.info('Creating custom index bands_by_style...');

  await faunaClient.query(
    fql.If(
      fql.Exists(
        fql.Index('bands_by_style')
      ),
      fql.Update(
        fql.Index('bands_by_style'),
        bandsByStyle
      ),
      fql.CreateIndex(bandsByStyle)
    )
  );



  console.info('Creating custom index musicianAds_by_style...');

  await faunaClient.query(
    fql.If(
      fql.Exists(
        fql.Index('musicianAds_by_style')
      ),
      fql.Update(
        fql.Index('musicianAds_by_style'),
        musicianAdsByStyle
      ),
      fql.CreateIndex(musicianAdsByStyle)
    )
  );

  console.info('Creating custom index musicianAds_by_city...');

  await faunaClient.query(
    fql.If(
      fql.Exists(
        fql.Index('musicianAds_by_city')
      ),
      fql.Update(
        fql.Index('musicianAds_by_city'),
        musicianAdsByCity
      ),
      fql.CreateIndex(musicianAdsByCity)
    )
  );

  console.info('Creating custom index bandAds_by_city...');

  await faunaClient.query(
    fql.If(
      fql.Exists(
        fql.Index('bandAds_by_city')
      ),
      fql.Update(
        fql.Index('bandAds_by_city'),
        bandAdsByCity
      ),
      fql.CreateIndex(bandAdsByCity)
    )
  );

  console.info('Creating custom index bandAds_by_style...');

  await faunaClient.query(
    fql.If(
      fql.Exists(
        fql.Index('bandAds_by_style')
      ),
      fql.Update(
        fql.Index('bandAds_by_style'),
        bandAdsByStyle
      ),
      fql.CreateIndex(bandAdsByStyle)
    )
  );

  console.info('Creating custom index user_by_email...');

  await faunaClient.query(
    fql.If(
      fql.Exists(
        fql.Index('user_by_email')
      ),
      fql.Update(
        fql.Index('user_by_email'),
        userByEmail
      ),
      fql.CreateIndex(userByEmail)
    )
  );


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
